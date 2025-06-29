# Contributing Guide

Thank you for your interest in contributing to the Ad Agency Jargon Translator! This guide will help you get started with contributing to this satirical masterpiece.

## 🎭 Project Philosophy

This project exists to bring humour to the corporate world by satirising the ridiculous language of advertising agencies. When contributing, please keep in mind:

- **Humour First**: The primary goal is entertainment and gentle mockery
- **Quality Code**: Maintain professional standards even for satirical content
- **British English**: Consistent spelling throughout (optimise, colour, realise)
- **Accessibility**: Everyone should be able to enjoy corporate satire

## 🚀 Quick Contribution Start

```bash
# 1. Fork the repository on GitHub
# 2. Clone your fork
git clone https://github.com/YOUR-USERNAME/ad-jargon.git
cd ad-jargon

# 3. Install dependencies
npm install

# 4. Create a feature branch
git checkout -b feature/amazing-jargon-addition

# 5. Make your changes
# 6. Test thoroughly
npm run dev
npm run build
npm run lint

# 7. Commit and push
git add .
git commit -m "feat: add revolutionary synergistic enhancements"
git push origin feature/amazing-jargon-addition

# 8. Create a Pull Request on GitHub
```

## 📋 Types of Contributions

### 🐛 Bug Reports
Help us identify issues with the translation engine or user experience:

**Good Bug Report includes:**
- Clear description of the problem
- Steps to reproduce
- Expected vs actual behaviour
- Environment details (OS, browser, Node.js version)
- Screenshots if applicable

**Bug Report Template:**
```markdown
## Bug Description
Brief description of the issue

## Steps to Reproduce
1. Go to...
2. Type...
3. Click...
4. See error

## Expected Behaviour
What should happen

## Actual Behaviour
What actually happens

## Environment
- OS: [e.g., macOS 13.0, Windows 11]
- Browser: [e.g., Chrome 115, Firefox 117]
- Node.js: [e.g., 18.17.0]
```

### 💡 Feature Requests
Suggest new ways to enhance the satirical experience:

**Good Feature Request includes:**
- Clear use case description
- Explanation of why it would be valuable
- Possible implementation approach
- Consideration of complexity

**Feature Categories:**
- **New Jargon**: Additional buzzwords and mappings
- **UI Improvements**: Better user experience
- **API Enhancements**: More translation options
- **Performance**: Faster, more efficient operation
- **Accessibility**: Better support for all users

### 🔧 Code Contributions

#### New Jargon Mappings
The easiest way to contribute! Add corporate buzzwords to the fallback system:

```typescript
// lib/translator.ts
export const jargonMap: JargonMap = {
  // Add your contributions here
  'schedule': 'temporal roadmap alignment',
  'email': 'digital touchpoint communication',
  'coffee': 'caffeinated ideation fuel',
  // ... existing mappings
};
```

**Jargon Guidelines:**
- Should be hilariously over-the-top
- Use British English spelling
- Maintain satirical tone
- Avoid offensive content

#### UI Enhancements
Improve the user interface and experience:

**Areas for improvement:**
- Mobile responsiveness
- Loading state animations
- Error message clarity
- Accessibility features
- Dark mode support

#### API Improvements
Enhance the translation system:

**Possible enhancements:**
- Support for different AI models
- Caching layer for common phrases
- Rate limiting improvements
- Better error handling

#### Performance Optimisations
Make the application faster and more efficient:

**Optimisation areas:**
- Bundle size reduction
- API response times
- Image optimisation
- Caching strategies

### 📚 Documentation
Help improve project documentation:

**Documentation needs:**
- Tutorial improvements
- API examples
- Troubleshooting guides
- Translation accuracy
- Code comments

## 🛠️ Development Setup

