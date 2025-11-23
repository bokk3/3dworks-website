Create Plan 6 - "Process Timeline"
Plan Name: "Project Workflow Visualization"
Plan Description:
Build a visual timeline showing the 3D printing process from consultation
to delivery with modern animations and glassmorphism design.

Tasks:
Task 1: Process Data Structure
Create lib/process-data.ts:
- TypeScript interface for ProcessStep (step number, title, description, icon)
- Array of 5-6 process steps
- Steps: Consultation & Design → 3D Modeling/CAD → Material Selection → 3D Printing → Post-Processing & Finishing → Quality Control & Delivery
- Include brief descriptions for each step

Task 2: Process Step Component
Create components/sections/Process/ProcessStep.tsx:
- Horizontal or vertical timeline layout
- Glassmorphism card for each step (theme-aware):
  * Light: bg-white border border-slate-200 shadow-md
  * Dark: dark:bg-white/5 dark:backdrop-blur-md dark:border-white/10
- Step number in cyan gradient circle
- Icon (lucide-react) with cyan color
- Title (font-display):
  * Light: text-slate-900
  * Dark: dark:text-white
- Description:
  * Light: text-slate-600
  * Dark: dark:text-zinc-400
- Connecting line between steps:
  * Light: border-slate-300 with cyan gradient
  * Dark: dark:border-white/10 with cyan gradient
- Sharp corners (rounded-md)

Task 3: Process Timeline Section
Create components/sections/Process.tsx:
- Section heading: "Our Process" (gradient text)
- Subheading: "From concept to creation"
- Responsive layout: vertical on mobile, horizontal/grid on desktop
- Scroll-triggered animations (fade in steps one by one)
- Animated connecting lines
- Dark background

Task 4: Technology Showcase (Optional)
Add technology/equipment showcase:
- List of 3D printers and capabilities
- Material types supported
- Precision specifications
- Glassmorphism cards with stats
- Icons representing different technologies

Task 5: Add to Homepage

Update app/page.tsx:
- Add Process section after Services
- Consider adding Technology showcase in same section or separate