import { NextRequest, NextResponse } from 'next/server';
import { initDb, Project, User, resequenceProjects } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';
import { enforceProjectAccess } from '@/lib/security';
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

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const rateCheck = checkRateLimit(req, 'api');
    if (!rateCheck.allowed) {
      return createRateLimitResponse(rateCheck.retryAfter);
    }

    await initDb();
    const user = await getCurrentUser();
    const project = await Project.findByPk(params.id, {
      include: [
        {
          model: User,
          as: 'client',
          attributes: ['id', 'name', 'email', 'companyName', 'phone'],
        },
      ],
    });

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    // Row-Level Security (RLS) enforcement
    const rls = enforceProjectAccess(project, user);
    if (!rls.allowed) {
      return rls.response!;
    }

    const data = project.toJSON();
    const parsed = {
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

    return NextResponse.json({ project: parsed });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const rateCheck = checkRateLimit(req, 'api');
    if (!rateCheck.allowed) {
      return createRateLimitResponse(rateCheck.retryAfter);
    }

    await initDb();
    const user = await getCurrentUser();
    const project = await Project.findByPk(params.id);

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    // Row-Level Security (RLS) enforcement
    const rls = enforceProjectAccess(project, user);
    if (!rls.allowed) {
      return rls.response!;
    }

    const body = await req.json();
    const today = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

    const updateData: any = {
      lastUpdatedDate: today,
    };

    if (body.projectName !== undefined) updateData.projectName = body.projectName;
    if (body.companyName !== undefined) updateData.companyName = body.companyName;
    if (body.contactPerson !== undefined) updateData.contactPerson = body.contactPerson;
    if (body.contactEmail !== undefined) updateData.contactEmail = body.contactEmail;
    if (body.contactPhone !== undefined) {
      let cp = String(body.contactPhone || '').replace(/\D/g, '');
      if (cp.startsWith('91') && cp.length > 10) cp = cp.slice(2);
      updateData.contactPhone = cp.slice(0, 10);
    }
    if (body.industry !== undefined) updateData.industry = body.industry;
    if (body.locations !== undefined) updateData.locations = body.locations;
    if (body.targetAudience !== undefined) updateData.targetAudience = body.targetAudience;
    if (body.productDescription !== undefined) updateData.productDescription = body.productDescription?.trim() || '';
    if (body.startDate !== undefined) updateData.startDate = body.startDate;
    if (body.endDate !== undefined) updateData.endDate = body.endDate;
    if (body.status !== undefined) updateData.status = body.status;
    if (body.pdfFileName !== undefined) updateData.pdfFileName = body.pdfFileName;
    if (body.pdfContent !== undefined) updateData.pdfContent = body.pdfContent;
    if (body.pdfData !== undefined) updateData.pdfData = body.pdfData;
    if (body.clientName !== undefined) updateData.clientName = body.clientName;
    if (body.clientEmail !== undefined) updateData.clientEmail = body.clientEmail;
    if (body.adminNotes !== undefined) updateData.adminNotes = body.adminNotes;
    if (body.estimatedBudget !== undefined) updateData.estimatedBudget = body.estimatedBudget;

    if (body.selectedCategoryIds !== undefined) updateData.selectedCategoryIds = JSON.stringify(body.selectedCategoryIds);
    if (body.selectedTypeIds !== undefined) updateData.selectedTypeIds = JSON.stringify(body.selectedTypeIds);
    if (body.selectedModuleIds !== undefined) updateData.selectedModuleIds = JSON.stringify(body.selectedModuleIds);
    if (body.selectedSubModuleIds !== undefined) updateData.selectedSubModuleIds = JSON.stringify(body.selectedSubModuleIds);
    if (body.selectedSubSubModuleIds !== undefined) updateData.selectedSubSubModuleIds = JSON.stringify(body.selectedSubSubModuleIds);
    if (body.customItems !== undefined) updateData.customItems = JSON.stringify(body.customItems);
    if (body.techStack !== undefined) updateData.techStack = JSON.stringify(body.techStack);
    if (body.architectureFlows !== undefined) updateData.architectureFlows = JSON.stringify(body.architectureFlows);
    if (body.implementationPhases !== undefined) updateData.implementationPhases = JSON.stringify(body.implementationPhases);
    if (body.paymentSplitup !== undefined) updateData.paymentSplitup = JSON.stringify(body.paymentSplitup);
    if (body.excludedItems !== undefined) updateData.excludedItems = JSON.stringify(body.excludedItems);
    if (body.companyTemplates !== undefined) updateData.companyTemplates = JSON.stringify(body.companyTemplates);

    await project.update(updateData);

    return NextResponse.json({ success: true, message: 'Project updated successfully', project: project.toJSON() });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const rateCheck = checkRateLimit(req, 'api');
    if (!rateCheck.allowed) {
      return createRateLimitResponse(rateCheck.retryAfter);
    }

    await initDb();
    const user = await getCurrentUser();
    const project = await Project.findByPk(params.id);
    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    // Row-Level Security (RLS) enforcement
    const rls = enforceProjectAccess(project, user);
    if (!rls.allowed) {
      return rls.response!;
    }

    // Permanently remove project specification from the database
    await Project.destroy({ where: { id: params.id }, force: true });
    await resequenceProjects();

    return NextResponse.json({ 
      success: true, 
      message: 'Product document permanently removed from database' 
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

