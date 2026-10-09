import { NextRequest, NextResponse } from 'next/server';

interface RateLimitConfig {
  windowMs: number; // Duration in milliseconds
  max: number;      // Max allowed requests in the window
}

interface RateLimitRecord {
  count: number;
  resetTime: number;
}

// In-memory token bucket per IP + route category
const rateLimitStore = new Map<string, RateLimitRecord>();

// Clean expired records every 5 minutes to prevent memory leaks
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    rateLimitStore.forEach((record, key) => {
      if (now > record.resetTime) {
        rateLimitStore.delete(key);
      }
    });
  }, 5 * 60 * 1000);
}

export const RATE_LIMIT_CONFIGS: Record<string, RateLimitConfig> = {
  // Strictest: 10 attempts per minute for auth (prevents brute force while allowing smooth human workflows)
  auth: {
    windowMs: 60 * 1000,
    max: 10,
  },
  // Strict: 15 calls per minute for AI generation (prevent token abuse & cost spikes)
  ai: {
    windowMs: 60 * 1000,
    max: 15,
  },
  // Standard: 100 requests per minute for general API calls
  api: {
    windowMs: 60 * 1000,
    max: 100,
  },
};

/**
 * Extracts client IP address safely from standard proxy headers
 */
export function getClientIp(req: NextRequest): string {
  const forwardedFor = req.headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }
  const realIp = req.headers.get('x-real-ip');
  if (realIp) {
    return realIp.trim();
  }
  const cfIp = req.headers.get('cf-connecting-ip');
  if (cfIp) {
    return cfIp.trim();
  }
  return req.ip || '127.0.0.1';
}

/**
 * Checks and records rate limit for a client IP and category
 */
export function checkRateLimit(
  req: NextRequest,
  category: 'auth' | 'ai' | 'api' = 'api'
): { allowed: boolean; limit: number; remaining: number; retryAfter: number } {
  const config = RATE_LIMIT_CONFIGS[category] || RATE_LIMIT_CONFIGS.api;
  const ip = getClientIp(req);
  const key = `${category}:${ip}`;
  const now = Date.now();

  const record = rateLimitStore.get(key);

  if (!record || now > record.resetTime) {
    // New window
    rateLimitStore.set(key, {
      count: 1,
      resetTime: now + config.windowMs,
    });
    return {
      allowed: true,
      limit: config.max,
      remaining: config.max - 1,
      retryAfter: 0,
    };
  }

  // Existing window
  record.count += 1;
  const remaining = Math.max(0, config.max - record.count);
  const retryAfter = Math.ceil((record.resetTime - now) / 1000);

  if (record.count > config.max) {
    return {
      allowed: false,
      limit: config.max,
      remaining: 0,
      retryAfter,
    };
  }

  return {
    allowed: true,
    limit: config.max,
    remaining,
    retryAfter: 0,
  };
}

/**
 * Returns HTTP 429 Response with standard rate limiting headers
 */
export function createRateLimitResponse(retryAfter: number, message?: string): NextResponse {
  return NextResponse.json(
    {
      error: message || 'Too many requests. Please slow down and try again later.',
      retryAfter,
    },
    {
      status: 429,
      headers: {
        'Retry-After': String(retryAfter),
        'X-RateLimit-Limit': 'Exceeded',
        'X-RateLimit-Remaining': '0',
      },
    }
  );
}

/**
 * Sets standard X-RateLimit headers on a NextResponse
 */
export function setRateLimitHeaders(
  res: NextResponse,
  rateCheck: { limit: number; remaining: number }
): NextResponse {
  res.headers.set('X-RateLimit-Limit', String(rateCheck.limit));
  res.headers.set('X-RateLimit-Remaining', String(rateCheck.remaining));
  return res;
}
