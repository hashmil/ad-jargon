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
│   (Frontend)    │    │ (Retry Logic)    │    │   (External)    │
└─────────────────┘    └──────────────────┘    └─────────────────┘
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

### 5. Error Handling
```typescript
If AI fails → Enhanced error messages → User feedback
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

### AI-First Approach
The translation system uses AI-powered translation with comprehensive error handling:

#### Primary Method: AI Translation
- **Technology**: OpenRouter + Mistral AI
- **Model**: mistralai/mistral-small-3.2-24b-instruct:free
- **Advantages**: Creative, contextual, authentic buzzword generation
- **Reliability**: Built-in retry logic (up to 2 attempts)

#### Error Handling Strategy
- **Network Errors**: Specific error messages for connectivity issues
- **Rate Limiting**: Clear feedback when API limits are reached
- **Browser Compatibility**: CORS headers for cross-browser support
- **Mobile Optimization**: Special handling for Chrome on iOS

### Translation Pipeline
```typescript
interface TranslationPipeline {
  input: string;
  validate: () => boolean;
  rateLimit: () => boolean;
  aiTranslate: () => Promise<string>;
  retryLogic: (attempts: number) => Promise<string>;
  errorHandling: (error: Error) => TranslationResponse;
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
- **Custom Gradients**: Ocean blue theme with coral accents
- **Responsive Design**: Mobile-first breakpoints with iOS compatibility
- **Mobile Optimization**: Proper padding for mobile headline display
- **Cross-Browser**: Consistent styling across Safari and Chrome

## 🔒 Security Considerations

### API Security
- **Environment Variables**: Secure API key storage
- **Input Validation**: Sanitise user input
- **Rate Limiting**: Client identification and request throttling
- **CORS Headers**: Explicit CORS configuration for browser compatibility
- **OPTIONS Handling**: Preflight request support for Chrome on iOS

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

### Comprehensive Error Handling
```typescript
try {
  // Check response status
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  const aiResult = await response.json();
  return aiResult;
} catch (error) {
  // Specific error messages based on error type
  if (error instanceof TypeError && error.message.includes('fetch')) {
    return "Network error. Please check your connection and try again.";
  }
  // Handle other error types...
}
```

### User Experience
- **Loading States**: Clear progress indication with branded messaging
- **Specific Error Messages**: Context-aware error feedback
- **Browser Compatibility**: Special handling for Chrome on iOS issues
- **Retry Logic**: Built-in retry mechanism with user feedback
- **Network Error Detection**: Distinguish between network and API errors

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