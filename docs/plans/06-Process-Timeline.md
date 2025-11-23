Create Plan 6 - "Process Timeline"
Plan Name: "Project Workflow Visualization"
Plan Description:
Build a visual timeline showing the 3D printing process from consultation
to delivery with modern animations and glassmorphism design.

Tasks:
Task 1: Process Data Structure [x]
Create lib/process-data.ts:

- [x] TypeScript interface for ProcessStep (step number, title, description, icon)
- [x] Array of 5-6 process steps
- [x] Steps: Consultation & Design → 3D Modeling/CAD → Material Selection → 3D Printing → Post-Processing & Finishing → Quality Control & Delivery
- [x] Include brief descriptions for each step

Task 2: Process Step Component [x]
Create components/sections/Process/ProcessStep.tsx:

- [x] Horizontal or vertical timeline layout
- [x] Glassmorphism card for each step (theme-aware):
  - Light: bg-white border border-slate-200 shadow-md
  - Dark: dark:bg-white/5 dark:backdrop-blur-md dark:border-white/10
- [x] Step number in cyan gradient circle
- [x] Icon (lucide-react) with cyan color
- [x] Title (font-display):
  - Light: text-slate-900
  - Dark: dark:text-white
- [x] Description:
  - Light: text-slate-600
  - Dark: dark:text-zinc-400
- [x] Connecting line between steps:
  - Light: border-slate-300 with cyan gradient
  - Dark: dark:border-white/10 with cyan gradient
- [x] Sharp corners (rounded-md)

Task 3: Process Timeline Section [x]
Create components/sections/Process.tsx:

- [x] Section heading: "Our Process" (gradient text)
- [x] Subheading: "From concept to creation"
- [x] Responsive layout: vertical on mobile, horizontal/grid on desktop
- [x] Scroll-triggered animations (fade in steps one by one)
- [x] Animated connecting lines
- [x] Dark background

Task 4: Technology Showcase (Optional) [ ]
Add technology/equipment showcase:

- [ ] List of 3D printers and capabilities
- [ ] Material types supported
- [ ] Precision specifications
- [ ] Glassmorphism cards with stats
- [ ] Icons representing different technologies

Task 5: Add to Homepage [x]

Update app/page.tsx:

- [x] Add Process section after Services
- [x] Consider adding Technology showcase in same section or separate
