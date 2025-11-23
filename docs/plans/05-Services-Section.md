Create Plan 5 - "Services Section"
Plan Name: "Services Overview Cards"
Plan Description:
Create an engaging services section with animated glassmorphism cards
highlighting the main 3D printing service offerings.

Tasks:
Task 1: Services Data

Create lib/services-data.ts:
- Array of 4-5 services
- Each: title, description, icon name (from lucide-react)
- Services: Rapid Prototyping, Custom Manufacturing, Product Design, Material Consultation, Small Batch Production
- Include technical specs for each (precision, materials, turnaround time)

Task 2: Service Card Component

Create components/sections/Services/ServiceCard.tsx:
- Glassmorphism card (theme-aware):
  * Light: bg-white border border-slate-200 shadow-md hover:shadow-xl
  * Dark: dark:bg-white/5 dark:backdrop-blur-md dark:border-white/10
- Hover effect: lift + glow (hover:-translate-y-2)
  * Light: hover:border-cyan-500
  * Dark: dark:hover:border-cyan-500/50
- Icon at top (lucide-react, cyan-500 color in gradient background circle)
  * Light: bg-cyan-50 in light mode
  * Dark: dark:bg-cyan-500/10 in dark mode
- Title (font-display):
  * Light: text-slate-900
  * Dark: dark:text-white
- Description:
  * Light: text-slate-600
  * Dark: dark:text-zinc-400
- Sharp corners (rounded-md)
- Smooth transitions with transform-gpu

Task 3: Services Section
Create components/sections/Services.tsx:
- Section heading: "Our Services" (gradient text cyan to purple)
- Subheading: "Cutting-edge 3D printing solutions"
- Grid of ServiceCard components
- 2 cols tablet, 3-4 desktop
- Scroll-triggered stagger animations (Framer Motion viewport)
- Dark background with subtle tech pattern
- Responsive spacing (py-20 px-4)


Task 4: Add to Homepage

Update app/page.tsx:
- Add Services section after Portfolio
- Ensure smooth section transitions