import { NextRequest, NextResponse } from 'next/server';
import { processBrandPipeline, AIConfig } from '@/lib/brand-engine/llm-service';
import { RawBrandInput } from '@/types/brand';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const input: RawBrandInput = body.input;
    const config: AIConfig = body.config || { provider: 'local' };

    if (!input || !input.idea) {
      return NextResponse.json(
        { success: false, error: 'A startup or product idea is required.' },
        { status: 400 }
      );
    }

    const result = await processBrandPipeline(input, config);

    return NextResponse.json({
      success: true,
      project: result.project,
      source: result.source,
      executionTimeMs: result.executionTimeMs
    });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json(
      { success: false, error: err?.message || 'Failed to process brand pipeline' },
      { status: 500 }
    );
  }
}
