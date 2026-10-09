import { NextRequest, NextResponse } from 'next/server';
import { generateTechStackWithNvidia } from '@/lib/nvidia';
import { checkRateLimit, createRateLimitResponse } from '@/lib/rateLimit';

export async function POST(req: NextRequest) {
  try {
    const rateCheck = checkRateLimit(req, 'ai');
    if (!rateCheck.allowed) {
      return createRateLimitResponse(
        rateCheck.retryAfter,
        `Rate limit reached. Please wait ${rateCheck.retryAfter} seconds.`
      );
    }

    const body = await req.json();
    const {
      projectName,
      companyName,
      productDescription,
      selectedCategories,
      selectedTypes,
      selectedModules,
    } = body;

    const techStack = await generateTechStackWithNvidia({
      projectName,
      companyName,
      productDescription,
      selectedCategories,
      selectedTypes,
      selectedModules,
    });

    return NextResponse.json({
      success: true,
      techStack,
    });
  } catch (error: any) {
    console.error('Tech stack recommendation API error:', error);
    return NextResponse.json({ error: error.message || 'Generation failed' }, { status: 500 });
  }
}
