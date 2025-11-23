# 3Dworks - 3D Printing Business Landing Page

## Project Mission
Build a cutting-edge, visually stunning landing page that showcases precision 3D printing technology with a modern, futuristic design that makes visitors say "wow." Emphasize innovation, precision, and technological excellence.

## Tech Stack
- Next.js 16 (App Router)
- React 19
- TypeScript (strict mode)
- Tailwind CSS + shadcn/ui
- Framer Motion (animations)
- SQLite (portfolio/projects/testimonials)
- Docker deployment ready

## Design Philosophy
- **Light Mode First**: Clean, modern light UI with automatic dark mode based on system preference
- **Color Palette**:
  - **Light Mode**:
    - Background: #ffffff, #f8fafc (white to light gray)
    - Surface: #ffffff with subtle shadows
    - Text: #0f172a, #334155 (dark slate)
  - **Dark Mode**:
    - Background: #050505, #0a0a0f (deep dark with subtle blue tint)
    - Surface: glassmorphism cards (bg-white/5 in dark)
    - Text: #ffffff, #e2e8f0 (white to light gray)
  - **Brand Colors** (work in both modes):
    - Primary: Electric blue/cyan (#0ea5e9, #06b6d4)
    - Secondary: Vibrant purple (#a855f7, #c026d3)
    - Accent: Cyan (#22d3ee)
    - Success: Emerald (#10b981)
- **Typography**: 
  - Primary: Inter (clean, modern)
  - Headers: Space Grotesk or Outfit (geometric, tech-forward)
  - Code/Tech: JetBrains Mono (for specs)
- **Design Elements**:
  - Minimal border-radius (sharp, modern aesthetic)
  - Glassmorphism with backdrop-blur (theme-aware)
  - Light mode: bg-black/5, border-black/10, subtle shadows
  - Dark mode: bg-white/5, border-white/10, subtle glow
  - Subtle grid patterns and tech-inspired backgrounds
  - Hover effects and state changes (theme-aware)
- **Theme Switching**:
  - Automatic based on system preference (prefers-color-scheme)
  - Optional manual toggle (user preference saved to localStorage)
  - Smooth transitions between themes
- **Animations**: Purposeful micro-interactions, smooth transitions, 3D transforms
- **Imagery**: High-quality photos of 3D printed products, printing process, materials

## Key Sections
1. Hero - Full-screen with dynamic 3D visuals and animated elements
2. Portfolio Gallery - Filterable grid showcasing 3D printed projects
3. Services - Interactive cards (Prototyping, Custom Manufacturing, Design)
4. Technology/Materials - Showcase printers, materials, capabilities
5. Process Timeline - Visual workflow from design to delivery
6. Testimonials - Client success stories
7. Contact Form - File upload for STL/OBJ files
8. About - Innovation and precision story

## Performance Targets
- Lighthouse: 95+ all metrics
- Mobile-first responsive
- 60fps animations
- Optimized images (next/image)
- Fast 3D model previews
