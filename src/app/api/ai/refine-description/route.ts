import { NextRequest, NextResponse } from 'next/server';
import { refineDescriptionWithNvidia } from '@/lib/nvidia';
import { checkRateLimit, createRateLimitResponse } from '@/lib/rateLimit';

export async function POST(req: NextRequest) {
  try {
    const rateCheck = checkRateLimit(req, 'ai');
    if (!rateCheck.allowed) {
      return createRateLimitResponse(
        rateCheck.retryAfter,
        `AI refinement rate limit reached. Please wait ${rateCheck.retryAfter} seconds.`
      );
    }

    const body = await req.json();
    const { roughInput, projectName, companyName, industry } = body;

    if (!roughInput || !roughInput.trim()) {
      return NextResponse.json({ error: 'Please enter some rough notes or keywords to redefine.' }, { status: 400 });
    }

    const refinedDescription = await refineDescriptionWithNvidia({
      roughInput,
      projectName,
      companyName,
      industry,
    });

    return NextResponse.json({
      success: true,
      refinedDescription,
    });
  } catch (error: any) {
    console.error('AI Refine API error:', error);
    return NextResponse.json({ error: error.message || 'AI refinement failed' }, { status: 500 });
  }
}
