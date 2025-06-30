# Frequently Asked Questions (FAQ)

Common questions about the Ad Agency Jargon Translator project.

## 🎭 About the Project

### What is the Ad Agency Jargon Translator?
A satirical web application that transforms normal business language into hilariously over-the-top advertising agency buzzwords. It's designed to parody the ridiculous, impenetrable language often used in corporate environments.

### Is this a serious business tool?
Not at all! This is pure satire designed to bring humour to the corporate world. While it does work as advertised (transforming text into jargon), its primary purpose is entertainment and gentle mockery of buzzword culture.

### Who is the target audience?
Anyone who has ever been in a corporate meeting and rolled their eyes at buzzword bingo. Marketing professionals, agency workers, and anyone familiar with corporate speak will appreciate the humour.

### Why British English?
The project uses British English throughout (optimise, colour, realise) for consistency and to differentiate from American corporate speak. It's also a nod to the international nature of the advertising industry.

## 🔧 Technical Questions

### What technologies power this application?
- **Frontend**: Next.js 15 + React 19 + TypeScript
- **Styling**: TailwindCSS v4 with custom gradients
- **AI**: OpenRouter API with Mistral Small 3.2 24B model
- **Hosting**: Cloudflare Pages with Edge Runtime
- **Reliability**: Retry logic with up to 2 attempts for failed requests

### Why use OpenRouter instead of OpenAI directly?
- **Cost**: Free tier with generous limits
- **Multiple Models**: Access to various AI models through one API
- **Reliability**: Good uptime and performance
- **Flexibility**: Easy to switch models if needed

### What happens if the AI is unavailable?
The application uses retry logic to handle temporary failures. If the initial request fails, it will automatically retry up to 2 times. If all attempts fail, the user will receive an error message and can try again manually.

### How does the retry system work?
The application implements:
1. **Automatic retries**: Up to 2 additional attempts for failed requests
2. **Exponential backoff**: Brief delays between retry attempts
3. **Error handling**: Clear error messages when all attempts fail
4. **Manual retry**: Users can simply click translate again

### Is my data stored anywhere?
No! The application is completely stateless:
- Your input text is processed and immediately discarded
- No user data is stored in databases
- No tracking beyond basic analytics
- Each translation request is independent

## 🚀 Usage Questions

### How accurate are the translations?
"Accuracy" is subjective for satirical content! The AI translations are creative and contextual, aiming to be entertainingly over-the-top rather than "accurate." The AI model provides sophisticated understanding of business language and corporate culture.

### Can I use this for actual business communications?
Please don't! While the output is grammatically correct, it's intentionally ridiculous and may confuse or alienate your audience. Use it for humour, training examples, or understanding how corporate jargon works.

### What's the character limit for input?
There's no hard limit enforced, but:
- **Recommended**: Under 500 characters for best results
- **AI Model**: Has a context window, very long inputs may be truncated
- **Performance**: Shorter inputs translate faster

### Why does the same input sometimes produce different outputs?
- **AI Creativity**: Uses temperature=0.8 for creative variation in outputs
- **Model Behaviour**: AI models naturally produce slightly different results
- **Contextual Understanding**: The AI considers subtle nuances in phrasing

### Can I translate non-English text?
The system is designed for English business language. Other languages may produce unexpected results or fail to translate properly.

## 🛠️ Development Questions

### Can I contribute to the project?
Absolutely! The project welcomes contributions:
- **Bug reports**: Report issues on GitHub
- **Feature requests**: Suggest improvements
- **Code contributions**: Submit pull requests
- **Documentation**: Help improve guides and docs

### How do I customize the AI translation behaviour?
Edit the prompt in `app/api/translate/route.ts`:

```typescript
// Modify the system prompt to adjust translation style
const prompt = `Your customized instructions for the AI model...`;
```

### Can I use a different AI model?
Yes! Edit `app/api/translate/route.ts`:

```typescript
// Change the model
model: "anthropic/claude-3-haiku"
// or
model: "openai/gpt-3.5-turbo"
```

Note: Different models may have different pricing and capabilities.

### How do I deploy to other platforms?
The application works on any platform supporting Next.js:
- **Vercel**: Native Next.js support
- **Netlify**: Use Next.js adapter
- **Railway**: Docker or buildpack deployment
- **Self-hosted**: Standard Node.js server

### Why Edge Runtime instead of Node.js runtime?
Edge Runtime provides:
- **Global performance**: Runs close to users worldwide
- **Fast cold starts**: <50ms initialization
- **Cost efficiency**: Pay per request, not server time
- **Auto-scaling**: Handles traffic spikes automatically

## 💰 Cost and Pricing

