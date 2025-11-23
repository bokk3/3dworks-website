Step 6: Create Plan 3 - "Hero Section"
Plan Name: "Hero Section - Main Landing"
Plan Description:
Create an impactful, full-screen hero section that immediately captures
attention with bold typography, dynamic animations, and modern tech aesthetic.

Tasks:
Task 1: Hero Component Structure
Create components/sections/Hero.tsx:
- Full viewport height (min-h-screen)
- Theme-adaptive background:
  * Light: bg-gradient-to-br from-slate-50 via-white to-cyan-50
  * Dark: dark:bg-[#050505] with dark:bg-gradient-to-br dark:from-[#050505] dark:to-[#0a0a0f]
- Centered content with max-width container
- Flex layout for vertical/horizontal centering
- Tech-inspired grid pattern background (subtle, theme-aware using CSS or SVG)

Task 2: Hero Content & Typography
Add hero content:
- Main headline: "Precision 3D Printing for Your Vision" 
  * Size: text-6xl md:text-7xl
  * Font: font-display
  * Gradient text cyan to purple (works in both themes)
  * Light: from-cyan-600 to-purple-600
  * Dark: dark:from-cyan-400 dark:to-purple-400
- Subheadline: "From rapid prototyping to custom manufacturing - we bring your ideas to life with cutting-edge 3D printing technology"
  * Size: text-xl
  * Light: text-slate-600
  * Dark: dark:text-zinc-400
- Two CTA buttons:
  * Primary: "Explore Portfolio" (bg-cyan-500 hover:bg-cyan-600 text-white shadow-lg)
  * Secondary: "Upload Design" 
    - Light: border border-slate-300 hover:bg-slate-100 text-slate-700
    - Dark: dark:border dark:border-cyan-500/50 dark:hover:bg-cyan-500/10 dark:text-white dark:backdrop-blur
- Use proper spacing and typography hierarchy
- Sharp corners (rounded-md maximum)

Task 3: Hero Background Effect
Add visual interest (theme-aware):
- Animated grid pattern overlay (subtle, adapts to theme)
- Floating 3D geometric shapes with subtle parallax
- Gradient orbs with blur effects:
  * Light: soft cyan and purple with opacity
  * Dark: brighter cyan and purple with glow
- Keep it subtle, not distracting
- Use transform-gpu for performance

Task 4: Hero Animations
Add Framer Motion animations:
- Fade in + slide up main headline (delay 0.2s)
- Fade in subheadline (delay 0.4s)
- Fade in buttons with scale effect (delay 0.6s)
- Parallax effect on scroll for background elements
- All with smooth easing (ease-out)
- Respect prefers-reduced-motion

Task 5: Update Homepage
Update app/page.tsx:
- Import Hero component
- Add Hero as first section
- Basic page structure with <main> tag
- Proper metadata for SEO