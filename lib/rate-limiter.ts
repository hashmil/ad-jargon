interface RateLimitStore {
  [key: string]: {
    requests: number;
    resetTime: number;
  };
}

// Simple in-memory store for rate limiting (works with edge runtime)
const rateLimitStore: RateLimitStore = {};

interface RateLimitConfig {
  maxRequests: number;
  windowMs: number;
}

interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetTime: number;
}

export class RateLimiter {
  private config: RateLimitConfig;

  constructor(config: RateLimitConfig) {
    this.config = config;
  }

  check(identifier: string): RateLimitResult {
    const now = Date.now();
    const key = identifier;
    
    // Clean up expired entries to prevent memory leaks
    this.cleanup(now);
    
    // Get or create rate limit entry
    let entry = rateLimitStore[key];
    
    if (!entry || now >= entry.resetTime) {
      // Create new window
      entry = {
        requests: 0,
        resetTime: now + this.config.windowMs,
      };
      rateLimitStore[key] = entry;
    }
    
    // Check if limit exceeded
    if (entry.requests >= this.config.maxRequests) {
      return {
        allowed: false,
        remaining: 0,
        resetTime: entry.resetTime,
      };
    }
    
    // Increment request count
    entry.requests++;
    
    return {
      allowed: true,
      remaining: this.config.maxRequests - entry.requests,
      resetTime: entry.resetTime,
    };
  }
  
  private cleanup(now: number): void {
    // Remove expired entries (run occasionally to prevent memory buildup)
    if (Math.random() < 0.01) { // 1% chance to clean up
      Object.keys(rateLimitStore).forEach(key => {
        if (rateLimitStore[key].resetTime <= now) {
          delete rateLimitStore[key];
        }
      });
    }
  }
}

// Create rate limiter instances for different endpoints
export const translateRateLimiter = new RateLimiter({
  maxRequests: 10, // 10 requests per window
  windowMs: 60 * 1000, // 1 minute window
});

// Utility function to get client identifier
export function getClientIdentifier(request: Request): string {
  // Try to get real IP from Cloudflare headers
  const cfConnectingIp = request.headers.get('cf-connecting-ip');
  const xForwardedFor = request.headers.get('x-forwarded-for');
  const xRealIp = request.headers.get('x-real-ip');
  
  return cfConnectingIp || 
         xForwardedFor?.split(',')[0].trim() || 
         xRealIp || 
         'unknown';
}