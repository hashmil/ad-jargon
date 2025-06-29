# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an Ad Agency Jargon Translator - a satirical web application that transforms normal business language into over-the-top advertising agency buzzwords. The project is built with Next.js 15.3.4, React 19, and TypeScript.

## Development Commands

- `npm run dev` - Start development server with Turbopack (runs on http://localhost:3000)
- `npm run build` - Build production application
- `npm run start` - Start production server
- `npm run lint` - Run ESLint for code quality checks

## Architecture

### Core Structure
- **App Router**: Uses Next.js 13+ app directory structure
- **TypeScript**: Strict TypeScript configuration with path aliases (`@/*` maps to root)
- **Styling**: TailwindCSS v4 with custom CSS variables for theming
- **Fonts**: Geist Sans and Geist Mono fonts via next/font optimisation

### Key Directories
- `app/` - Next.js app router pages and layouts
- `lib/` - Utility functions and shared logic
- `types/` - TypeScript type definitions
- `app/api/` - API routes for server-side functionality

### Translation System
The application uses a hybrid approach:
1. **AI-First**: OpenRouter API with Mistral model for authentic jargon generation
2. **Fallback**: Rule-based translation using predefined jargon mappings
3. **API Integration**: Server-side API routes handle translation requests

### Environment Configuration
- `OPENROUTER_API_KEY` - Required for AI translation functionality
- Uses `.env.local` for local development secrets

### Styling Architecture
- TailwindCSS with custom theme configuration
- CSS variables for consistent colour theming
- Dark mode support via `prefers-color-scheme`
- Responsive design with mobile-first approach

## Key Technical Decisions

- **Turbopack**: Enabled for faster development builds
- **Server-Side Translation**: API routes handle external API calls to avoid CORS issues
- **Graceful Degradation**: Fallback translation ensures functionality without AI
- **TypeScript Strict Mode**: Ensures type safety across the application