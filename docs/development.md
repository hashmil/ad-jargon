# Development Guide

A comprehensive guide for developers working on the Ad Agency Jargon Translator project.

## 🛠️ Development Environment Setup

### Prerequisites

- **Node.js 18+**: Latest LTS version recommended
- **npm 9+**: Comes with Node.js
- **Git**: For version control
- **VS Code**: Recommended editor with extensions

### Recommended VS Code Extensions

```json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "ms-vscode.vscode-typescript-next",
    "esbenp.prettier-vscode",
    "ms-vscode.vscode-eslint",
    "unifiedjs.vscode-mdx"
  ]
}
```

### Local Development Setup

```bash
# Clone the repository
git clone https://github.com/hashmil/ad-jargon.git
cd ad-jargon

# Install dependencies
npm install

# Create environment file
cp .env.local.example .env.local
# Add your OpenRouter API key

# Start development server
npm run dev
```

## 📁 Project Structure

```
ad-jargon/
├── app/                    # Next.js App Router
│   ├── api/               # API routes (Edge Runtime)
│   │   └── translate/     # Translation endpoint
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── docs/                  # Documentation
├── lib/                   # Utility functions
│   └── translator.ts      # Translation utilities
├── types/                 # TypeScript definitions
│   └── translator.ts      # Interface definitions
├── public/                # Static assets
├── .env.local.example     # Environment template
├── .gitignore            # Git ignore rules
├── CLAUDE.md             # AI assistant guidance
├── README.md             # Project overview
├── eslint.config.mjs     # ESLint configuration
├── next.config.ts        # Next.js configuration
├── package.json          # Dependencies and scripts
├── postcss.config.mjs    # PostCSS configuration
├── tailwind.config.js    # TailwindCSS configuration
└── tsconfig.json         # TypeScript configuration
```

## 🎯 Development Workflow

### Daily Development

1. **Start Development Server**
   ```bash
   npm run dev
   ```

2. **Make Changes**
   - Edit files with hot reload
   - Check browser for immediate feedback
   - Monitor console for errors

3. **Quality Checks**
   ```bash
   npm run lint        # ESLint checks
   npm run build       # Production build test
   ```

4. **Commit Changes**
   ```bash
   git add .
   git commit -m "feat: add new feature"
   git push origin main
   ```

### Feature Development Process

1. **Create Feature Branch**
   ```bash
   git checkout -b feature/new-jargon-categories
   ```

2. **Implement Feature**
   - Write code following established patterns
   - Add TypeScript types for new functionality
   - Update tests if applicable

3. **Test Thoroughly**
   - Manual testing in development
   - Check AI translation with retry logic
   - Verify responsive design

4. **Create Pull Request**
   - Push branch to GitHub
   - Create PR with clear description
   - Await review and merge

## 🧩 Code Architecture

### Component Structure

```typescript
// app/page.tsx - Main component structure
export default function Home() {
  // 1. State management
  const [state, setState] = useState<TranslationState>({...});
  
  // 2. Event handlers
  const handleTranslate = async (text: string) => {...};
  
  // 3. UI rendering
  return (
    <div className="...">
      {/* Component JSX */}
    </div>
  );
}
```

### API Route Structure

```typescript
// app/api/translate/route.ts
export const runtime = 'edge';

export async function POST(request: NextRequest) {
  // 1. Input validation
  // 2. AI translation with retry logic
  // 3. Error handling on failure
  // 4. Return structured response
}
```

### Type Definitions

```typescript
// types/translator.ts
export interface TranslationRequest {
  text: string;
}

export interface TranslationResponse {
  translatedText: string;
  success: boolean;
  error?: string;
  retryCount?: number;
}
```

## 🎨 Styling Guidelines

### TailwindCSS Conventions

```typescript
// Use descriptive class combinations
<div className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800">

// Responsive design patterns
<div className="grid grid-cols-1 md:grid-cols-2 gap-3">

// Consistent spacing scale
<div className="p-4 mb-6 mt-8">
```

### Component Styling Patterns

```typescript
// Container patterns
<div className="max-w-4xl mx-auto px-4 py-8">

// Card patterns
<div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">

// Button patterns
<button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-semibold rounded-xl shadow-lg transform hover:scale-105 disabled:hover:scale-100 transition-all duration-200 flex items-center gap-3">
```

## 🔧 Adding New Features

### Enhancing AI Translation

1. **Update AI Prompts**
   ```typescript
   // app/api/translate/route.ts
   const systemPrompt = `
     You are an expert at transforming business language into...
     // Enhance prompts for better results
   `;
   ```

2. **Adjust Retry Logic**
   ```typescript
   const MAX_RETRIES = 3;
   const RETRY_DELAY = 1000; // milliseconds
   
   // Implement exponential backoff
   ```

3. **Test AI Responses**
   ```bash
   # Test in development
   npm run dev
   # Try various phrases to test AI consistency
   ```

### Adding New AI Models

1. **Update API Route**
   ```typescript
   // app/api/translate/route.ts
   const models = [
     'mistralai/mistral-small-3.2-24b-instruct:free',
     'anthropic/claude-3-haiku',
     // Add new models
   ];
   
   // Implement model selection logic
   ```

2. **Add Model Configuration**
   ```typescript
   interface ModelConfig {
     name: string;
     maxTokens: number;
     temperature: number;
     prompt: string;
   }
   ```

### Adding New UI Components

