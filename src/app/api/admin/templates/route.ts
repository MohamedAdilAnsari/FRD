import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { 
  getCompanyTemplateStoreAsync, 
  saveCompanyTemplateStoreAsync, 
  CompanyTemplatePreset 
} from '@/lib/templates';
import { initDb } from '@/lib/db';
import { checkRateLimit, createRateLimitResponse } from '@/lib/rateLimit';

export async function GET(req: NextRequest) {
  try {
    const rateCheck = checkRateLimit(req, 'api');
    if (!rateCheck.allowed) {
      return createRateLimitResponse(rateCheck.retryAfter);
    }

    await initDb();
    const store = await getCompanyTemplateStoreAsync();
    return NextResponse.json({
      success: true,
      store,
      activeTemplate: store.templates.find(t => t.id === store.activeTemplateId) || store.templates[0],
    });
  } catch (error: any) {
    console.error('Error fetching company templates:', error);
    return NextResponse.json({ error: error.message || 'Failed to fetch templates' }, { status: 500 });
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
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized: Admin access required' }, { status: 403 });
    }

    const body = await req.json();
    const { action, templateData, name, description, cloneFromId, versionNotes } = body;
    const store = await getCompanyTemplateStoreAsync();

    // 1. Direct Save of Template Edits
    if (action === 'save_template' && templateData) {
      const targetIndex = store.templates.findIndex(t => t.id === templateData.id);
      if (targetIndex !== -1) {
        store.templates[targetIndex] = {
          ...store.templates[targetIndex],
          ...templateData,
        };
      } else {
        store.templates.push(templateData);
      }
      store.activeTemplateId = templateData.id;

      // Optional version snapshot if notes provided
      if (versionNotes) {
        const nextVersionNum = (templateData.versionHistory?.length || 0) + 1;
        const newVersion = {
          versionId: `v-${nextVersionNum}.0-${Date.now()}`,
          versionNumber: nextVersionNum,
          timestamp: new Date().toISOString(),
          author: user.name || 'System Administrator',
          notes: versionNotes,
          snapshot: JSON.parse(JSON.stringify(templateData)),
        };
        if (!store.templates[targetIndex].versionHistory) {
          store.templates[targetIndex].versionHistory = [];
        }
        store.templates[targetIndex].versionHistory.unshift(newVersion);
      }

      await saveCompanyTemplateStoreAsync(store);
      return NextResponse.json({ success: true, store, activeTemplate: store.templates[targetIndex] || templateData });
    }

    // 2. Create New Preset
    if (action === 'create_template') {
      const sourceTemplate = cloneFromId 
        ? store.templates.find(t => t.id === cloneFromId) || store.templates[0]
        : store.templates[0];

      const newTemplateId = `tpl-${Date.now()}`;
      const newPreset: CompanyTemplatePreset = {
        id: newTemplateId,
        name: name || 'New Enterprise Specification Template',
        description: description || 'Custom specification template for client contracts.',
        isDefault: false,
        companyInfo: JSON.parse(JSON.stringify(sourceTemplate.companyInfo || {})),
        requirements: JSON.parse(JSON.stringify(sourceTemplate.requirements || [])),
        deliverables: JSON.parse(JSON.stringify(sourceTemplate.deliverables || [])),
        techStack: JSON.parse(JSON.stringify(sourceTemplate.techStack || {})),
        communication: JSON.parse(JSON.stringify(sourceTemplate.communication || [])),
        additionalPricing: JSON.parse(JSON.stringify(sourceTemplate.additionalPricing || [])),
        architectureFlows: JSON.parse(JSON.stringify(sourceTemplate.architectureFlows || {})),
        scopeDefaults: JSON.parse(JSON.stringify(sourceTemplate.scopeDefaults || {})),
        implementationPhases: JSON.parse(JSON.stringify(sourceTemplate.implementationPhases || [])),
        paymentSplitups: JSON.parse(JSON.stringify(sourceTemplate.paymentSplitups || {})),
        standardExclusions: JSON.parse(JSON.stringify(sourceTemplate.standardExclusions || [])),
        agreements: JSON.parse(JSON.stringify(sourceTemplate.agreements || [])),
        versionHistory: [
          {
            versionId: `v-1.0-${Date.now()}`,
            versionNumber: 1,
            timestamp: new Date().toISOString(),
            author: user.name || 'System Administrator',
            notes: versionNotes || 'Initial creation of template preset.',
            snapshot: {
              companyInfo: JSON.parse(JSON.stringify(sourceTemplate.companyInfo || {})),
              requirements: JSON.parse(JSON.stringify(sourceTemplate.requirements || [])),
              deliverables: JSON.parse(JSON.stringify(sourceTemplate.deliverables || [])),
              techStack: JSON.parse(JSON.stringify(sourceTemplate.techStack || {})),
              communication: JSON.parse(JSON.stringify(sourceTemplate.communication || [])),
              additionalPricing: JSON.parse(JSON.stringify(sourceTemplate.additionalPricing || [])),
              architectureFlows: JSON.parse(JSON.stringify(sourceTemplate.architectureFlows || {})),
              agreements: JSON.parse(JSON.stringify(sourceTemplate.agreements || [])),
            },
          },
        ],
      };

      store.templates.push(newPreset);
      await saveCompanyTemplateStoreAsync(store);

      return NextResponse.json({ success: true, preset: newPreset, store });
    }

    // 3. Save Version Snapshot
    if (action === 'save_version') {
      const { templateId, notes } = body;
      const targetIndex = store.templates.findIndex(t => t.id === templateId);
      if (targetIndex === -1) {
        return NextResponse.json({ error: 'Template not found' }, { status: 404 });
      }

      const current = store.templates[targetIndex];
      const nextVersionNum = (current.versionHistory?.length || 0) + 1;

      const newVersion = {
        versionId: `v-${nextVersionNum}.0-${Date.now()}`,
        versionNumber: nextVersionNum,
        timestamp: new Date().toISOString(),
        author: user.name || 'System Administrator',
        notes: notes || `Version ${nextVersionNum}.0 snapshot update.`,
        snapshot: JSON.parse(JSON.stringify(current)),
      };

      if (!current.versionHistory) current.versionHistory = [];
      current.versionHistory.unshift(newVersion);
      store.templates[targetIndex] = current;
      await saveCompanyTemplateStoreAsync(store);

      return NextResponse.json({ success: true, version: newVersion, store });
    }

    // 4. Restore Version Snapshot
    if (action === 'restore_version') {
      const { templateId, versionId } = body;
      const targetIndex = store.templates.findIndex(t => t.id === templateId);
      if (targetIndex === -1) {
        return NextResponse.json({ error: 'Template not found' }, { status: 404 });
      }

      const current = store.templates[targetIndex];
      const version = current.versionHistory?.find(v => v.versionId === versionId);
      if (!version || !version.snapshot) {
        return NextResponse.json({ error: 'Version snapshot not found' }, { status: 404 });
      }

      const restoredSnapshot = version.snapshot;
      if (restoredSnapshot.companyInfo) current.companyInfo = JSON.parse(JSON.stringify(restoredSnapshot.companyInfo));
      if (restoredSnapshot.requirements) current.requirements = JSON.parse(JSON.stringify(restoredSnapshot.requirements));
      if (restoredSnapshot.deliverables) current.deliverables = JSON.parse(JSON.stringify(restoredSnapshot.deliverables));
      if (restoredSnapshot.techStack) current.techStack = JSON.parse(JSON.stringify(restoredSnapshot.techStack));
      if (restoredSnapshot.communication) current.communication = JSON.parse(JSON.stringify(restoredSnapshot.communication));
      if (restoredSnapshot.additionalPricing) current.additionalPricing = JSON.parse(JSON.stringify(restoredSnapshot.additionalPricing));
      if (restoredSnapshot.architectureFlows) current.architectureFlows = JSON.parse(JSON.stringify(restoredSnapshot.architectureFlows));
      if (restoredSnapshot.scopeDefaults) current.scopeDefaults = JSON.parse(JSON.stringify(restoredSnapshot.scopeDefaults));
      if (restoredSnapshot.implementationPhases) current.implementationPhases = JSON.parse(JSON.stringify(restoredSnapshot.implementationPhases));
      if (restoredSnapshot.standardExclusions) current.standardExclusions = JSON.parse(JSON.stringify(restoredSnapshot.standardExclusions));
      if (restoredSnapshot.agreements) current.agreements = JSON.parse(JSON.stringify(restoredSnapshot.agreements));

      store.templates[targetIndex] = current;
      await saveCompanyTemplateStoreAsync(store);

      return NextResponse.json({ success: true, message: 'Version restored successfully', store });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error: any) {
    console.error('Error saving template:', error);
    return NextResponse.json({ error: error.message || 'Failed to process request' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    await initDb();
    const user = await getCurrentUser();
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized: Admin access required' }, { status: 403 });
    }

    const body = await req.json();
    const { templateId, activeTemplateId, updatedTemplate } = body;
    const store = await getCompanyTemplateStoreAsync();

    if (activeTemplateId) {
      if (store.templates.some(t => t.id === activeTemplateId)) {
        store.activeTemplateId = activeTemplateId;
        await saveCompanyTemplateStoreAsync(store);
        return NextResponse.json({ success: true, store });
      }
      return NextResponse.json({ error: 'Template ID not found' }, { status: 404 });
    }

    const targetTemplateId = templateId || store.activeTemplateId;
    const targetIndex = store.templates.findIndex(t => t.id === targetTemplateId);
    if (targetIndex === -1) {
      return NextResponse.json({ error: 'Target template not found' }, { status: 404 });
    }

    if (updatedTemplate) {
      store.templates[targetIndex] = {
        ...store.templates[targetIndex],
        ...updatedTemplate,
        id: targetTemplateId, // Protect ID
      };
      await saveCompanyTemplateStoreAsync(store);
      return NextResponse.json({ success: true, store, template: store.templates[targetIndex] });
    }

    return NextResponse.json({ error: 'Missing updated template data' }, { status: 400 });
  } catch (error: any) {
    console.error('Error updating company templates:', error);
    return NextResponse.json({ error: error.message || 'Failed to update template' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await initDb();
    const user = await getCurrentUser();
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized: Admin access required' }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const templateId = searchParams.get('templateId');

    if (!templateId) {
      return NextResponse.json({ error: 'Template ID is required' }, { status: 400 });
    }

    const store = await getCompanyTemplateStoreAsync();
    if (store.templates.length <= 1) {
      return NextResponse.json({ error: 'Cannot delete the only remaining master template preset' }, { status: 400 });
    }

    store.templates = store.templates.filter(t => t.id !== templateId);
    if (store.activeTemplateId === templateId) {
      store.activeTemplateId = store.templates[0].id;
    }

    await saveCompanyTemplateStoreAsync(store);
    return NextResponse.json({ success: true, store });
  } catch (error: any) {
    console.error('Error deleting template preset:', error);
    return NextResponse.json({ error: error.message || 'Failed to delete template preset' }, { status: 500 });
  }
}
