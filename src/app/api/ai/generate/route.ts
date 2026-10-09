import { NextRequest, NextResponse } from 'next/server';
import { generateFRDWithNvidia } from '@/lib/nvidia';
import { checkRateLimit, createRateLimitResponse } from '@/lib/rateLimit';

export async function POST(req: NextRequest) {
  try {
    // 1. Strict AI Rate Limiting (Protects API quotas and prevents DDoS)
    const rateCheck = checkRateLimit(req, 'ai');
    if (!rateCheck.allowed) {
      return createRateLimitResponse(
        rateCheck.retryAfter,
        `AI generation rate limit reached. Please wait ${rateCheck.retryAfter} seconds before requesting more architectural flows.`
      );
    }

    const body = await req.json();
    const {
      projectName,
      companyName,
      productDescription,
      selectedCategories = [],
      selectedTypes = [],
      selectedModules = [],
      selectedSubModules = [],
      selectedSubSubModules = [],
      unselectedItems = [],
    } = body;

    const result = await generateFRDWithNvidia({
      projectName: projectName || 'Enterprise Platform',
      companyName: companyName || 'Client Organization',
      productDescription: productDescription || 'Comprehensive enterprise system requirements',
      selectedCategories,
      selectedTypes,
      selectedModules,
      selectedSubModules,
      selectedSubSubModules,
      unselectedItems,
    });

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    console.error('AI Generation API error:', error);
    return NextResponse.json({ error: error.message || 'AI Generation failed' }, { status: 500 });
  }
}
