# Architecture Overview

The Ad Agency Jargon Translator is built using a modern, serverless architecture optimised for performance, scalability, and developer experience.

## 🏗️ High-Level Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   User Browser  │───▶│  Cloudflare CDN  │───▶│  Static Assets  │
└─────────────────┘    └──────────────────┘    └─────────────────┘
         │                       │
         │                       ▼
         │              ┌──────────────────┐
         │              │ Cloudflare Pages │
         │              │   Edge Runtime   │
         │              └──────────────────┘
         │                       │
         ▼                       ▼
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│  React Client   │◀───│   API Routes     │───▶│  OpenRouter AI  │
│   (Frontend)    │    │  (Edge Workers)  │    │   (External)    │
└─────────────────┘    └──────────────────┘    └─────────────────┘
                                │
                                ▼
                       ┌──────────────────┐
                       │ Fallback System  │
                       │ (Rule-based)     │
                       └──────────────────┘
```

## 🔧 Core Technologies

### Frontend Stack
- **Next.js 15.3.4**: React framework with App Router
- **React 19**: User interface library
- **TypeScript**: Type-safe development
- **TailwindCSS v4**: Utility-first styling
- **Lucide React**: Icon library

### Backend Stack
- **Next.js API Routes**: Serverless functions
- **Edge Runtime**: Cloudflare's V8 isolates
- **OpenRouter API**: AI model access
- **Mistral AI**: Language model for translation

### Infrastructure
- **Cloudflare Pages**: Static site hosting
- **Cloudflare Workers**: Edge computing
- **GitHub**: Version control and CI/CD
- **npm**: Package management

## 📁 Project Structure

```
ad-jargon/
├── app/                     # Next.js App Router
│   ├── api/                # API routes (Edge Workers)
│   │   └── translate/      # Translation endpoint
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout component
│   └── page.tsx            # Home page component
├── docs/                   # Documentation
├── lib/                    # Utility functions
│   └── translator.ts       # Fallback translation logic
├── types/                  # TypeScript definitions
│   └── translator.ts       # Translation interfaces
├── public/                 # Static assets
├── CLAUDE.md              # AI assistant guidance
├── README.md              # Project overview
└── package.json           # Dependencies and scripts
```

## 🚀 Data Flow

### 1. User Interaction
```typescript
User types text → Component state update → UI feedback
```

### 2. Translation Request
```typescript
User clicks translate → Frontend sends POST to /api/translate
```

### 3. API Processing
```typescript
API receives request → Validates input → Attempts AI translation
```

### 4. AI Translation
```typescript
Fetch to OpenRouter → Mistral AI processes → Returns jargon
```

### 5. Fallback System
```typescript
If AI fails → Rule-based translation → Generates jargon
```

### 6. Response Delivery
```typescript
API returns result → Frontend updates UI → User sees translation
```

## 🌐 Edge Computing Strategy

### Why Edge Runtime?
- **Global Performance**: Code runs close to users worldwide
- **Low Latency**: Sub-50ms response times globally
- **Auto-scaling**: Handles traffic spikes automatically
- **Cost Efficiency**: Pay per request, not server time

### Edge-Optimised Code
```typescript
// API Route with Edge Runtime
export const runtime = 'edge';

export async function POST(request: NextRequest) {
  // Lightweight fetch instead of heavy SDK
  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    // ... optimised for edge
  });
}
```

## 🔄 Translation System Architecture

### Hybrid Approach
The translation system uses a two-tier approach for maximum reliability:

#### Tier 1: AI Translation
- **Primary Method**: OpenRouter + Mistral AI
- **Advantages**: Creative, contextual, authentic
- **Challenges**: External dependency, rate limits

#### Tier 2: Rule-Based Fallback
- **Backup Method**: Local jargon mappings
- **Advantages**: Always available, predictable
- **Challenges**: Less creative, limited vocabulary

### Translation Pipeline
```typescript
interface TranslationPipeline {
  input: string;
  validate: () => boolean;
  aiTranslate: () => Promise<string>;
  fallbackTranslate: () => string;
  enhance: (text: string) => string;
  output: TranslationResponse;
}
```

## 🎨 Frontend Architecture

### Component Hierarchy
```
App (layout.tsx)
└── Home (page.tsx)
    ├── Header Section
    ├── Translator Form
    │   ├── Input Textarea
    │   ├── Generate Button
    │   └── Output Display
    ├── Example Phrases
    └── Footer
```

### State Management
- **Local State**: React useState for UI state
- **Server State**: API calls via fetch
- **No External Store**: Keeps bundle size minimal

### Styling Strategy
- **TailwindCSS**: Utility-first approach
- **Custom Gradients**: Purple/pink theme
- **Responsive Design**: Mobile-first breakpoints
- **Dark Mode Ready**: CSS variables for theming

## 🔒 Security Considerations

### API Security
- **Environment Variables**: Secure API key storage
- **Input Validation**: Sanitise user input
- **Rate Limiting**: Cloudflare built-in protection
- **CORS**: Properly configured for frontend

### Data Privacy
- **No Persistence**: No user data stored
- **Stateless**: Each request is independent
- **Edge Processing**: Data processed close to user

## 📊 Performance Optimisations

### Bundle Size
- **No Heavy Dependencies**: Removed OpenAI SDK (5MB+)
- **Tree Shaking**: Only used code included
- **Edge Runtime**: Optimised for quick cold starts

### Caching Strategy
- **Static Assets**: Cached at CDN edge
- **API Responses**: No caching (dynamic content)
- **Build Artefacts**: Optimised for reuse

### Loading Performance
- **Instant UI Feedback**: Optimistic updates
- **Streaming**: Progressive enhancement
- **Preloading**: Critical resources prioritised

## 🌍 Internationalisation

### British English Implementation
- **Consistent Spelling**: optimise, colour, realise
- **AI Instructions**: Explicit British English prompts
- **Fallback Mappings**: British spellings in rules
- **Locale Settings**: en_GB throughout

## 🔄 Error Handling Strategy

### Graceful Degradation
```typescript
try {
  // Attempt AI translation
  const aiResult = await aiTranslate();
  return aiResult;
} catch (error) {
  // Fallback to rule-based
  const fallbackResult = ruleBasedTranslate();
  return fallbackResult;
}
```

### User Experience
- **Loading States**: Clear progress indication
- **Error Messages**: User-friendly error text
- **Retry Logic**: Automatic fallback system
- **Offline Capability**: Rule-based works offline

## 📈 Scalability Considerations

### Current Limits
- **OpenRouter Free Tier**: Rate limited
- **Cloudflare Pages**: 100k requests/day free
- **Edge Workers**: 100k executions/day free

### Scaling Strategies
1. **Horizontal**: Multiple deployment regions
2. **Caching**: Implement response caching
3. **Rate Limiting**: Implement client-side throttling
4. **Load Balancing**: Multiple AI providers

## 🛠️ Development Workflow

### Local Development
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run lint         # Code quality checks
```

### Deployment Pipeline
```
Git Push → GitHub → Cloudflare Pages → Global Deployment
```

### Testing Strategy
- **Type Checking**: TypeScript compilation
- **Linting**: ESLint for code quality
- **Build Testing**: Production build verification

---

This architecture provides a solid foundation for a performant, scalable, and maintainable satirical web application that brings joy to the corporate world! 🎭