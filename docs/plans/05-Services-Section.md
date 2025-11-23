Create Plan 5 - "Services Section"
Plan Name: "Services Overview Cards"
Plan Description:
Create an engaging services section with animated glassmorphism cards
highlighting the main 3D printing service offerings.

Tasks:
Task 1: Services Data [x]

Create lib/services-data.ts:

- [x] Array of 4-5 services
- [x] Each: title, description, icon name (from lucide-react)
- [x] Services: Rapid Prototyping, Custom Manufacturing, Product Design, Material Consultation, Small Batch Production
- [x] Include technical specs for each (precision, materials, turnaround time)

Task 2: Service Card Component [x]

Create components/sections/Services/ServiceCard.tsx:

- [x] Glassmorphism card (theme-aware):
  - Light: bg-white border border-slate-200 shadow-md hover:shadow-xl
  - Dark: dark:bg-white/5 dark:backdrop-blur-md dark:border-white/10
- [x] Hover effect: lift + glow (hover:-translate-y-2)
  - Light: hover:border-cyan-500
  - Dark: dark:hover:border-cyan-500/50
- [x] Icon at top (lucide-react, cyan-500 color in gradient background circle)
  - Light: bg-cyan-50 in light mode
  - Dark: dark:bg-cyan-500/10 in dark mode
- [x] Title (font-display):
  - Light: text-slate-900
  - Dark: dark:text-white
- [x] Description:
  - Light: text-slate-600
  - Dark: dark:text-zinc-400
- [x] Sharp corners (rounded-md)
- [x] Smooth transitions with transform-gpu

Task 3: Services Section [x]
Create components/sections/Services.tsx:

- [x] Section heading: "Our Services" (gradient text cyan to purple)
- [x] Subheading: "Cutting-edge 3D printing solutions"
- [x] Grid of ServiceCard components
- [x] 2 cols tablet, 3-4 desktop
- [x] Scroll-triggered stagger animations (Framer Motion viewport)
- [x] Dark background with subtle tech pattern
- [x] Responsive spacing (py-20 px-4)

Task 4: Add to Homepage [x]

Update app/page.tsx:

- [x] Add Services section after Portfolio
- [x] Ensure smooth section transitions
