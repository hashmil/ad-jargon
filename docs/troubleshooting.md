# Troubleshooting Guide

Common issues and solutions for the Ad Agency Jargon Translator.

## 🚨 Quick Diagnostics

### Is the application working?
1. **Visit**: [https://ad-jargon.pages.dev](https://ad-jargon.pages.dev)
2. **Test**: Type "Let's discuss the budget" and click translate
3. **Expected**: Should return jargon-filled translation

### Basic health checks
```bash
# Local development
npm run dev          # Should start without errors
npm run build        # Should complete successfully
npm run lint         # Should pass with no errors
```

## 🔧 Common Issues & Solutions

### Development Environment

#### Issue: `npm install` fails
**Symptoms:**
```
npm ERR! Cannot resolve dependency tree
npm ERR! peer dep missing
```

**Solutions:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall with latest npm
npm install

# If still failing, try with legacy peer deps
npm install --legacy-peer-deps
```

#### Issue: Development server won't start
**Symptoms:**
```
Error: Port 3000 is already in use
```

**Solutions:**
```bash
# Find and kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
npm run dev -- --port 3001

# Check for other Next.js processes
ps aux | grep next
```

#### Issue: Environment variables not loading
**Symptoms:**
- API translation fails
- Console shows "API key not found"

**Solutions:**
```bash
# Check .env.local exists
ls -la .env.local

# Verify format (no spaces around =)
OPENROUTER_API_KEY=sk-or-v1-your-key-here

# Restart development server
npm run dev

# Check environment in browser console
console.log(process.env.OPENROUTER_API_KEY); // Should be undefined (security)
```

### AI Translation Issues

The application relies entirely on AI-powered translation via the OpenRouter API. All translation issues are related to AI API connectivity, authentication, or service availability.

#### Issue: AI translation failing
**Symptoms:**
- Translation requests fail with error messages
- Retry attempts not working
- Timeout errors on API calls

**Solutions:**
1. **Verify API Key:**
   ```bash
   # Test your API key directly
   curl -H "Authorization: Bearer $OPENROUTER_API_KEY" \
        https://openrouter.ai/api/v1/models
   ```

2. **Check API Key Format:**
   ```
   ✅ Correct: sk-or-v1-abcd1234...
   ❌ Wrong: abcd1234... (missing prefix)
   ❌ Wrong: sk-or-v1-abcd1234... (extra spaces)
   ```

3. **Verify Network Access:**
   ```bash
   # Test OpenRouter connectivity
   curl https://openrouter.ai/api/v1/models
   ```

4. **Check Retry Logic:**
   ```typescript
   // Verify retry configuration in API route
   const maxRetries = 3;
   const retryDelay = 1000; // 1 second
   ```

#### Issue: Translation completely failing
**Symptoms:**
- No translation output at all
- Network errors or timeouts
- API key authentication issues

**Solutions:**
1. **Check API Status:**
   ```bash
   # Test API connectivity
   curl -H "Authorization: Bearer $OPENROUTER_API_KEY" \
        https://openrouter.ai/api/v1/chat/completions \
        -H "Content-Type: application/json" \
        -d '{"model":"mistralai/mistral-7b-instruct","messages":[{"role":"user","content":"test"}]}'
   ```

2. **Verify Retry Configuration:**
   ```typescript
   // Check retry settings in API route
   const retryAttempts = await retryWithBackoff(translateRequest, 3);
   ```

#### Issue: British English not consistent
**Symptoms:**
- Mix of American and British spellings
- AI returns American spellings

**Solutions:**
1. **Check AI Prompt:**
   ```typescript
   // Ensure prompt includes British English instruction
   "Use British English spelling throughout (e.g., 'optimise,' 'realise,' 'colour,' 'centre')"
   ```

2. **Verify AI Prompt Configuration:**
   ```typescript
   // Ensure the AI prompt is properly configured for British English
   const systemPrompt = "...Use British English spelling throughout..."
   ```

### Deployment Issues

#### Issue: Cloudflare Pages build fails
**Symptoms:**
```
Error: Files exceed 25 MiB limit
Error: Package not found
```

**Solutions:**
```bash
# Check bundle size
npm run build
ls -lah .next/

# Remove heavy dependencies
npm uninstall openai  # If accidentally reinstalled

# Verify Edge Runtime
grep "export const runtime = 'edge'" app/api/*/route.ts
```

#### Issue: 404 on deployed site
**Symptoms:**
- Build succeeds but site shows 404
- API routes not working

**Solutions:**
1. **Check Build Output Directory:**
   ```
   Cloudflare Pages Settings:
   Build output directory: .vercel/output/static
   ```

2. **Verify API Routes:**
   ```bash
   # Check API routes are generated
   ls .vercel/output/static/_worker.js/
   ```

3. **Check Environment Variables:**
   ```
   Cloudflare Pages → Settings → Environment Variables
   OPENROUTER_API_KEY = your-key-here
   ```

#### Issue: Edge Runtime errors
**Symptoms:**
```
Error: node:buffer not found
Error: node:async_hooks not found
```

**Solutions:**
1. **Enable Node.js Compatibility:**
   ```
   Cloudflare Pages → Settings → Functions
   Compatibility flags: nodejs_compat
   ```

2. **Check Edge Runtime Export:**
   ```typescript
   // app/api/translate/route.ts
   export const runtime = 'edge'; // Must be present
   ```

### Performance Issues

#### Issue: Slow API responses
**Symptoms:**
- Translation takes >10 seconds
- Timeouts on requests
- Retry attempts taking too long

**Solutions:**
1. **Check API Provider Status:**
   - Visit [OpenRouter Status](https://status.openrouter.ai/)
   - Try different model if available

2. **Optimise Request:**
   ```typescript
   // Reduce max_tokens if too high
   max_tokens: 200  // vs 1000+
   
   // Check temperature setting
   temperature: 0.8  // vs 1.0+
   ```

3. **Configure Timeout and Retry:**
   ```typescript
   const controller = new AbortController();
   setTimeout(() => controller.abort(), 8000); // 8s timeout per attempt
   
   // With retry logic
   const maxRetries = 3;
   const baseDelay = 1000;
   
   fetch('/api/translate', {
     signal: controller.signal,
     // ... other options
   });
   ```

4. **Monitor Retry Behaviour:**
   ```typescript
   // Check retry logs in API route
   console.log(`Retry attempt ${attempt} of ${maxRetries}`);
   ```

#### Issue: Retry logic not working
**Symptoms:**
- Single failed request doesn't retry
- Immediate failure without retry attempts
- Retry attempts using same failed parameters

**Solutions:**
1. **Verify Retry Implementation:**
   ```typescript
   // Check retry function in API route
   async function retryWithBackoff(fn: () => Promise<any>, maxRetries: number) {
     for (let attempt = 1; attempt <= maxRetries; attempt++) {
       try {
         return await fn();
       } catch (error) {
         if (attempt === maxRetries) throw error;
         const delay = Math.pow(2, attempt) * 1000; // Exponential backoff
         await new Promise(resolve => setTimeout(resolve, delay));
       }
     }
   }
   ```

2. **Check Error Types:**
   ```typescript
   // Only retry on specific errors
   if (error.status === 429 || error.status >= 500) {
     // Retry on rate limit or server errors
     continue;
   } else {
     // Don't retry on client errors (400, 401, etc.)
     throw error;
   }
   ```

3. **Monitor Retry Logs:**
   ```bash
   # Check server logs for retry attempts
   npm run dev
   # Look for: "Retry attempt X of Y" messages
   ```

### Network Connectivity Issues

Since the application depends entirely on external AI services, network issues are critical failure points.

#### Issue: Intermittent API failures
**Symptoms:**
- Some translations work, others fail
- Inconsistent response times
- Timeout errors during peak usage

**Solutions:**
1. **Implement Connection Pooling:**
   ```typescript
   // Configure persistent connections
   const agent = new https.Agent({
     keepAlive: true,
     maxSockets: 10
   });
   ```

2. **Monitor Network Health:**
   ```bash
   # Test sustained connectivity
   for i in {1..10}; do
     curl -w "@curl-format.txt" -s -o /dev/null \
       https://openrouter.ai/api/v1/models
     sleep 1
   done
   ```

3. **Add Circuit Breaker Pattern:**
   ```typescript
   // Prevent cascade failures
   if (consecutiveFailures > 5) {
     return { error: 'Service temporarily unavailable' };
   }
   ```

#### Issue: DNS resolution problems
**Symptoms:**
- Cannot connect to openrouter.ai
- DNS lookup failures in logs

**Solutions:**
```bash
# Test DNS resolution
nslookup openrouter.ai
dig openrouter.ai

# Try alternative DNS servers
echo "nameserver 8.8.8.8" > /etc/resolv.conf
echo "nameserver 1.1.1.1" >> /etc/resolv.conf
```

#### Issue: Firewall blocking requests
**Symptoms:**
- Connections timing out
- No response from API endpoints

**Solutions:**
1. **Check Firewall Rules:**
   ```bash
   # Allow HTTPS outbound traffic
   sudo ufw allow out 443
   
   # Check corporate firewall settings
   curl -v https://openrouter.ai/api/v1/models
   ```

2. **Test from Different Networks:**
   - Try mobile hotspot vs corporate network
   - Test from different geographic locations
   - Check if VPN affects connectivity

#### Issue: High bandwidth usage
**Symptoms:**
- Unexpected Cloudflare charges
- Slow page loads

**Solutions:**
1. **Optimise Assets:**
   ```bash
   # Check asset sizes
   npm run build
   npx next-bundle-analyzer
   ```

2. **Enable Compression:**
   ```typescript
   // next.config.ts
   const nextConfig = {
     compress: true,
     // ... other config
   };
   ```

### User Interface Issues

#### Issue: Styles not loading
**Symptoms:**
- Unstyled content
- TailwindCSS classes not applied

**Solutions:**
```bash
# Check TailwindCSS compilation
npm run dev

# Verify tailwind.config.js exists
ls tailwind.config.*

# Check CSS imports
grep -r "@import" app/
```

#### Issue: Mobile layout broken
**Symptoms:**
- Overlapping content on mobile
- Horizontal scroll issues

**Solutions:**
```typescript
// Check responsive classes
<div className="grid grid-cols-1 md:grid-cols-2"> // ✅ Good
<div className="grid grid-cols-2">               // ❌ No mobile variant

// Add viewport meta tag (should be in layout.tsx)
<meta name="viewport" content="width=device-width, initial-scale=1" />
```

#### Issue: Icons not displaying
**Symptoms:**
- Missing icons from Lucide React
- Console errors about imports

**Solutions:**
```typescript
// Check import syntax
import { Zap, Coffee, Lightbulb } from 'lucide-react'; // ✅ Correct
import Zap from 'lucide-react/Zap';                    // ❌ Wrong

// Verify lucide-react is installed
npm list lucide-react
```

## 🔍 Debugging Tools

### Browser DevTools

#### Console Debugging
```javascript
// Check state in browser console
window.localStorage.getItem('debug'); // Any stored data
console.log(document.querySelector('[data-testid="translation-output"]'));

// Monitor API calls
fetch('/api/translate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ text: 'debug test' })
})
.then(r => r.json())
.then(console.log);
```

#### Network Tab
- Monitor API request/response times
- Check for failed requests (red entries)
- Verify request payloads and headers

#### Performance Tab
- Identify slow operations
- Check for memory leaks
- Monitor Core Web Vitals

### Server-side Debugging

#### API Route Logging
```typescript
// app/api/translate/route.ts
export async function POST(request: NextRequest) {
  const { text } = await request.json();
  console.log('Translation request:', text);
  
  let attempt = 0;
  const maxRetries = 3;
  
  while (attempt < maxRetries) {
    attempt++;
    console.log(`AI translation attempt ${attempt} of ${maxRetries}`);
    
    try {
      const result = await callOpenRouterAPI(text);
      console.log('AI translation successful:', result);
      return NextResponse.json(result);
    } catch (error) {
      console.error(`AI translation attempt ${attempt} failed:`, error);
      
      if (attempt === maxRetries) {
        console.error('All AI translation attempts failed');
        return NextResponse.json(
          { error: 'Translation service unavailable' },
          { status: 503 }
        );
      }
      
      // Wait before retry
      const delay = Math.pow(2, attempt) * 1000;
      console.log(`Retrying in ${delay}ms...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}
```

#### Cloudflare Logs
```bash
# View real-time logs (if using Wrangler)
wrangler tail

# Check Pages deployment logs
# Available in Cloudflare Dashboard → Pages → Your Project → Functions
```

### Local Development Debugging

#### Enable Debug Mode
```bash
# Set debug environment variable
export DEBUG=*
npm run dev

# Or in .env.local
DEBUG=*
```

#### TypeScript Checking
```bash
# Check for type errors
npx tsc --noEmit

# Watch mode
npx tsc --noEmit --watch
```

## 📋 Health Check Checklist

Use this checklist to verify everything is working:

### Frontend Health
- [ ] Page loads without console errors
- [ ] All UI components render correctly
- [ ] Mobile layout works properly
- [ ] Example phrases populate
- [ ] Input validation works
- [ ] Loading states display

### API Health
- [ ] Translation endpoint responds
- [ ] AI translation works (when API key valid)
- [ ] Retry logic handles temporary failures
- [ ] Error responses are properly formatted
- [ ] British English spelling consistent

### Performance Health
- [ ] Page loads in <3 seconds
- [ ] API responses in <10 seconds
- [ ] No memory leaks in DevTools
- [ ] Lighthouse score >90

### Security Health
- [ ] No API keys in client-side code
- [ ] Environment variables properly secured
- [ ] No sensitive data in console logs
- [ ] Input sanitisation working

## 🆘 Getting Additional Help

### Self-Service Resources
1. **Documentation**: Check [docs/](./README.md) folder
2. **Logs**: Browser console and server logs
3. **Source Code**: Review the implementation
4. **Community**: Search GitHub issues

### Contacting Support
1. **GitHub Issues**: [Create new issue](https://github.com/hashmil/ad-jargon/issues/new)
2. **Include Information**:
   - Operating system and version
   - Node.js version (`node --version`)
   - npm version (`npm --version`)
   - Error messages and stack traces
   - Steps to reproduce

### Issue Template
```markdown
## Bug Report

**Environment:**
- OS: [e.g., macOS 13.0]
- Node.js: [e.g., 18.17.0]
- npm: [e.g., 9.6.7]
- Browser: [e.g., Chrome 115]

**Problem:**
[Clear description of the issue]

**Steps to Reproduce:**
1. [First step]
2. [Second step]
3. [etc.]

**Expected Behavior:**
[What should happen]

**Actual Behavior:**
[What actually happens]

**Console Errors:**
```
[Any error messages]
```

**Additional Context:**
[Any other relevant information]
```

---

Remember: Most issues have simple solutions! When in doubt, try turning it off and on again (restart the development server). 🔄✨