 Create Plan 4 - "Portfolio Gallery"
Plan Name: "Interactive Portfolio Gallery"
Plan Description:
Build a filterable, animated portfolio gallery showcasing 3D printed
projects with categories and modal views. Modern glassmorphism design.

Tasks:
Task 1: Portfolio Data Structure
Create lib/portfolio-data.ts:
- TypeScript interface for PortfolioItem (id, title, category, image, description, material, printTime, dimensions)
- Mock data array with 9-12 sample 3D printing projects
- Categories: 'all', 'prototypes', 'custom-parts', 'art', 'functional'
- Include material types (PLA, ABS, PETG, Resin, Nylon)
- Use placeholder images from unsplash (3D printing, technology)

Task 2: Portfolio Filter Component
Create components/sections/Portfolio/PortfolioFilter.tsx:
- Client component with state for active filter
- Filter buttons: All, Prototypes, Custom Parts, Art Pieces, Functional Prints
- Active state styling:
  * Light: bg-cyan-500 text-white border-cyan-500
  * Dark: dark:bg-cyan-500/20 dark:text-cyan-400 dark:border-cyan-500
- Inactive state:
  * Light: border border-slate-300 text-slate-700 hover:border-cyan-500
  * Dark: dark:border-white/10 dark:text-slate-300 dark:hover:border-cyan-500/50
- Glassmorphism effect (backdrop-blur-sm)
- Smooth transitions with scale effect
- Sharp corners (rounded-md)

Task 3: Portfolio Grid Component
Create components/sections/Portfolio/PortfolioGrid.tsx:
- Responsive grid: 3 cols desktop, 2 tablet, 1 mobile
- Gap of 6 (gap-6)
- Map through filtered items
- Framer Motion layout animations when filtering
- Stagger animation for smoother appearance

Task 4: Portfolio Card Component
Create components/sections/Portfolio/PortfolioCard.tsx:
- Glassmorphism card (theme-aware):
  * Light: bg-white border border-slate-200 shadow-md
  * Dark: dark:bg-white/5 dark:backdrop-blur-md dark:border-white/10
- Image with next/image (fill, object-cover)
- Gradient overlay from transparent to theme color
- Title, category badge, and material on hover
- Scale + glow effect on hover:
  * Light: hover:scale-105 hover:shadow-xl
  * Dark: dark:hover:scale-105 dark:hover:border-cyan-500/50
- Category badge with cyan/purple gradient
- Sharp corners (rounded-md)
- Click opens modal (or link to detail page)

Task 5: Main Portfolio Section
Create components/sections/Portfolio.tsx:
- Section wrapper with padding (py-20 px-4)
- Heading: "Featured Projects" (gradient text)
- Subheading: "Explore our precision 3D printed creations"
  * Light: text-slate-600
  * Dark: dark:text-slate-400
- Include PortfolioFilter
- Include PortfolioGrid
- Background with subtle grid pattern (theme-aware)

Task 6: Add to Homepage
Update app/page.tsx:
- Import Portfolio section
- Add after Hero
- Proper section spacing (space-y-0 for edge-to-edge sections)