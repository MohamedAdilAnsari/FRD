import { NextRequest, NextResponse } from 'next/server';
import { COMPREHENSIVE_TAXONOMY } from '@/data/taxonomy';

export async function GET(req: NextRequest) {
  try {
    return NextResponse.json({
      categories: COMPREHENSIVE_TAXONOMY,
      totalCategories: COMPREHENSIVE_TAXONOMY.length,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
