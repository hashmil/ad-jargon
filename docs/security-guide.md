# Security Guide

## Overview

This document outlines the security measures implemented in the Ad Agency Jargon Translator to protect against common web application vulnerabilities and abuse.

## Security Features Implemented

### 1. Rate Limiting
- **Endpoint**: `/api/translate`
- **Limit**: 10 requests per minute per IP address
- **Headers**: Returns rate limit headers (`X-RateLimit-Remaining`, `X-RateLimit-Reset`)
- **Response**: 429 status with retry-after header when exceeded

### 2. Input Validation & Sanitization
- **Maximum Length**: 1000 characters
- **Minimum Length**: 1 character
- **Character Filtering**: Only allows alphanumeric, whitespace, and basic punctuation
- **Blocked Patterns**: Prevents prompt injection, script injection, and potential abuse patterns
- **Sanitization**: Removes control characters, normalizes whitespace and quotes

### 3. Security Headers
- **X-Frame-Options**: `DENY` (prevents clickjacking)
- **X-Content-Type-Options**: `nosniff` (prevents MIME type sniffing)
- **X-XSS-Protection**: `1; mode=block` (enables XSS filtering)
- **Referrer-Policy**: `strict-origin-when-cross-origin`
- **Content-Security-Policy**: Restricts resource loading to trusted sources
- **Permissions-Policy**: Disables unnecessary browser features

### 4. API Protection
- **Runtime**: Edge runtime for better performance and security
- **Error Handling**: Generic error messages to prevent information leakage
- **Request Logging**: Comprehensive logging for monitoring and abuse detection
- **Cache Control**: Prevents caching of sensitive API responses

## Monitoring & Logging

### Request Logging Format
```
[timestamp] Translation request from [client_ip]
[timestamp] Rate limit exceeded for [client_ip]
[timestamp] Invalid input from [client_ip]: [error_type]
[timestamp] AI translation attempt [attempt_number] failed for [client_ip]: [error_message]
```

### Key Metrics to Monitor
- Request frequency per IP
- Rate limit violations
- Input validation failures
- API translation failures
- Unusual traffic patterns

## Cloudflare-Specific Security

### Recommended Cloudflare Settings
1. **DDoS Protection**: Enable Cloudflare DDoS protection
2. **Bot Management**: Configure bot detection rules
3. **Web Application Firewall**: Set up WAF rules for additional protection
4. **Rate Limiting**: Consider additional Cloudflare rate limiting as backup
5. **IP Blocking**: Block known malicious IPs

### Environment Variables Security
- Store `OPENROUTER_API_KEY` in Cloudflare Pages environment variables
- Use preview/production environment separation
- Regularly rotate API keys

## Potential Attack Vectors & Mitigations

### 1. API Cost Exploitation
- **Risk**: Unlimited requests causing high API costs
- **Mitigation**: Rate limiting (10 requests/minute per IP)
- **Monitoring**: Track API usage and costs

### 2. Prompt Injection
- **Risk**: Malicious prompts to extract sensitive information or bypass filters
- **Mitigation**: Input validation with blocked patterns, prompt sanitization
- **Monitoring**: Log and review rejected inputs

### 3. Content Abuse
- **Risk**: Using the service for inappropriate or harmful content generation
- **Mitigation**: Content filtering, character restrictions, usage monitoring
- **Monitoring**: Review translation requests and outputs

### 4. Denial of Service
- **Risk**: Overwhelming the service with requests
- **Mitigation**: Rate limiting, Cloudflare DDoS protection
- **Monitoring**: Track request patterns and response times

## Security Checklist

### Deployment Security
- [ ] Environment variables properly configured
- [ ] HTTPS enforced (handled by Cloudflare)
- [ ] Security headers configured
- [ ] Rate limiting enabled
- [ ] Input validation active
- [ ] Logging enabled

### Monitoring Setup
- [ ] Request logging configured
- [ ] Rate limit monitoring
- [ ] Error tracking setup
- [ ] API usage monitoring
- [ ] Cost alerts configured

### Regular Maintenance
- [ ] API key rotation schedule
- [ ] Security header updates
- [ ] Input validation pattern updates
- [ ] Log review process
- [ ] Performance monitoring

## Incident Response

### Rate Limit Abuse
1. Identify the source IP from logs
2. Check for patterns indicating automated abuse
3. Consider additional blocking at Cloudflare level
4. Review and adjust rate limits if necessary

### Prompt Injection Attempts
1. Review logged rejected inputs
2. Analyze attack patterns
3. Update input validation rules
4. Report severe attempts to relevant authorities

### API Cost Anomalies
1. Check API usage patterns
2. Identify potential abuse sources
3. Implement additional rate limiting if needed
4. Contact OpenRouter support if necessary

## Contact

For security concerns or incident reporting, please refer to the main project documentation or contact the development team.