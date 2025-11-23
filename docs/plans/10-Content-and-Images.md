Create Plan 10 - "Content & Images"
Plan Name: "Real Content & Media"
Plan Description:
Replace placeholders with real/realistic content optimized for 3D printing business.
High-quality imagery showcasing printed parts, technology, and processes.

Tasks:
Task 1: Image Optimization System

Set up proper image handling:
- Create public/images folder structure (hero, portfolio, process, technology, team)
- Add high-quality placeholder images from Unsplash
  * 3D printers in action
  * Finished 3D printed parts (prototypes, products)
  * Material swatches and technology
  * Workspace/lab shots
- Optimize sizes (hero: 1920x1080, portfolio: 1200x900, thumbnails: 600x450)
- Use next/image with proper sizes, quality settings, and blur placeholders
- WebP format for performance

Task 2: Portfolio Content Structure

Enhance portfolio items:
- Add detailed project descriptions for each portfolio item
- Include project specs: material type (PLA, ABS, PETG, Resin, Nylon), dimensions, layer height, print time
- Before/after shots if applicable
- Process photos showing stages
- Update lib/portfolio-data.ts with rich, realistic 3D printing content
- Categories: prototypes, custom parts, art pieces, functional prints

Task 3: Testimonials Section

Create components/sections/Testimonials.tsx:
- Carousel/slider of client testimonials
- Client photos or company logos (aerospace, automotive, medical, etc.)
- Star ratings with cyan color
- Client name, company, and project type
- Use shadcn Carousel component or custom Framer Motion slider
- Autoplay with manual controls
- Glassmorphism card design (theme-aware):
  * Light: bg-white border border-slate-200 shadow-md
  * Dark: dark:bg-white/5 dark:backdrop-blur-md dark:border-white/10
- Quote marks in cyan gradient
- Text colors:
  * Light: text-slate-700
  * Dark: dark:text-slate-300

Task 4: Stats/Numbers Section

Enhance stats already in About section:
- Animated counters: "1000+ Projects", "0.01mm Precision", "15+ Materials", "24h Turnaround"
- Counter animation on scroll into view (use Framer Motion)
- Grid layout with tech icons (lucide-react)
- Cyan gradient accents on numbers
- Brief label under each stat
