Create Plan 2 - "Core UI Components"
Plan Name: "Core Reusable Components"
Plan Description:
Build the foundational UI components that will be used across the site:
navigation with glassmorphism, footer, and modern button/card variations.

Tasks:
Task 1: Create Navbar Component [x]
Create components/sections/Navbar.tsx:

- [x] Sticky header with glassmorphism (theme-aware):
  - Light: backdrop-blur-md bg-white/80 border-b border-slate-200
  - Dark: dark:backdrop-blur-md dark:bg-black/50 dark:border-white/10
- [x] Logo on left (text: "3Dworks" with gradient effect from cyan to purple)
- [x] Nav links center: Home, Portfolio, Services, Technology, Contact
  - Light: text-slate-700 hover:text-cyan-600
  - Dark: dark:text-slate-200 dark:hover:text-cyan-400
- [x] CTA button right: "Get Started" (bg-cyan-500 hover:bg-cyan-600 text-white)
- [x] Mobile hamburger menu with smooth slide-in animation
- [x] Smooth scroll to sections with offset
- [x] Use Framer Motion for entrance animation
- [x] Sharp corners (rounded-sm or rounded-md only)
- [x] Must be a client component for interactivity

Task 2: Create Footer Component [x]
Create components/sections/Footer.tsx:

- [x] Theme-adaptive background:
  - Light: bg-slate-50 border-t border-slate-200
  - Dark: dark:bg-[#0a0a0f] dark:border-white/10
- [x] Three columns: About 3Dworks, Quick Links, Contact Info
  - Text light: text-slate-600
  - Text dark: dark:text-slate-400
- [x] Social media icons with hover effects (cyan accent)
- [x] Newsletter signup with file upload mention
- [x] Copyright text with cyan accent
- [x] Modern grid layout with minimal spacing
- [x] Can be server component

Task 3: Update Layout with Nav and Footer [x]
Update app/layout.tsx:

- [x] Import and add Navbar component
- [x] Add Footer component
- [x] Proper semantic HTML structure
- [x] Ensure glassmorphism works properly
