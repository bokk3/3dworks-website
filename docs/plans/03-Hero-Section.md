Step 6: Create Plan 3 - "Hero Section"
Plan Name: "Hero Section - Main Landing"
Plan Description:
Create an impactful, full-screen hero section that immediately captures
attention with bold typography, dynamic animations, and modern tech aesthetic.

Tasks:
Task 1: Hero Component Structure [x]
Create components/sections/Hero.tsx:

- [x] Full viewport height (min-h-screen)
- [x] Theme-adaptive background:
  - Light: bg-gradient-to-br from-slate-50 via-white to-cyan-50
  - Dark: dark:bg-[#050505] with dark:bg-gradient-to-br dark:from-[#050505] dark:to-[#0a0a0f]
- [x] Centered content with max-width container
- [x] Flex layout for vertical/horizontal centering
- [x] Tech-inspired grid pattern background (subtle, theme-aware using CSS or SVG)

Task 2: Hero Content & Typography [x]
Add hero content:

- [x] Main headline: "Precision 3D Printing for Your Vision"
  - Size: text-6xl md:text-7xl
  - Font: font-display
  - Gradient text cyan to purple (works in both themes)
  - Light: from-cyan-600 to-purple-600
  - Dark: dark:from-cyan-400 dark:to-purple-400
- [x] Subheadline: "From rapid prototyping to custom manufacturing - we bring your ideas to life with cutting-edge 3D printing technology"
  - Size: text-xl
  - Light: text-slate-600
  - Dark: dark:text-zinc-400
- [x] Two CTA buttons:
  - Primary: "Explore Portfolio" (bg-cyan-500 hover:bg-cyan-600 text-white shadow-lg)
  - Secondary: "Upload Design"
    - Light: border border-slate-300 hover:bg-slate-100 text-slate-700
    - Dark: dark:border dark:border-cyan-500/50 dark:hover:bg-cyan-500/10 dark:text-white dark:backdrop-blur
- [x] Use proper spacing and typography hierarchy
- [x] Sharp corners (rounded-md maximum)

Task 3: Hero Background Effect [x]
Add visual interest (theme-aware):

- [x] Animated grid pattern overlay (subtle, adapts to theme)
- [x] Floating 3D geometric shapes with subtle parallax
- [x] Gradient orbs with blur effects:
  - Light: soft cyan and purple with opacity
  - Dark: brighter cyan and purple with glow
- [x] Keep it subtle, not distracting
- [x] Use transform-gpu for performance

Task 4: Hero Animations [x]
Add Framer Motion animations:

- [x] Fade in + slide up main headline (delay 0.2s)
- [x] Fade in subheadline (delay 0.4s)
- [x] Fade in buttons with scale effect (delay 0.6s)
- [x] Parallax effect on scroll for background elements
- [x] All with smooth easing (ease-out)
- [x] Respect prefers-reduced-motion

Task 5: Update Homepage [x]
Update app/page.tsx:

- [x] Import Hero component
- [x] Add Hero as first section
- [x] Basic page structure with <main> tag
- [x] Proper metadata for SEO
