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
- **Fallback**: Rule-based translation system

### Why use OpenRouter instead of OpenAI directly?
- **Cost**: Free tier with generous limits
- **Multiple Models**: Access to various AI models through one API
- **Reliability**: Good uptime and performance
- **Flexibility**: Easy to switch models if needed

### What happens if the AI is unavailable?
The application has a robust fallback system that uses rule-based translation. It will always provide a jargon translation even if the AI service is down, ensuring 100% uptime for core functionality.

### How does the fallback system work?
It uses:
1. **Predefined mappings**: 40+ common business terms to jargon equivalents
2. **Buzzword injection**: Random corporate buzzwords added throughout
3. **Template phrases**: Agency-style prefixes and suffixes
4. **British spelling**: Consistent with the overall application

### Is my data stored anywhere?
No! The application is completely stateless:
- Your input text is processed and immediately discarded
- No user data is stored in databases
- No tracking beyond basic analytics
- Each translation request is independent

## 🚀 Usage Questions

### How accurate are the translations?
"Accuracy" is subjective for satirical content! The AI translations are creative and contextual, while the fallback system is more predictable but reliable. Both aim to be entertainingly over-the-top rather than "accurate."

### Can I use this for actual business communications?
Please don't! While the output is grammatically correct, it's intentionally ridiculous and may confuse or alienate your audience. Use it for humour, training examples, or understanding how corporate jargon works.

### What's the character limit for input?
There's no hard limit enforced, but:
- **Recommended**: Under 500 characters for best results
- **AI Model**: Has a context window, very long inputs may be truncated
- **Performance**: Shorter inputs translate faster

### Why does the same input sometimes produce different outputs?
- **AI Translation**: Uses temperature=0.8 for creativity, so outputs vary
- **Fallback System**: Includes randomness in buzzword injection
- **Different Methods**: AI vs fallback will produce different styles

### Can I translate non-English text?
The system is designed for English business language. Other languages may produce unexpected results or fail to translate properly.

## 🛠️ Development Questions

### Can I contribute to the project?
Absolutely! The project welcomes contributions:
- **Bug reports**: Report issues on GitHub
- **Feature requests**: Suggest improvements
- **Code contributions**: Submit pull requests
- **Documentation**: Help improve guides and docs

### How do I add my own jargon mappings?
Edit `lib/translator.ts`:

```typescript
export const jargonMap: JargonMap = {
  // Add your mappings here
  'your-term': 'synergistic replacement',
  'another-word': 'paradigm-shifting alternative',
  // ... existing mappings
};
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
- Fallback system ensures availability

### What if I exceed the free limits?
- **Cloudflare**: Upgrade to Pages Pro ($20/month) for higher limits
- **OpenRouter**: Add credits for additional AI usage
- **Fallback**: Always works regardless of AI limits

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
Partially:
- **Fallback system**: Works completely offline
- **AI translation**: Requires internet connection to OpenRouter
- **Static assets**: Can be cached for offline use

### How do I customize the jargon?
Several customisation points:
- **Jargon mappings**: Edit `lib/translator.ts`
- **AI prompts**: Modify `app/api/translate/route.ts`
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
Yes, edit `lib/translator.ts`:

```typescript
export const examplePhrases = [
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
1. **Check the fallback**: Does rule-based translation work?
2. **Verify API key**: Is your OpenRouter key valid?
3. **Network issues**: Can you reach openrouter.ai?
4. **Console errors**: Any JavaScript errors in browser?

### Why am I getting American spellings?
- **AI model**: May default to American English despite prompts
- **Fallback mappings**: Check if all use British spellings
- **Input text**: American spellings in input may influence output

### The site is slow, how can I speed it up?
- **CDN**: Cloudflare provides global caching
- **AI response**: Can take 2-5 seconds (normal)
- **Fallback**: Should be <100ms response time
- **Network**: Check your internet connection

### Common error messages and solutions:
- **"Text is required"**: Ensure you've entered text before translating
- **"Translation failed"**: Try again, fallback should still work
- **"Network error"**: Check internet connection
- **"Rate limited"**: Wait a moment and try again

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