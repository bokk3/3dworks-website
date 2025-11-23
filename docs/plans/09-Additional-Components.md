Create Plan 9 - "Advanced Animations & Interactions"
Plan Name: "Premium Interactions & Motion"
Plan Description:
Enhance the site with advanced animations and interactions that make
it feel alive, premium, and engaging. All with modern tech aesthetic.

Tasks:
Task 1: Parallax Effects

Add parallax scrolling:
- Hero background elements move slower than foreground
- Floating geometric shapes with different speeds
- Use Framer Motion's useScroll and useTransform hooks
- Create components/effects/ParallaxSection.tsx wrapper
- Subtle, not distracting (transform-gpu for performance)

Task 2: Magnetic Hover Effects

Add magnetic buttons/cards:
- CTA buttons that slightly follow cursor on hover
- Portfolio cards with subtle tilt effect on mouse move
- Service cards with magnetic effect
- Use Framer Motion's useMotionValue and useSpring
- Subtle movement (5-10px max, not gimmicky)
- Cyan glow intensifies on interaction

Task 3: Scroll Progress Indicator

Create components/ui/ScrollProgress.tsx:
- Thin gradient line at top showing scroll progress
  * Light: gradient from cyan-500 to purple-500
  * Dark: gradient from cyan-400 to purple-400
- Smooth animation with Framer Motion
- Fixed position (fixed top-0 z-50)
- Use Framer Motion useScroll
- Height: 2-3px
- Blends with theme

Task 4: Page Transitions

Add smooth transitions:
- Fade in content on initial page load
- Staggered section reveals as you scroll
- Loading skeleton for images with glassmorphism
- Create components/transitions/PageTransition.tsx
- Respect prefers-reduced-motion

Task 5: Glassmorphism Hover States
Enhance all interactive elements:
- Buttons glow on hover (shadow-cyan-500/50)
- Cards lift with subtle glow
- Links have cyan underline animation
- Form inputs glow when focused
- Smooth transitions on all states
