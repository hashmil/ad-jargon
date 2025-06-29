# Environment Variables Reference

Complete reference for configuring the Ad Agency Jargon Translator with environment variables.

## 📋 Overview

The application uses environment variables for configuration, primarily for API keys and deployment settings. All sensitive variables should be stored in `.env.local` for local development and configured in your deployment platform for production.

## 🔑 Required Variables

### OPENROUTER_API_KEY

**Description**: API key for OpenRouter service to access AI translation models  
**Required**: Yes (for AI translation, fallback works without it)  
**Format**: `sk-or-v1-{random-string}`  
**Example**: `sk-or-v1-1234567890abcdef1234567890abcdef`  

**How to obtain**:
1. Visit [openrouter.ai](https://openrouter.ai)
2. Create account (free)
3. Navigate to Keys section
4. Generate new API key
5. Copy the full key including `sk-or-v1-` prefix

**Usage**:
```bash
# .env.local (development)
OPENROUTER_API_KEY=sk-or-v1-your-actual-key-here

# Cloudflare Pages (production)
# Add via dashboard: Settings → Environment variables
```

**Security notes**:
- Never commit to version control
- Store securely in deployment platform
- Rotate regularly for security
- Use different keys for development/production

## 🔧 Optional Variables

### NODE_ENV

**Description**: Deployment environment indicator  
**Required**: No (auto-set by Next.js)  
**Values**: `development` | `production` | `test`  
**Default**: `development` (local), `production` (build)

```bash
# Usually auto-configured, but can be set explicitly
NODE_ENV=production
```

### DEBUG

**Description**: Enable debug logging and detailed error messages  
**Required**: No  
**Values**: `*` | `false` | specific modules  
**Default**: `false`

```bash
# Enable all debug logging
DEBUG=*

# Enable specific modules
DEBUG=api,translation
```

### NEXT_TELEMETRY_DISABLED

**Description**: Disable Next.js telemetry collection  
**Required**: No  
**Values**: `1` | `true` (to disable)  
**Default**: Telemetry enabled

```bash
# Disable telemetry
NEXT_TELEMETRY_DISABLED=1
```

## 🌍 Platform-Specific Variables

### Cloudflare Pages

**Platform variables** (automatically set):
```bash
# Cloudflare-specific
CF_PAGES=1
CF_PAGES_COMMIT_SHA=abc123...
CF_PAGES_BRANCH=main
CF_PAGES_URL=https://your-project.pages.dev

# Next.js compatibility
NEXT_RUNTIME=edge
```

**Custom variables to set**:
```bash
# Required
OPENROUTER_API_KEY=sk-or-v1-your-key-here

# Optional optimisations
NODE_ENV=production
```

### Vercel

**Platform variables** (automatically set):
```bash
# Vercel-specific
VERCEL=1
VERCEL_ENV=production
VERCEL_GIT_COMMIT_SHA=abc123...
VERCEL_URL=your-project.vercel.app

# Next.js optimised
```

**Custom variables to set**:
```bash
# Required
OPENROUTER_API_KEY=sk-or-v1-your-key-here
```

### Self-Hosting

**Required for self-hosting**:
```bash
# API configuration
OPENROUTER_API_KEY=sk-or-v1-your-key-here

# Production optimisation
NODE_ENV=production
PORT=3000

# Optional debugging
DEBUG=false
```

## 📁 Environment File Formats

### .env.local (Development)
```bash
# Ad Agency Jargon Translator - Local Development Configuration

# OpenRouter API (Required for AI translation)
OPENROUTER_API_KEY=sk-or-v1-your-development-key-here

# Optional: Debug logging
# DEBUG=*

# Optional: Disable Next.js telemetry
# NEXT_TELEMETRY_DISABLED=1
```

### .env.production (Production)
```bash
# Ad Agency Jargon Translator - Production Configuration

# OpenRouter API (Required)
OPENROUTER_API_KEY=sk-or-v1-your-production-key-here

# Production environment
NODE_ENV=production

# Disable debug logging
DEBUG=false

# Disable telemetry
NEXT_TELEMETRY_DISABLED=1
```

### .env.example (Template)
```bash
# Ad Agency Jargon Translator - Environment Template
# Copy to .env.local and fill in your values

# OpenRouter API Key (Required)
# Get free key at: https://openrouter.ai
OPENROUTER_API_KEY=sk-or-v1-your-key-here

# Optional: Enable debug logging
# DEBUG=*

# Optional: Disable Next.js telemetry
# NEXT_TELEMETRY_DISABLED=1
```

## 🔒 Security Best Practices

### Local Development
```bash
# Secure .env.local file
chmod 600 .env.local

# Verify .gitignore excludes env files
grep -E "\.env.*" .gitignore
```

### Deployment Platforms

#### Cloudflare Pages
1. **Dashboard**: Go to Settings → Environment variables
2. **Add variable**: Name: `OPENROUTER_API_KEY`, Value: `your-key`
3. **Environment**: Set for both Production and Preview
4. **Encryption**: Variables are automatically encrypted

#### Vercel
1. **Dashboard**: Go to Settings → Environment Variables
2. **Add variable**: Name: `OPENROUTER_API_KEY`, Value: `your-key`
3. **Environment**: Select Production, Preview, Development as needed
4. **Encryption**: Variables are automatically encrypted

#### Self-Hosting
```bash
# Use environment-specific files
cp .env.example .env.production
nano .env.production  # Edit securely

# Set file permissions
chmod 600 .env.production

# Use process managers with env support
pm2 start npm --name "ad-jargon" -- start
```

## 🧪 Testing Environment Variables

### Verify Local Setup
```bash
# Check if .env.local exists
ls -la .env.local

# Verify format (no spaces around =)
cat .env.local

# Test in Node.js
node -e "require('dotenv').config({path:'.env.local'}); console.log(process.env.OPENROUTER_API_KEY ? 'API key loaded' : 'API key missing');"
```

### Test API Key Validity
```bash
# Test OpenRouter API key
curl -H "Authorization: Bearer $OPENROUTER_API_KEY" \
     https://openrouter.ai/api/v1/models

# Should return JSON with available models
```

### Verify Production Variables
```javascript
// In browser console (production only shows undefined for security)
console.log('API Key available:', !!process.env.OPENROUTER_API_KEY); // Should be undefined
console.log('Node ENV:', process.env.NODE_ENV); // Should show environment

// Server-side verification (in API route)
console.log('Server has API key:', !!process.env.OPENROUTER_API_KEY);
```

## 🔧 Configuration Debugging

### Common Issues

#### "API key not found"
```bash
# Check file exists
ls -la .env.local

# Check format (no extra spaces)
OPENROUTER_API_KEY=sk-or-v1-your-key-here  # ✅ Correct
OPENROUTER_API_KEY = sk-or-v1-your-key-here  # ❌ Spaces around =

# Restart development server
npm run dev
```

#### "Environment variables not loading"
```bash
# Verify Next.js environment variable precedence:
# 1. .env.local (highest priority)
# 2. .env.production or .env.development
# 3. .env

# Check for typos in variable names
grep -i openrouter .env.local
```

#### "Variables not available in browser"
```javascript
// This is expected! Sensitive variables are server-side only
// Only variables prefixed with NEXT_PUBLIC_ are available in browser
// NEVER use NEXT_PUBLIC_ for API keys!

// Server-side only (API routes)
process.env.OPENROUTER_API_KEY  // ✅ Available

// Client-side (browser)
process.env.OPENROUTER_API_KEY  // ✅ Undefined (for security)
```

## 📊 Variable Priority Order

Next.js loads environment variables in this order (highest priority first):

1. `.env.local` (always loaded, gitignored)
2. `.env.production` or `.env.development` (based on NODE_ENV)
3. `.env` (loaded in all environments)

### Example Priority
```bash
# If all files exist:
# .env.local
OPENROUTER_API_KEY=local-key

# .env.production  
OPENROUTER_API_KEY=prod-key

# .env
OPENROUTER_API_KEY=default-key

# Result: local-key is used (highest priority)
```

## 🔄 Environment Switching

### Development to Production
```bash
# Development (.env.local)
OPENROUTER_API_KEY=sk-or-v1-dev-key
DEBUG=*

# Production (deployment platform)
OPENROUTER_API_KEY=sk-or-v1-prod-key
NODE_ENV=production
DEBUG=false
```

### Multiple Environments
```bash
# .env.development
DEBUG=*
OPENROUTER_API_KEY=sk-or-v1-dev-key

# .env.staging
DEBUG=false
OPENROUTER_API_KEY=sk-or-v1-staging-key

# .env.production
DEBUG=false
OPENROUTER_API_KEY=sk-or-v1-prod-key
```

## 📚 Related Documentation

- **[Quick Start Guide](./quick-start.md)** - Initial environment setup
- **[Development Guide](./development.md)** - Development environment details
- **[Deployment Guide](./deployment-cloudflare.md)** - Production environment setup
- **[Troubleshooting](./troubleshooting.md)** - Environment variable issues
- **[API Documentation](./api.md)** - How variables are used in API routes

---

Remember: Environment variables are the foundation of a secure, configurable application. Keep your API keys safe and your configuration clean! 🔐✨