### Prerequisites
- **Node.js 18+**: [Download here](https://nodejs.org/)
- **Git**: [Download here](https://git-scm.com/)
- **OpenRouter API Key**: [Get free key](https://openrouter.ai/)

### Local Development
```bash
# Clone your fork
git clone https://github.com/YOUR-USERNAME/ad-jargon.git
cd ad-jargon

# Install dependencies
npm install

# Set up environment
echo "OPENROUTER_API_KEY=your_key_here" > .env.local

# Start development server
npm run dev

# Open http://localhost:3000
```

### Development Workflow
1. **Create branch**: `git checkout -b feature/your-feature`
2. **Make changes**: Edit files and test thoroughly
3. **Quality checks**: Run linting and build tests
4. **Commit**: Use descriptive commit messages
5. **Push**: `git push origin feature/your-feature`
6. **Pull Request**: Create PR with clear description

## 📏 Code Standards

### TypeScript Guidelines
```typescript
// Use explicit interfaces
interface TranslationOptions {
  text: string;
  method: 'ai' | 'fallback';
}

// Prefer type-safe approaches
const handleTranslation = async (options: TranslationOptions): Promise<TranslationResponse> => {
  // Implementation
};

// Use proper error handling
try {
  const result = await translateText(input);
  return result;
} catch (error) {
  console.error('Translation failed:', error);
  throw new Error('Translation service unavailable');
}
```

### React Best Practices
```typescript
// Functional components with hooks
export function TranslationForm({ onSubmit }: TranslationFormProps) {
  const [text, setText] = useState('');
  
  const handleSubmit = useCallback(() => {
    onSubmit(text);
  }, [text, onSubmit]);
  
  return (
    <form onSubmit={handleSubmit}>
      {/* Component JSX */}
    </form>
  );
}

// Props with clear interfaces
interface TranslationFormProps {
  onSubmit: (text: string) => void;
}
```

### Styling Conventions
```typescript
// Use TailwindCSS utilities
<div className="max-w-4xl mx-auto px-4 py-8">
  <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
    {/* Content */}
  </div>
</div>

// Responsive design patterns
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  {/* Responsive grid */}
</div>

// Consistent spacing
<div className="mb-4">        {/* Small spacing */}
<div className="mb-6">        {/* Medium spacing */}
<div className="mb-8">        {/* Large spacing */}
```

### API Route Guidelines
```typescript
// Always use Edge Runtime
export const runtime = 'edge';

// Validate input thoroughly
export async function POST(request: NextRequest) {
  const { text } = await request.json();
  
  if (!text || typeof text !== 'string' || text.trim().length === 0) {
    return NextResponse.json({
      success: false,
      error: 'Text is required'
    }, { status: 400 });
  }
  
  // Implementation
}
```

## 🧪 Testing Guidelines

### Manual Testing Checklist
Before submitting a PR, verify:

- [ ] **Functionality**: Translation works with both AI and fallback
- [ ] **UI**: All interactive elements work correctly
- [ ] **Responsive**: Layout works on mobile, tablet, desktop
- [ ] **Performance**: No significant slowdowns introduced
- [ ] **British English**: Consistent spelling throughout
- [ ] **Error Handling**: Graceful failure states
- [ ] **Accessibility**: Keyboard navigation and screen readers

### Testing Commands
```bash
# Development testing
npm run dev           # Start dev server
npm run build         # Test production build
npm run lint          # Code quality checks

# Manual testing scenarios
# 1. Test with valid OpenRouter API key
# 2. Test with invalid/missing API key (should use fallback)
# 3. Test various input lengths and formats
# 4. Test mobile responsiveness
# 5. Test example phrases functionality
```

## 📝 Commit Message Guidelines

Use conventional commit format for clear history:

```bash
# Feature additions
git commit -m "feat: add synergistic jargon mappings for productivity terms"

# Bug fixes
git commit -m "fix: resolve mobile layout overflow issue"

# Documentation
git commit -m "docs: update API documentation with new endpoints"

# Performance improvements
git commit -m "perf: optimise bundle size by removing unused dependencies"

# Refactoring
git commit -m "refactor: extract translation logic into separate utility"

# Style/formatting
git commit -m "style: fix TypeScript linting errors"

# Tests
git commit -m "test: add unit tests for fallback translation system"
```

## 🔍 Pull Request Process

### Before Submitting
1. **Test thoroughly**: Manual testing on multiple devices
2. **Code quality**: Run `npm run lint` and fix issues
3. **Build check**: Ensure `npm run build` succeeds
4. **Documentation**: Update relevant docs if needed
5. **Commits**: Clean, descriptive commit history

### PR Description Template
```markdown
## Description
Brief description of changes and motivation

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Performance improvement
- [ ] Refactoring

## Testing
- [ ] Manual testing completed
- [ ] Build succeeds
- [ ] Linting passes
- [ ] Mobile responsive
- [ ] Accessibility checked

## Screenshots (if applicable)
Add screenshots for UI changes

## Additional Notes
Any other relevant information
```

### Review Process
1. **Automated checks**: CI/CD pipeline runs tests
2. **Code review**: Maintainers review code quality
3. **Testing**: Functionality verification
4. **Documentation**: Ensure docs are updated
5. **Merge**: Approved PRs are merged to main

## 🎯 Contribution Ideas

### Beginner-Friendly
- **Add jargon mappings**: Expand the corporate dictionary
- **Fix typos**: Improve documentation clarity
- **Add examples**: More realistic business scenarios
- **UI polish**: Small visual improvements

### Intermediate
- **Mobile optimisation**: Improve responsive design
- **Performance**: Bundle size or API speed improvements
- **Error handling**: Better user feedback
- **Accessibility**: Screen reader support

### Advanced
- **New AI models**: Integration with additional models
- **Caching system**: Improve response times
- **Analytics**: Usage tracking and insights
- **Internationalisation**: Multi-language support

## 🤝 Community Guidelines

### Be Respectful
- **Constructive feedback**: Focus on code, not person
- **Professional tone**: Maintain courtesy in all interactions
- **Inclusive language**: Welcome contributors of all backgrounds
- **Patience**: Remember everyone is learning

### Satirical Context
- **Punch up, not down**: Mock corporate culture, not individuals
- **Clever, not mean**: Aim for wit rather than cruelty
- **Professional standards**: High code quality for satirical content
- **Appropriate humour**: Keep it workplace-friendly

### Communication
- **Clear descriptions**: Explain changes and reasoning
- **Ask questions**: Don't hesitate to seek clarification
- **Share knowledge**: Help other contributors learn
- **Be responsive**: Reply to feedback promptly

## 🏆 Recognition

Contributors are recognised in several ways:

- **GitHub contributors**: Listed automatically on repository
- **Documentation**: Major contributors mentioned in docs
- **Release notes**: Significant features highlighted
- **Community**: Appreciated by users enjoying the satire!

## 📞 Getting Help

### Resources
- **Documentation**: Check [docs/](./README.md) first
- **Issues**: Search existing GitHub issues
- **Discussions**: Use GitHub Discussions for questions
- **Code review**: Learn from existing PRs

### Contact
- **Bug reports**: [GitHub Issues](https://github.com/hashmil/ad-jargon/issues)
- **Feature requests**: [GitHub Issues](https://github.com/hashmil/ad-jargon/issues)
- **Questions**: [GitHub Discussions](https://github.com/hashmil/ad-jargon/discussions)

---

Thank you for helping make corporate communication more synergistically paradigm-shifting! Together, we can leverage our collective ideation to optimise the satirical value proposition of this mission-critical jargon-translation ecosystem. 🎭✨

*Remember: The best contributions are the ones that make people laugh while maintaining professional code quality!*