# Ad Agency Jargon Translator

A satirical web application that transforms normal business language into hilariously over-the-top advertising agency buzzwords. Perfect for impressing clients and confusing colleagues!

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

## 🏃‍♂️ Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/hashmil/ad-jargon.git
   cd ad-jargon
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   # Add your OpenRouter API key
   OPENROUTER_API_KEY=your_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Visit [http://localhost:3000](http://localhost:3000) to see the magic happen!

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

### Cloudflare Pages (Recommended)
1. Connect your GitHub repository to Cloudflare Pages
2. Use these build settings:
   - **Framework**: Next.js
   - **Build command**: `npm run build`
   - **Build output**: `.next`
3. Add environment variable: `OPENROUTER_API_KEY`

### Other Platforms
The app works on any platform supporting Next.js:
- Vercel
- Netlify  
- Railway
- Digital Ocean

## 🔑 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `OPENROUTER_API_KEY` | Your OpenRouter API key for AI translation | Yes |

## 🎯 API Usage

The translator uses OpenRouter's free tier:
- **Model**: `mistralai/mistral-small-3.2-24b-instruct:free`
- **Cost**: Free (rate limited)
- **Fallback**: Always available rule-based system

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## ⚠️ Disclaimer

This project is purely satirical and intended for entertainment. Any resemblance to actual corporate meetings is purely coincidental (and slightly concerning).

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

*Warning: Prolonged exposure to agency jargon may cause involuntary eye-rolling and the urge to "circle back offline."*