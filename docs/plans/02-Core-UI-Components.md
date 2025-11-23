Create Plan 2 - "Core UI Components"
Plan Name: "Core Reusable Components"
Plan Description:
Build the foundational UI components that will be used across the site:
navigation with glassmorphism, footer, and modern button/card variations.

Tasks:
Task 1: Create Navbar Component
Create components/sections/Navbar.tsx:
- Sticky header with glassmorphism (theme-aware):
  * Light: backdrop-blur-md bg-white/80 border-b border-slate-200
  * Dark: dark:backdrop-blur-md dark:bg-black/50 dark:border-white/10
- Logo on left (text: "3Dworks" with gradient effect from cyan to purple)
- Nav links center: Home, Portfolio, Services, Technology, Contact
  * Light: text-slate-700 hover:text-cyan-600
  * Dark: dark:text-slate-200 dark:hover:text-cyan-400
- CTA button right: "Get Started" (bg-cyan-500 hover:bg-cyan-600 text-white)
- Mobile hamburger menu with smooth slide-in animation
- Smooth scroll to sections with offset
- Use Framer Motion for entrance animation
- Sharp corners (rounded-sm or rounded-md only)
- Must be a client component for interactivity

Task 2: Create Footer Component
Create components/sections/Footer.tsx:
- Theme-adaptive background:
  * Light: bg-slate-50 border-t border-slate-200
  * Dark: dark:bg-[#0a0a0f] dark:border-white/10
- Three columns: About 3Dworks, Quick Links, Contact Info
  * Text light: text-slate-600
  * Text dark: dark:text-slate-400
- Social media icons with hover effects (cyan accent)
- Newsletter signup with file upload mention
- Copyright text with cyan accent
- Modern grid layout with minimal spacing
- Can be server component

Task 3: Update Layout with Nav and Footer
Update app/layout.tsx:
- Import and add Navbar component
- Add Footer component  
- Proper semantic HTML structure
- Ensure glassmorphism works properly