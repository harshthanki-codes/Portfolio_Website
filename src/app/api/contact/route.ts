import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address').max(100),
  message: z.string().min(10, 'Message must be at least 10 characters').max(2000),
  _hp: z.string().optional(), // Honeypot trap
});

// Simple in-memory sliding window rate limiter
interface RateLimitEntry {
  count: number;
  resetTime: number;
}
const rateLimitMap = new Map<string, RateLimitEntry>();
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS = 5;

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() || '127.0.0.1';
    const now = Date.now();

    // Rate Limiting check
    const currentRate = rateLimitMap.get(ip);
    if (currentRate && now < currentRate.resetTime) {
      if (currentRate.count >= MAX_REQUESTS) {
        return NextResponse.json(
          { error: 'Rate limit exceeded. Please wait 15 minutes before sending another inquiry.' },
          {
            status: 429,
            headers: {
              'Retry-After': Math.ceil((currentRate.resetTime - now) / 1000).toString(),
              'X-RateLimit-Limit': MAX_REQUESTS.toString(),
              'X-RateLimit-Remaining': '0',
            },
          }
        );
      }
      currentRate.count += 1;
    } else {
      rateLimitMap.set(ip, { count: 1, resetTime: now + WINDOW_MS });
    }

    const body = await req.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || 'Invalid input data.' },
        { status: 400 }
      );
    }

    const { name, email, message, _hp } = parsed.data;

    // Honeypot check: bots fill hidden fields, humans do not
    if (_hp && _hp.length > 0) {
      // Silently return success to confuse automated scrapers
      return NextResponse.json({ success: true, message: 'Message dispatched successfully.' });
    }

    // Email delivery via Resend (if API key is present in environment)
    const apiKey = process.env.RESEND_API_KEY;
    if (apiKey) {
      const resendRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Portfolio Contact <onboarding@resend.dev>',
          to: process.env.CONTACT_NOTIFICATION_EMAIL || 'harsh.h.thanki@gmail.com',
          subject: `Engineering Inquiry from ${name}`,
          text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        }),
      });

      if (!resendRes.ok) {
        console.error('Resend delivery failed:', await resendRes.text());
      }
    } else {
      // Development / Static fallback log
      console.log(`[Contact Form Received] Name: ${name}, Email: ${email}, Message: ${message}`);
    }

    return NextResponse.json(
      { success: true, message: 'Message dispatched successfully.' },
      {
        status: 200,
        headers: {
          'X-RateLimit-Limit': MAX_REQUESTS.toString(),
          'X-RateLimit-Remaining': Math.max(0, MAX_REQUESTS - (rateLimitMap.get(ip)?.count || 1)).toString(),
        },
      }
    );
  } catch (error) {
    console.error('Contact handler error:', error);
    return NextResponse.json(
      { error: 'An unexpected internal error occurred. Please try again later.' },
      { status: 500 }
    );
  }
}
