import { NextRequest, NextResponse } from 'next/server';
import { initDb, Project, User, getNextProjectId } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';
import { checkRateLimit, createRateLimitResponse } from '@/lib/rateLimit';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const safeJsonParse = (val: any, fallback: any) => {
  if (val === undefined || val === null || val === '') return fallback;
  if (typeof val === 'object') return val;
  try {
    return JSON.parse(val);
  } catch (e) {
    return fallback;
  }
};

export async function GET(req: NextRequest) {
  try {
    const rateCheck = checkRateLimit(req, 'api');
    if (!rateCheck.allowed) {
      return createRateLimitResponse(rateCheck.retryAfter);
    }

    await initDb();
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized', projects: [] }, { status: 401 });
    }

    let whereClause = {};
    if (user.role !== 'admin') {
      whereClause = { clientId: user.id };
    }

    const projects = await Project.findAll({
      where: whereClause,
      include: [
        {
          model: User,
          as: 'client',
          attributes: ['id', 'name', 'email', 'companyName', 'phone'],
        },
      ],
      order: [['createdAt', 'DESC']],
    });

    const parsedProjects = projects.map(p => {
      const data = p.toJSON();
      return {
        ...data,
        selectedCategoryIds: safeJsonParse(data.selectedCategoryIds, []),
        selectedTypeIds: safeJsonParse(data.selectedTypeIds, []),
        selectedModuleIds: safeJsonParse(data.selectedModuleIds, []),
        selectedSubModuleIds: safeJsonParse(data.selectedSubModuleIds, []),
        selectedSubSubModuleIds: safeJsonParse(data.selectedSubSubModuleIds, []),
        customItems: safeJsonParse(data.customItems, {}),
        techStack: safeJsonParse(data.techStack, {}),
        architectureFlows: safeJsonParse(data.architectureFlows, {}),
        implementationPhases: safeJsonParse(data.implementationPhases, []),
        paymentSplitup: safeJsonParse(data.paymentSplitup, {}),
        excludedItems: safeJsonParse(data.excludedItems, []),
        companyTemplates: safeJsonParse(data.companyTemplates, {}),
        adminNotes: data.adminNotes || '',
        estimatedBudget: data.estimatedBudget || '',
      };
    });

    return NextResponse.json({ success: true, projects: parsedProjects, user });
  } catch (error: any) {
    console.error('Projects fetch error:', error);
    return NextResponse.json({ success: false, error: error.message, projects: [] }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const rateCheck = checkRateLimit(req, 'api');
    if (!rateCheck.allowed) {
      return createRateLimitResponse(rateCheck.retryAfter);
    }

    await initDb();
    const user = await getCurrentUser();
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized. Please login to save your project.' }, { status: 401 });
    }

    const body = await req.json();
    const today = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    const nextProjectId = await getNextProjectId();

    const newProject = await Project.create({
      id: nextProjectId,
      projectName: body.projectName?.trim() || (body.companyName?.trim() ? `${body.companyName.trim()} Specification` : 'Draft Specification'),
      companyName: body.companyName?.trim() || '',
      contactPerson: body.contactPerson?.trim() || '',
      contactEmail: body.contactEmail?.trim() || '',
      contactPhone: (() => {
        let cp = String(body.contactPhone || '').replace(/\D/g, '');
        if (cp.startsWith('91') && cp.length > 10) cp = cp.slice(2);
        return cp.slice(0, 10);
      })(),
      industry: body.industry || '',
      locations: body.locations || '',
      targetAudience: body.targetAudience || '',
      productDescription: body.productDescription?.trim() || '',
      startDate: body.startDate || today,
      endDate: body.endDate || '',
      creationDate: body.creationDate || today,
      lastUpdatedDate: body.lastUpdatedDate || today,
      selectedCategoryIds: JSON.stringify(body.selectedCategoryIds || []),
      selectedTypeIds: JSON.stringify(body.selectedTypeIds || []),
      selectedModuleIds: JSON.stringify(body.selectedModuleIds || []),
      selectedSubModuleIds: JSON.stringify(body.selectedSubModuleIds || []),
      selectedSubSubModuleIds: JSON.stringify(body.selectedSubSubModuleIds || []),
      customItems: JSON.stringify(body.customItems || {}),
      techStack: JSON.stringify(body.techStack || {}),
      architectureFlows: JSON.stringify(body.architectureFlows || {}),
      implementationPhases: JSON.stringify(body.implementationPhases || []),
      paymentSplitup: JSON.stringify(body.paymentSplitup || {}),
      excludedItems: JSON.stringify(body.excludedItems || []),
      companyTemplates: JSON.stringify(body.companyTemplates || {}),
      adminNotes: body.adminNotes || '',
      estimatedBudget: body.estimatedBudget || '',
      status: body.status || 'draft',
      clientId: user.id,
      clientName: user.name || body.contactPerson || 'Client User',
      clientEmail: user.email || body.contactEmail || '',
      pdfFileName: body.pdfFileName || `${(body.projectName || 'Project').replace(/\s+/g, '_')}_FRD.pdf`,
      pdfContent: body.pdfContent || '',
      pdfData: body.pdfData || '',
    });

    return NextResponse.json({
      success: true,
      project: {
        ...newProject.toJSON(),
        selectedCategoryIds: body.selectedCategoryIds || [],
        selectedTypeIds: body.selectedTypeIds || [],
        selectedModuleIds: body.selectedModuleIds || [],
        selectedSubModuleIds: body.selectedSubModuleIds || [],
        selectedSubSubModuleIds: body.selectedSubSubModuleIds || [],
        customItems: body.customItems || {},
        techStack: body.techStack || {},
        architectureFlows: body.architectureFlows || {},
        implementationPhases: body.implementationPhases || [],
        paymentSplitup: body.paymentSplitup || {},
        excludedItems: body.excludedItems || [],
        companyTemplates: body.companyTemplates || {},
        adminNotes: body.adminNotes || '',
        estimatedBudget: body.estimatedBudget || '',
      },
    });
  } catch (error: any) {
    console.error('Project creation error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
