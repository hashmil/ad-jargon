# Ad Agency Jargon Translator

A satirical web application that transforms normal business language into hilariously over-the-top advertising agency buzzwords. Perfect for impressing clients and confusing colleagues!

**🎭 [Try it live!](https://ad-jargon.pages.dev)** | **📚 [Documentation](./docs/README.md)** | **🐛 [Report Issues](https://github.com/hashmil/ad-jargon/issues)**

## ✨ Features

- **AI-Powered Translation**: Uses Mistral AI via OpenRouter for authentic jargon generation
- **Intelligent Fallback**: Rule-based translation system ensures functionality without AI
- **British English**: Proper spelling throughout (optimise, realise, colour, centre)
- **Responsive Design**: Beautiful gradient UI with smooth animations
- **Example Phrases**: Pre-loaded examples to get you started
- **Real-time Translation**: Instant buzzword transformation

## 🚀 Demo

Transform phrases like:
- "Let's think of some new ideas" → "Moving forward, we should leverage disruptive ideation to optimise our value proposition"
- "We need to discuss the budget" → "At the end of the day, we need to deep-dive into investment allocation for scalable growth potential"

## 🛠️ Tech Stack

- **Framework**: Next.js 15.3.4 with App Router
- **Language**: TypeScript with strict type checking
- **Styling**: TailwindCSS v4 with custom gradients
- **AI Integration**: OpenRouter API with Mistral Small 3.2 24B
- **Icons**: Lucide React
- **Deployment**: Optimised for Cloudflare Pages

## 🚀 Quick Start

```bash
# Get started in 30 seconds
git clone https://github.com/hashmil/ad-jargon.git
cd ad-jargon
npm install
echo "OPENROUTER_API_KEY=your_key_here" > .env.local
npm run dev
```

**📖 [Full Setup Guide](./docs/quick-start.md)** | **⚡ [5-Minute Tutorial](./docs/quick-start.md#5-minute-local-setup)**

## 📝 Development Commands

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build production application
- `npm run start` - Start production server
- `npm run lint` - Run ESLint for code quality

## 🏗️ Architecture

### Translation System
The app uses a hybrid approach for maximum reliability:

1. **AI-First**: OpenRouter API with Mistral model for creative, authentic jargon
2. **Graceful Fallback**: Rule-based translation using predefined mappings
3. **Server-Side Processing**: API routes handle external calls to avoid CORS

### Key Components
- `app/page.tsx` - Main translator interface
- `app/api/translate/route.ts` - Translation API endpoint
- `lib/translator.ts` - Fallback logic and jargon mappings
- `types/translator.ts` - TypeScript interfaces

## 🌍 Deployment

**🔥 [Cloudflare Pages Guide](./docs/deployment-cloudflare.md)** (Recommended - Free tier includes 500 builds/month, unlimited bandwidth)

**Alternative platforms**: [Vercel](./docs/deployment-vercel.md) | [Self-hosting](./docs/deployment-selfhost.md) | [CI/CD Setup](./docs/cicd.md)

## 🔑 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `OPENROUTER_API_KEY` | Your OpenRouter API key for AI translation | Yes |

## 🎯 API Usage

The translator uses OpenRouter's free tier:
- **Model**: `mistralai/mistral-small-3.2-24b-instruct:free`
- **Cost**: Free (rate limited)
- **Fallback**: Always available rule-based system

## 📚 Documentation

| Guide | Description |
|-------|-------------|
| **[Quick Start](./docs/quick-start.md)** | Get running in 5 minutes |
| **[Architecture](./docs/architecture.md)** | System design and components |
| **[API Reference](./docs/api.md)** | Complete API documentation |
| **[Development](./docs/development.md)** | Coding standards and setup |
| **[Deployment](./docs/deployment-cloudflare.md)** | Production deployment guide |
| **[Troubleshooting](./docs/troubleshooting.md)** | Common issues and solutions |
| **[FAQ](./docs/faq.md)** | Frequently asked questions |

## 🤝 Contributing

**[📖 Contributing Guide](./docs/contributing.md)** | **[🐛 Report Bug](https://github.com/hashmil/ad-jargon/issues)** | **[💡 Request Feature](https://github.com/hashmil/ad-jargon/issues)**

## ⚠️ Disclaimer

This project is purely satirical and intended for entertainment. Any resemblance to actual corporate meetings is purely coincidental (and slightly concerning).

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

*Warning: Prolonged exposure to agency jargon may cause involuntary eye-rolling and the urge to "circle back offline."*