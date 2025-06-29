# Quick Start Guide

Get the Ad Agency Jargon Translator running in 5 minutes! Transform your normal business speak into hilariously over-the-top agency buzzwords.

## 🚀 Live Demo

**Try it now:** [https://ad-jargon.pages.dev](https://ad-jargon.pages.dev)

Just type any normal business phrase and watch it transform into corporate satire!

## ⚡ 5-Minute Local Setup

### Prerequisites

- **Node.js 18+** ([Download here](https://nodejs.org/))
- **Git** ([Download here](https://git-scm.com/))
- **OpenRouter API Key** (Free at [openrouter.ai](https://openrouter.ai))

### Step 1: Clone & Install

```bash
# Clone the repository
git clone https://github.com/hashmil/ad-jargon.git
cd ad-jargon

# Install dependencies
npm install
```

### Step 2: Configure Environment

```bash
# Create environment file
cp .env.local.example .env.local

# Edit with your API key
echo "OPENROUTER_API_KEY=your_api_key_here" > .env.local
```

### Step 3: Run Development Server

```bash
# Start the application
npm run dev
```

**🎉 Open [http://localhost:3000](http://localhost:3000) and start translating!**

## 🎯 Try These Examples

Copy and paste these into the translator:

### Basic Examples
- `"Let's think of some new ideas"`
- `"We need to discuss the budget"`
- `"This is an important project"`

### Business Scenarios
- `"The client wants changes to the design"`
- `"We should work together on this campaign"`
- `"Let's have a meeting about the proposal"`

### Expected Results
Normal: *"Let's brainstorm some ideas"*
→ Jargon: *"Moving forward, we should leverage disruptive ideation to optimise our value proposition for scalable growth potential."*

## 🔧 What's Included

### Core Features
- ✅ **AI-Powered Translation** - Mistral AI via OpenRouter
- ✅ **Intelligent Fallback** - Rule-based system always works
- ✅ **British English** - Proper spelling (optimise, colour, etc.)
- ✅ **Real-time UI** - Instant feedback and loading states
- ✅ **Example Phrases** - Pre-loaded inspiration
- ✅ **Responsive Design** - Works on all devices

### Tech Stack
- **Frontend**: Next.js 15 + React 19 + TypeScript
- **Styling**: TailwindCSS v4 with gradients
- **API**: Edge Runtime optimised for global performance
- **AI**: OpenRouter + Mistral Small 3.2 24B (Free tier)
- **Icons**: Lucide React

## 🌐 Deploy to Production

### Option 1: Cloudflare Pages (Recommended)
```bash
# Push your code
git push origin main

# Deploy via Cloudflare Pages dashboard
# See docs/deployment-cloudflare.md for detailed guide
```

### Option 2: Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Option 3: Other Platforms
Works on any platform supporting Next.js:
- Netlify
- Railway
- DigitalOcean App Platform

## 📁 Project Structure

```
ad-jargon/
├── app/
│   ├── api/translate/       # API endpoint for translation
│   ├── layout.tsx          # Root layout with metadata
│   └── page.tsx            # Main translator interface
├── lib/
│   └── translator.ts       # Fallback translation logic
├── types/
│   └── translator.ts       # TypeScript interfaces
├── docs/                   # Comprehensive documentation
└── README.md              # Project overview
```

## 🎨 Customisation Ideas

### Add Your Own Jargon
Edit `lib/translator.ts` to add custom buzzwords:

```typescript
const customJargon = {
  'your-word': 'synergistic replacement',
  'another-term': 'paradigm-shifting alternative'
};
```

### Modify the UI Theme
Update TailwindCSS classes in `app/page.tsx`:

```typescript
// Change the gradient
className="bg-gradient-to-br from-blue-900 via-green-900 to-blue-800"

// Modify button colours
className="bg-gradient-to-r from-green-600 to-blue-600"
```

### Add More AI Models
Modify `app/api/translate/route.ts` to use different models:

```typescript
// Try different models from OpenRouter
model: "anthropic/claude-3-haiku"
model: "google/gemini-pro"
model: "openai/gpt-3.5-turbo"
```

## 🧪 Development Commands

```bash
# Development server with hot reload
npm run dev

# Production build
npm run build

# Start production server
npm run start

# Code quality checks
npm run lint

# Type checking
npx tsc --noEmit
```

## 📚 Learn More

### Documentation
- [**Architecture Overview**](./architecture.md) - System design and components
- [**API Documentation**](./api.md) - Complete API reference
- [**Deployment Guide**](./deployment-cloudflare.md) - Production deployment
- [**Development Guide**](./development.md) - Contributing and best practices

### Key Technologies
- [Next.js Documentation](https://nextjs.org/docs) - React framework
- [TailwindCSS](https://tailwindcss.com/docs) - Utility-first CSS
- [OpenRouter](https://openrouter.ai/docs) - AI model access
- [Cloudflare Pages](https://developers.cloudflare.com/pages/) - Hosting platform

## 🎭 Understanding the Humour

This application satirises the ridiculous, impenetrable language of the advertising world. It's an insider joke that anyone who has ever been in a corporate meeting can appreciate.

### The Transformation Process
1. **Normal Input**: "Let's discuss the budget"
2. **AI Processing**: Applies corporate buzzword patterns
3. **Satirical Output**: "From a strategic standpoint, we need to deep-dive into investment allocation parameters to maximise stakeholder buy-in"

### Common Jargon Patterns
- **Buzzword Inflation**: Simple words become complex phrases
- **Action Verbing**: "Let's action on this" instead of "Let's do this"
- **Meaningless Precision**: "Optimise our value proposition" instead of "improve"
- **Meeting Speak**: "Circle back offline" instead of "talk later"

## 🤝 Getting Help

### Common Issues

**Q: Translation not working?**
A: Check your OpenRouter API key in `.env.local`. The fallback system should still work even without AI.

**Q: Build failing?**
A: Ensure you're using Node.js 18+ and all dependencies are installed.

**Q: Styles not loading?**
A: TailwindCSS v4 requires specific configuration. Check if `npm run dev` shows any CSS errors.

### Support Channels
- **Documentation**: Check [docs/](./README.md) folder
- **Issues**: [GitHub Issues](https://github.com/hashmil/ad-jargon/issues)
- **Discussions**: GitHub Discussions tab

## ⚠️ Important Notes

### API Limits
- **OpenRouter Free Tier**: Rate limited but generous
- **Fallback Always Works**: Local translation when AI unavailable
- **No Data Storage**: Your input text is never stored

### British English
This application uses British English throughout:
- optimise (not optimize)
- colour (not color)
- realise (not realize)

---

**Ready to start synergising your ideation paradigms?** 🚀

The Ad Agency Jargon Translator is designed to bring joy and laughter to the corporate world. Warning: Prolonged exposure may cause involuntary eye-rolling and the urge to "circle back offline." 😄