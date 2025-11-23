Create Plan 13 - "Smart Navigation & UX"
Plan Name: "Enhanced Navigation & User Experience"
Plan Description:
Improve navigation flow and user experience with smart interactions,
smooth scrolling, and modern UX patterns with glassmorphism design.

Tasks:
Task 1: Smooth Scroll Navigation

[x] Enhance navbar functionality:
- [x] Smooth scroll to sections with proper offset for fixed nav
- [x] Active section highlighting in nav (cyan underline/indicator)
- [x] Use Intersection Observer to detect current section
- [x] Mobile menu closes automatically on link selection
- [x] Scroll progress updates active nav item
- [x] Smooth easing function (ease-in-out)

Task 2: Back to Top Button

[x] Create components/ui/BackToTop.tsx:
- [x] Appears after scrolling down 500px
- [x] Fixed bottom-right position (with spacing for quote calculator if present)
- [x] Glassmorphism circular button (theme-aware):
  * [x] Light: bg-white border border-slate-200 shadow-lg text-slate-700
  * [x] Dark: dark:bg-white/5 dark:backdrop-blur-md dark:border-white/10 dark:text-white
- [x] Cyan border with glow on hover (both themes)
- [x] Up arrow icon (lucide-react)
- [x] Smooth scroll to top animation
- [x] Fade in/out based on scroll position
- [x] Sharp corners (rounded-md)

Task 3: Loading States & Skeletons

[x] Add comprehensive loading UI:
- [x] Skeleton screens for portfolio grid (glassmorphism rectangles)
- [x] Loading spinner for form submission (cyan animated spinner)
- [x] Image loading placeholders with blur effect
- [x] Smooth content fade-in reveals
- [x] Progress indicators where appropriate
- [x] Use Framer Motion for skeleton pulse animation

Task 4: Keyboard Navigation

[x] Ensure full keyboard accessibility:
- [x] All interactive elements focusable with Tab
- [x] Visible focus states with cyan outline
- [x] ESC key closes modals
- [x] Arrow keys for carousel navigation
- [x] Enter/Space for button activation
- [x] Skip to content link

