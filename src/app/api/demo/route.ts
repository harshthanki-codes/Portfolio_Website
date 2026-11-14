import { NextRequest, NextResponse } from 'next/server';

interface RateLimitEntry {
  count: number;
  resetTime: number;
}
const demoRateLimit = new Map<string, RateLimitEntry>();
const WINDOW_MS = 15 * 60 * 1000;
const MAX_DEMO_CALLS = 10;

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() || '127.0.0.1';
    const now = Date.now();

    const rate = demoRateLimit.get(ip);
    if (rate && now < rate.resetTime) {
      if (rate.count >= MAX_DEMO_CALLS) {
        return NextResponse.json(
          { error: 'Live demo rate limit reached (10 requests / 15m). Please try again shortly.' },
          { status: 429 }
        );
      }
      rate.count += 1;
    } else {
      demoRateLimit.set(ip, { count: 1, resetTime: now + WINDOW_MS });
    }

    const { prompt } = await req.json();

    if (!prompt || typeof prompt !== 'string' || prompt.length > 500) {
      return NextResponse.json(
        { error: 'Prompt is required and must not exceed 500 characters.' },
        { status: 400 }
      );
    }

    // Simulated Speculative Decoding Response Stream
    const chunks = [
      'Token Ingestion: Completed in 2.1ms.\n',
      'Draft Model (DeepSeek-1.5B): Generating k=5 candidate tokens...\n',
      'Target Verification (DeepSeek-7B): Evaluating logits in parallel...\n',
      'Accepted 4 of 5 speculative tokens (80% acceptance rate).\n',
      'Guardrail AST Check: Clean syntax, 0 ungrounded symbols.\n',
      `Result Chunk: Speculative stream verified for prompt: "${prompt.slice(0, 60)}..."`,
    ];

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        for (const chunk of chunks) {
          controller.enqueue(encoder.encode(chunk));
          await new Promise((res) => setTimeout(res, 80));
        }
        controller.close();
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Transfer-Encoding': 'chunked',
        'X-Inference-Engine': 'Speculative-Decoding-Simulation-v1',
      },
    });
  } catch (error) {
    return NextResponse.json({ error: 'Inference streaming error.' }, { status: 500 });
  }
}