### Is this free to use?
Yes! The live application at [ad-jargon.pages.dev](https://ad-jargon.pages.dev) is completely free to use.

### What are the hosting costs?
**Cloudflare Pages Free Tier includes:**
- 500 builds per month
- 100,000 requests per day
- Unlimited bandwidth
- Global CDN

**OpenRouter Free Tier includes:**
- Access to Mistral Small 3.2 24B model
- Rate-limited but generous for personal use
- Retry logic handles temporary failures

### What if I exceed the free limits?
- **Cloudflare**: Upgrade to Pages Pro ($20/month) for higher limits
- **OpenRouter**: Add credits for additional AI usage
- **Retry Logic**: Helps handle temporary rate limiting

### Can I monetise my own deployment?
The project is open source under MIT License, so you can:
- Deploy your own version
- Modify and customise
- Use commercially (check dependencies' licenses)
- Add your own monetisation

## 🔒 Security and Privacy

### Is it safe to use?
Yes, the application is designed with security in mind:
- **No data storage**: Your input isn't saved anywhere
- **Environment variables**: API keys are properly secured
- **Input validation**: Protects against malicious input
- **HTTPS**: All traffic is encrypted

### Do you track users?
Minimal analytics only:
- **Cloudflare Analytics**: Basic traffic metrics (anonymous)
- **No personal data**: No names, emails, or identification
- **No cookies**: Beyond necessary technical cookies
- **No third-party tracking**: No Google Analytics, Facebook pixels, etc.

### Can I use this for sensitive content?
While the application is secure, avoid inputting:
- Confidential business information
- Personal identifying information
- Trade secrets or proprietary data
- Anything you wouldn't want potentially logged

### How do you handle API keys?
- **Server-side only**: API keys never reach the browser
- **Environment variables**: Securely stored in deployment platform
- **No logging**: Keys are never written to logs
- **Encrypted**: Transmitted over HTTPS only

## 🌍 Deployment and Self-Hosting

### Can I host this myself?
Yes! The project is open source:

```bash
git clone https://github.com/hashmil/ad-jargon.git
cd ad-jargon
npm install
npm run build
npm start
```

### What are the system requirements?
- **Node.js**: Version 18 or later
- **Memory**: 512MB minimum (1GB recommended)
- **Storage**: ~100MB for application + dependencies
- **Network**: Internet access for AI API calls

### Can I run this offline?
No, the application requires an internet connection:
- **AI translation**: Requires connection to OpenRouter API
- **No offline mode**: All translation is handled by AI
- **Static assets**: Can be cached for faster loading

### How do I customize the jargon?
Several customisation points:
- **AI prompts**: Modify system prompts in `app/api/translate/route.ts`
- **Model selection**: Choose different AI models for different styles
- **UI text**: Update `app/page.tsx`
- **Styling**: Customize TailwindCSS classes

## 🎨 Customisation

### Can I change the visual design?
Absolutely! The application uses TailwindCSS:
- **Colors**: Modify gradient classes in `app/page.tsx`
- **Layout**: Adjust responsive breakpoints and spacing
- **Components**: Create custom components in `components/`
- **Themes**: Add dark/light mode switching

### Can I add more example phrases?
Yes, edit the example phrases in your main component:

```typescript
const examplePhrases = [
  // Add your examples here
  "Your new example phrase",
  "Another business scenario",
  // ... existing phrases
];
```

### Can I integrate this into my own application?
Yes! You can:
- **Use the API**: Call `/api/translate` from your application
- **Embed components**: Extract React components for reuse
- **Fork the project**: Create your own version
- **NPM package**: Could be packaged for easy integration

## 🐛 Troubleshooting

### The translation isn't working, what should I check?
1. **Verify API key**: Is your OpenRouter key valid and active?
2. **Network issues**: Can you reach openrouter.ai?
3. **Rate limits**: Have you exceeded the API rate limits?
4. **Console errors**: Any JavaScript errors in browser?
5. **Retry**: Try the translation again as retry logic may resolve temporary issues

### Why am I getting American spellings?
- **AI model**: May default to American English despite prompts
- **Prompt refinement**: Adjust system prompts to emphasize British spellings
- **Input text**: American spellings in input may influence output
- **Model training**: AI models may have bias toward American English

### The site is slow, how can I speed it up?
- **CDN**: Cloudflare provides global caching
- **AI response**: Can take 2-5 seconds (normal for AI processing)
- **Retry delays**: Retry logic may add slight delays for failed requests
- **Network**: Check your internet connection and API response times

### Common error messages and solutions:
- **"Text is required"**: Ensure you've entered text before translating
- **"Translation failed"**: Try again, retry logic will attempt up to 2 more times
- **"Network error"**: Check internet connection to OpenRouter API
- **"Rate limited"**: Wait a moment and try again, or check your API usage limits
- **"API key invalid"**: Verify your OpenRouter API key is correct and active

## 🤝 Community and Support

### Where can I get help?
1. **Documentation**: Check the [docs/](./README.md) folder
2. **GitHub Issues**: Report bugs or ask questions
3. **Source code**: Review implementation details
4. **Troubleshooting**: Follow the debugging guide

### How can I contribute?
- **Report bugs**: Use GitHub issues with detailed information
- **Suggest features**: Propose new functionality
- **Submit code**: Create pull requests with improvements
- **Improve docs**: Help make documentation clearer

### Can I translate this to other languages?
The application could be internationalised:
- **UI text**: Extract strings to translation files
- **Jargon mappings**: Create language-specific mappings
- **AI prompts**: Adapt prompts for different languages
- **Cultural context**: Adapt humour for different business cultures

---

Have a question not covered here? [Open an issue on GitHub](https://github.com/hashmil/ad-jargon/issues) and we'll add it to the FAQ! 

Remember: This is meant to be fun! If you find yourself taking corporate jargon too seriously, you might need a dose of satirical translation. 😄