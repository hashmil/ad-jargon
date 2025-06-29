# Cloudflare Pages Deployment Guide

This guide walks you through deploying the Ad Agency Jargon Translator to Cloudflare Pages, the recommended hosting platform for optimal performance and cost.

## 🌟 Why Cloudflare Pages?

- **🆓 Generous Free Tier**: 500 builds/month, unlimited bandwidth
- **⚡ Global Edge Network**: Sub-50ms response times worldwide
- **🚀 Auto-scaling**: Handles traffic spikes automatically
- **🔧 Built-in CI/CD**: Auto-deploy from GitHub commits
- **💰 Cost Effective**: Free for most use cases

## 📋 Prerequisites

Before starting, ensure you have:

- [x] **GitHub Account**: Repository must be on GitHub
- [x] **Cloudflare Account**: Free account at [cloudflare.com](https://cloudflare.com)
- [x] **OpenRouter API Key**: Get free key at [openrouter.ai](https://openrouter.ai)
- [x] **Git Repository**: Code pushed to GitHub

## 🚀 Step-by-Step Deployment

### Step 1: Prepare Your Repository

1. **Ensure your code is committed and pushed:**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Verify your `.gitignore` excludes sensitive files:**
   ```gitignore
   # Local env files
   .env
   .env*.local
   .env.production
   ```

### Step 2: Connect to Cloudflare Pages

1. **Navigate to Cloudflare Pages:**
   - Go to [dash.cloudflare.com](https://dash.cloudflare.com)
   - Click **"Pages"** in the sidebar
   - Click **"Create a project"**

2. **Connect your Git repository:**
   - Choose **"Connect to Git"**
   - Authorize Cloudflare to access your GitHub account
   - Select your repository: `hashmil/ad-jargon`

### Step 3: Configure Build Settings

**Framework Preset:** `Next.js`

**Build Settings:**
```
Framework preset: Next.js
Build command: npx @cloudflare/next-on-pages@1
Build output directory: .vercel/output/static
Root directory: (leave empty)
```

**Environment Variables:**
```
OPENROUTER_API_KEY = your_openrouter_api_key_here
```

### Step 4: Deploy

1. **Click "Save and Deploy"**
2. **Monitor the build process** (takes 2-3 minutes)
3. **Access your deployed site** at the provided URL

## 🔧 Advanced Configuration

### Custom Domain Setup

1. **Purchase/Configure Domain:**
   - Own domain or use Cloudflare domain
   - Configure DNS in Cloudflare

2. **Add Custom Domain:**
   ```
   Pages → Your Project → Custom domains → Set up a custom domain
   ```

3. **SSL Certificate:**
   - Automatically provisioned by Cloudflare
   - Full SSL/TLS encryption enabled

### Environment Variables

#### Production Environment
```bash
# Required
OPENROUTER_API_KEY=sk-or-v1-your-key-here

# Optional (auto-configured)
NODE_ENV=production
```

#### Preview Environment
Set the same variables for preview deployments of pull requests.

### Build Optimisations

#### Node.js Compatibility
If you encounter Node.js compatibility warnings:

1. Go to **Settings → Functions**
2. Add compatibility flag: `nodejs_compat`

#### Build Performance
```typescript
// next.config.ts - Additional optimisations
const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ['lucide-react']
  }
};
```

## 🔄 Continuous Deployment

### Automatic Deployments

**Triggers:**
- ✅ Push to `main` branch → Production deployment
- ✅ Pull request → Preview deployment
- ✅ Manual trigger → On-demand deployment

**Build Process:**
```
GitHub Push → Cloudflare Webhook → Build Trigger → Edge Deployment
```

### Branch Deployments

**Production Branch:** `main`
- Deploys to your custom domain
- Full production environment

**Preview Branches:** Any PR or branch
- Deploys to temporary subdomain
- Same environment variables
- Perfect for testing

## 📊 Monitoring & Analytics

### Built-in Analytics

Access via **Pages → Your Project → Analytics:**

- **Traffic Metrics**: Requests, bandwidth, response times
- **Error Tracking**: 4xx/5xx response codes
- **Geographic Distribution**: Global traffic patterns
- **Performance Metrics**: Core Web Vitals

### Real User Monitoring (RUM)

Enable RUM for detailed performance insights:
```typescript
// Add to your app if needed
import { analytics } from '@vercel/analytics/react';
```

## 🛠️ Troubleshooting Common Issues

### Build Failures

#### Issue: "Package not found"
```
Error: Package "openai" not found
```
**Solution:** Ensure all dependencies are in `package.json`, not just dev dependencies.

#### Issue: "Files too large"
```
Error: Files exceed 25 MiB limit
```
**Solution:** Check that heavy packages are removed (like `openai` SDK).

#### Issue: "Edge runtime error"
```
Error: API routes must export runtime = 'edge'
```
**Solution:** Ensure all API routes have `export const runtime = 'edge';`

### Runtime Errors

#### Issue: "Environment variable not found"
**Solution:** 
1. Check environment variables in Pages settings
2. Ensure variable names match exactly
3. Redeploy after adding variables

#### Issue: "404 Not Found"
**Solution:**
1. Verify build output directory: `.vercel/output/static`
2. Check build logs for errors
3. Ensure all routes are properly generated

#### Issue: "API calls failing"
**Solution:**
1. Verify OpenRouter API key is valid
2. Check API endpoint is accessible
3. Review Cloudflare Function logs

### Performance Issues

#### Slow Response Times
**Solutions:**
1. Enable Cloudflare caching for static assets
2. Optimise image sizes and formats
3. Check for unnecessary re-renders in React

#### High Bandwidth Usage
**Solutions:**
1. Enable compression in Cloudflare settings
2. Optimise asset delivery
3. Implement proper caching headers

## 🔐 Security Best Practices

### Environment Variables
- ✅ Never commit API keys to Git
- ✅ Use Cloudflare's encrypted environment variables
- ✅ Rotate API keys regularly
- ✅ Use different keys for preview/production

### Headers Configuration
```typescript
// Add security headers via next.config.ts
const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
        ],
      },
    ];
  },
};
```

## 💰 Cost Management

### Free Tier Limits
```
✅ 500 builds per month
✅ 100,000 requests per day  
✅ 100,000 CPU seconds per day
✅ Unlimited bandwidth
✅ Unlimited sites
```

### Monitoring Usage
- Check usage in **Cloudflare Dashboard → Pages → Analytics**
- Set up billing alerts if approaching limits
- Optimise builds to stay within free tier

### Scaling Beyond Free Tier
**Pages Pro ($20/month):**
- 5,000 builds per month
- 1,000,000 requests per day
- 1,000,000 CPU seconds per day
- Priority support

## 🎯 Production Checklist

Before going live, verify:

- [ ] **Build Success**: All builds complete without errors
- [ ] **Environment Variables**: All required variables configured
- [ ] **Custom Domain**: DNS properly configured (if using)
- [ ] **SSL Certificate**: HTTPS working correctly
- [ ] **Performance**: Site loads quickly globally
- [ ] **API Functionality**: Translation endpoints working
- [ ] **Error Handling**: Graceful fallbacks in place
- [ ] **Analytics**: Monitoring configured
- [ ] **Security Headers**: Proper security configuration

## 🔄 Updates & Maintenance

### Updating the Application
```bash
# Make changes locally
git add .
git commit -m "Update feature X"
git push origin main
# Cloudflare automatically deploys
```

### Rolling Back Deployments
1. Go to **Pages → Your Project → Deployments**
2. Find previous successful deployment
3. Click **"Rollback to this deployment"**

### Monitoring Health
- Set up uptime monitoring (Cloudflare or third-party)
- Monitor error rates in analytics
- Check API response times regularly

---

Congratulations! Your Ad Agency Jargon Translator is now live on Cloudflare's global edge network, ready to synergise corporate buzzwords at enterprise scale! 🚀🎭