1. **Create Component File**
   ```typescript
   // components/NewComponent.tsx
   interface NewComponentProps {
     // Define props
   }
   
   export function NewComponent({ ...props }: NewComponentProps) {
     return (
       <div className="...">
         {/* Component JSX */}
       </div>
     );
   }
   ```

2. **Add to Main Page**
   ```typescript
   // app/page.tsx
   import { NewComponent } from '@/components/NewComponent';
   
   export default function Home() {
     return (
       <div>
         {/* Existing components */}
         <NewComponent {...props} />
       </div>
     );
   }
   ```

## 🧪 Testing Strategy

### Manual Testing Checklist

- [ ] **Translation Functionality**
  - [ ] AI translation works with valid API key
  - [ ] Retry logic handles temporary failures
  - [ ] Error handling for invalid input
  - [ ] Loading states display correctly

- [ ] **User Interface**
  - [ ] Responsive design on mobile/tablet/desktop
  - [ ] All buttons and interactions work
  - [ ] Example phrases populate correctly
  - [ ] Copy/paste functionality works

- [ ] **Performance**
  - [ ] Page loads quickly
  - [ ] API responses are reasonably fast
  - [ ] No memory leaks or console errors

### Automated Testing Setup

```bash
# Add testing dependencies (future enhancement)
npm install --save-dev @testing-library/react @testing-library/jest-dom jest
```

```typescript
// __tests__/translator.test.ts (future)
import { translateWithRetry } from '@/lib/translator';

describe('AI Translation', () => {
  test('handles retry logic correctly', async () => {
    const result = await translateWithRetry('Let\'s think about it');
    expect(result.success).toBe(true);
    expect(result.retryCount).toBeDefined();
  });
});
```

## 🔍 Debugging Tips

### Common Development Issues

#### Environment Variables Not Loading
```bash
# Check if .env.local exists
ls -la .env.local

# Verify format (no spaces around =)
OPENROUTER_API_KEY=your-key-here

# Restart development server
npm run dev
```

#### TypeScript Errors
```bash
# Check TypeScript compilation
npx tsc --noEmit

# Common fixes
npm install @types/node @types/react @types/react-dom
```

#### TailwindCSS Styles Not Applied
```bash
# Verify Tailwind is running
npm run dev

# Check for CSS errors in terminal
# Ensure classes are not purged incorrectly
```

#### API Route Not Working
```typescript
// Verify Edge Runtime export
export const runtime = 'edge';

// Check API route file structure
app/api/translate/route.ts

// Test with curl
curl -X POST http://localhost:3000/api/translate \
  -H "Content-Type: application/json" \
  -d '{"text": "test"}'
```

### Development Tools

#### Browser DevTools
- **Console**: Check for JavaScript errors
- **Network**: Monitor API requests/responses
- **Performance**: Identify slow operations
- **Application**: Check service workers, storage

#### VS Code Debugging
```json
// .vscode/launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Next.js: debug server-side",
      "type": "node-terminal",
      "request": "launch",
      "command": "npm run dev"
    }
  ]
}
```

## 📝 Code Standards

### TypeScript Guidelines

```typescript
// Use explicit types for interfaces
interface ComponentProps {
  text: string;
  onSubmit: (value: string) => void;
}

// Use type assertions carefully
const data = response.json() as TranslationResponse;

// Prefer interfaces over types for object shapes
interface User {
  id: string;
  name: string;
}
```

### React Best Practices

```typescript
// Use functional components
export function MyComponent() {
  // Hooks at the top
  const [state, setState] = useState('');
  
  // Event handlers
  const handleClick = () => {...};
  
  // Early returns for conditions
  if (!data) return <Loading />;
  
  // JSX return
  return <div>...</div>;
}

// Props destructuring
export function Button({ onClick, children, disabled }: ButtonProps) {
  return (
    <button onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
```

### API Route Guidelines

```typescript
// Always validate input
if (!text || typeof text !== 'string') {
  return NextResponse.json({
    success: false,
    error: 'Text is required'
  }, { status: 400 });
}

// Use try-catch for error handling
try {
  const result = await dangerousOperation();
  return NextResponse.json({ success: true, data: result });
} catch (error) {
  console.error('Operation failed:', error);
  return NextResponse.json({
    success: false,
    error: 'Operation failed'
  }, { status: 500 });
}
```

## 🚀 Performance Optimisation

### Bundle Size Optimisation

```typescript
// Use dynamic imports for heavy components
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <Loading />
});

// Optimise imports
import { useState } from 'react'; // ✅ Named import
import React from 'react';        // ❌ Default import when not needed
```

### API Performance

```typescript
// Cache expensive operations
const cache = new Map();

export async function expensiveOperation(input: string) {
  if (cache.has(input)) {
    return cache.get(input);
  }
  
  const result = await heavyComputation(input);
  cache.set(input, result);
  return result;
}
```

### Image Optimisation

```typescript
// Use Next.js Image component
import Image from 'next/image';

<Image
  src="/logo.png"
  alt="Logo"
  width={200}
  height={100}
  priority // For above-the-fold images
/>
```

## 📚 Learning Resources

### Next.js
- [Next.js Documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)
- [Next.js Examples](https://github.com/vercel/next.js/tree/canary/examples)

### TypeScript
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)

### TailwindCSS
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [Tailwind UI Components](https://tailwindui.com/)

### API Development
- [Edge Runtime Documentation](https://edge-runtime.vercel.app/)
- [OpenRouter API Docs](https://openrouter.ai/docs)

---

Happy coding! Remember: the goal is to create satirical joy while maintaining professional code quality. May your commits be clean and your jargon be synergistic! 🎭✨