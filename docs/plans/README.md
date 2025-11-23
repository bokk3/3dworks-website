# 3Dworks Website Plan - Refactored for 3D Printing Business

## Overview
This repository contains a comprehensive 18-step plan for building a modern, cutting-edge website for **3Dworks** - a precision 3D printing business. The plan has been fully refactored from a metalworking/woodworking business template to focus specifically on 3D printing services.

## Business Focus
**3Dworks** - Precision 3D printing services including:
- Rapid Prototyping
- Custom Manufacturing
- Product Design
- Material Consultation
- Small Batch Production

## Design System

### Color Palette (Light Mode First with Dark Mode Support)

**Light Mode (Default)**
- **Background**: `#ffffff`, `#f8fafc` (white to light gray)
- **Surface**: `#ffffff` with subtle shadows
- **Text**: `#0f172a`, `#334155` (dark slate)
- **Borders**: `#e2e8f0`, `#cbd5e1` (light slate)

**Dark Mode (System Preference)**
- **Background**: `#050505`, `#0a0a0f` (deep dark with subtle blue tint)
- **Surface**: Glassmorphism (`bg-white/5`)
- **Text**: `#ffffff`, `#e2e8f0` (white to light gray)
- **Borders**: `rgba(255,255,255,0.1)` (white/10)

**Brand Colors (Both Themes)**
- **Primary**: Electric blue/cyan (`#0ea5e9`, `#06b6d4`)
- **Secondary**: Vibrant purple (`#a855f7`, `#c026d3`)
- **Accent**: Cyan (`#22d3ee`)
- **Success**: Emerald (`#10b981`)

### Typography
- **Primary Font**: Inter (clean, modern body text)
- **Display Font**: Space Grotesk or Outfit (geometric, tech-forward headers)
- **Monospace**: JetBrains Mono (for technical specs and code)

### Design Principles
- **Theme Switching**:
  - Light mode by default
  - Automatic dark mode based on system preference (`prefers-color-scheme`)
  - Optional manual toggle (user preference saved to localStorage)
  - Smooth transitions between themes
- **Glassmorphism** (theme-aware):
  - Light: `backdrop-blur-md bg-black/5 border border-black/10 shadow-sm`
  - Dark: `dark:backdrop-blur-md dark:bg-white/5 dark:border-white/10`
- **Sharp Corners**: Minimal border-radius (rounded-sm, rounded-md preferred)
- **Transparency**: Extensive use of opacity overlays (theme-specific)
- **Hover Effects**: Glow and state changes (adapts to theme)
- **Tech-Inspired**: Grid patterns, geometric shapes, modern aesthetic

## Tech Stack (2026 Ready)
- **Framework**: Next.js 16 (App Router)
- **React**: Version 19
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS + shadcn/ui
- **Animations**: Framer Motion
- **Database**: SQLite
- **Deployment**: Docker ready, Vercel recommended

## Plan Structure

### Core Foundation (Plans 1-3)
1. **Project Setup** - Tailwind config, fonts, colors, global styles
2. **Core UI Components** - Navbar with glassmorphism, Footer
3. **Hero Section** - Full-screen with gradient text, animated elements

### Main Sections (Plans 4-8)
4. **Portfolio Gallery** - Filterable 3D printed projects (prototypes, custom parts, art)
5. **Services Section** - Interactive cards for 3D printing services
6. **Process Timeline** - Visual workflow from consultation to delivery
7. **Contact Form** - With STL/OBJ file upload capability
8. **About Section** - Innovation story, stats, technology showcase

### Enhancement & Polish (Plans 9-16)
9. **Advanced Animations** - Parallax, magnetic hover, scroll progress
10. **Content & Images** - Optimized imagery of 3D prints and processes
11. **Video & Rich Media** - Hero video, 3D model viewer (optional)
12. **Interactive Features** - Advanced filters, quote calculator
13. **Smart Navigation & UX** - Smooth scroll, keyboard nav, loading states
14. **Performance Optimization** - 95+ Lighthouse score target
15. **SEO & Analytics** - Structured data, GA4 tracking
16. **Final Polish & Testing** - Cross-browser, accessibility, mobile

### Production (Plans 17-18)
17. **Deployment & DevOps** - Docker, Vercel, monitoring
18. **Advanced Features (V1.5)** - Blog, 3D viewer, customer portal (optional)

## Key Features

### 3D Printing Specific
- File upload for STL/OBJ/STEP files
- Material type filtering (PLA, ABS, PETG, Resin, Nylon)
- Print specifications (dimensions, layer height, print time)
- Interactive quote calculator (optional)
- 3D model viewer in browser (optional)
- Technology/equipment showcase
- Material comparison tool (V1.5)

### Modern UX
- Glassmorphism design throughout
- Smooth animations (60fps target)
- Scroll-triggered reveals
- Loading skeletons with blur effects
- Keyboard navigation complete
- Mobile-optimized with touch gestures

### Performance Targets
- Lighthouse: 95+ all metrics
- Core Web Vitals optimized
- WebP images with blur placeholders
- Code splitting and lazy loading
- < 200KB initial JS bundle

## File Organization
```
/home/bokkie/Plans/3Dprint-plan/
├── PROJECT_CONTEXT.md          # Main project overview
├── .ai-rules                   # Development rules for AI
├── 01-Project-Setup.md
├── 02-Core-UI-Components.md
├── 03-Hero-Section.md
├── 04-Portfolio-Gallery.md
├── 05-Services-Section.md
├── 06-Process-Timeline.md
├── 07-Contact-Form.md
├── 08-About-Section.md
├── 09-Additional-Components.md
├── 10-Content-and-Images.md
├── 11-Video-and-Rich-Media.md
├── 12-Interactive-Features.md
├── 13-Smart-Navigation-and-UX.md
├── 14-Performance-Optimization.md
├── 15-SEO-and-Analytics.md
├── 16-Final-Polish-and-Testing.md
├── 17-Deployment-and-DevOps.md
└── 18-Advanced-Features.md
```

## Usage
Each plan file contains detailed tasks for implementing that specific aspect of the website. Follow the plans sequentially for best results, as later plans build upon earlier ones.

## Refactoring Summary
- **From**: Metalworking/woodworking business (bronze/steel colors, industrial aesthetic, dark theme only)
- **To**: 3D printing business "3Dworks" (cyan/purple colors, tech-forward aesthetic, light mode first with dark mode support)
- **Changed**: All 20 files (PROJECT_CONTEXT, .ai-rules, 18 plan files)
- **Design**: Industrial dark → Modern light-first with system dark mode
- **Services**: Metalwork → 3D printing (prototyping, custom parts, design)
- **Content**: Craftsmanship focus → Precision & innovation focus
- **Theme**: Dark-only → Light mode first with automatic dark mode (system preference)

## Next Steps
1. Review each plan file to ensure alignment with your business needs
2. Begin implementation starting with Plan 1
3. Follow the technical specifications in .ai-rules for consistency
4. Refer to PROJECT_CONTEXT.md for design system decisions

---

**Last Updated**: November 23, 2025
**Prepared For**: 3Dworks - Precision 3D Printing Services
