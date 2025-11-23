Create Plan 4 - "Portfolio Gallery"
Plan Name: "Interactive Portfolio Gallery"
Plan Description:
Build a filterable, animated portfolio gallery showcasing 3D printed
projects with categories and modal views. Modern glassmorphism design.

Tasks:
Task 1: Portfolio Data Structure [x]
Create lib/portfolio-data.ts:

- [x] TypeScript interface for PortfolioItem (id, title, category, image, description, material, printTime, dimensions)
- [x] Mock data array with 9-12 sample 3D printing projects
- [x] Categories: 'all', 'prototypes', 'custom-parts', 'art', 'functional'
- [x] Include material types (PLA, ABS, PETG, Resin, Nylon)
- [x] Use placeholder images from unsplash (3D printing, technology)

Task 2: Portfolio Filter Component [x]
Create components/sections/Portfolio/PortfolioFilter.tsx:

- [x] Client component with state for active filter
- [x] Filter buttons: All, Prototypes, Custom Parts, Art Pieces, Functional Prints
- [x] Active state styling:
  - Light: bg-cyan-500 text-white border-cyan-500
  - Dark: dark:bg-cyan-500/20 dark:text-cyan-400 dark:border-cyan-500
- [x] Inactive state:
  - Light: border border-slate-300 text-slate-700 hover:border-cyan-500
  - Dark: dark:border-white/10 dark:text-slate-300 dark:hover:border-cyan-500/50
- [x] Glassmorphism effect (backdrop-blur-sm)
- [x] Smooth transitions with scale effect
- [x] Sharp corners (rounded-md)

Task 3: Portfolio Grid Component [x]
Create components/sections/Portfolio/PortfolioGrid.tsx:

- [x] Responsive grid: 3 cols desktop, 2 tablet, 1 mobile
- [x] Gap of 6 (gap-6)
- [x] Map through filtered items
- [x] Framer Motion layout animations when filtering
- [x] Stagger animation for smoother appearance

Task 4: Portfolio Card Component [x]
Create components/sections/Portfolio/PortfolioCard.tsx:

- [x] Glassmorphism card (theme-aware):
  - Light: bg-white border border-slate-200 shadow-md
  - Dark: dark:bg-white/5 dark:backdrop-blur-md dark:border-white/10
- [x] Image with next/image (fill, object-cover)
- [x] Gradient overlay from transparent to theme color
- [x] Title, category badge, and material on hover
- [x] Scale + glow effect on hover:
  - Light: hover:scale-105 hover:shadow-xl
  - Dark: dark:hover:scale-105 dark:hover:border-cyan-500/50
- [x] Category badge with cyan/purple gradient
- [x] Sharp corners (rounded-md)
- [x] Click opens modal (or link to detail page)

Task 5: Main Portfolio Section [x]
Create components/sections/Portfolio.tsx:

- [x] Section wrapper with padding (py-20 px-4)
- [x] Heading: "Featured Projects" (gradient text)
- [x] Subheading: "Explore our precision 3D printed creations"
  - Light: text-slate-600
  - Dark: dark:text-slate-400
- [x] Include PortfolioFilter
- [x] Include PortfolioGrid
- [x] Background with subtle grid pattern (theme-aware)

Task 6: Add to Homepage [x]
Update app/page.tsx:

- [x] Import Portfolio section
- [x] Add after Hero
- [x] Proper section spacing (space-y-0 for edge-to-edge sections)
