Create Plan 13 - "Smart Navigation & UX"
Plan Name: "Enhanced Navigation & User Experience"
Plan Description:
Improve navigation flow and user experience with smart interactions,
smooth scrolling, and modern UX patterns with glassmorphism design.

Tasks:
Task 1: Smooth Scroll Navigation

Enhance navbar functionality:
- Smooth scroll to sections with proper offset for fixed nav
- Active section highlighting in nav (cyan underline/indicator)
- Use Intersection Observer to detect current section
- Mobile menu closes automatically on link selection
- Scroll progress updates active nav item
- Smooth easing function (ease-in-out)

Task 2: Back to Top Button

Create components/ui/BackToTop.tsx:
- Appears after scrolling down 500px
- Fixed bottom-right position (with spacing for quote calculator if present)
- Glassmorphism circular button (theme-aware):
  * Light: bg-white border border-slate-200 shadow-lg text-slate-700
  * Dark: dark:bg-white/5 dark:backdrop-blur-md dark:border-white/10 dark:text-white
- Cyan border with glow on hover (both themes)
- Up arrow icon (lucide-react)
- Smooth scroll to top animation
- Fade in/out based on scroll position
- Sharp corners (rounded-md)

Task 3: Loading States & Skeletons

Add comprehensive loading UI:
- Skeleton screens for portfolio grid (glassmorphism rectangles)
- Loading spinner for form submission (cyan animated spinner)
- Image loading placeholders with blur effect
- Smooth content fade-in reveals
- Progress indicators where appropriate
- Use Framer Motion for skeleton pulse animation

Task 4: Keyboard Navigation

Ensure full keyboard accessibility:
- All interactive elements focusable with Tab
- Visible focus states with cyan outline
- ESC key closes modals
- Arrow keys for carousel navigation
- Enter/Space for button activation
- Skip to content link

