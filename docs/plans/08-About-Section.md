Create Plan 8 - "About Section"
Plan Name: "About 3Dworks - Innovation Story"
Plan Description:
Create compelling about section highlighting 3Dworks' expertise, technology,
and commitment to precision 3D printing with modern design.

Tasks:
Task 1: About Content Structure
Create components/sections/About.tsx:
- Split layout: text content + image/visual
- Section heading: "Precision Meets Innovation" (gradient text)
- Company story paragraph focusing on:
  * Years of 3D printing expertise
  * Cutting-edge technology and equipment  
  * Commitment to quality and precision
  * Industries served (aerospace, automotive, medical, consumer products)
- Glassmorphism card design (theme-aware):
  * Light: bg-white border border-slate-200 shadow-md
  * Dark: dark:bg-white/5 dark:backdrop-blur-md dark:border-white/10
- Text colors:
  * Light: text-slate-600
  * Dark: dark:text-slate-300

Task 2: Stats/Achievements Section
Add key metrics to About:
- Grid of stats cards with glassmorphism
- Numbers: "1000+ Projects Completed", "0.01mm Precision", "15+ Material Types", "24h Turnaround Available"
- Animated counter on scroll into view
- Cyan gradient accent on numbers
- Icons for each stat

Task 3: Technology & Equipment
Create showcase of capabilities:
- List of 3D printing technologies (FDM, SLA, SLS, etc.)
- Supported materials with icons
- Build volume specifications
- Resolution/precision specs
- Glassmorphism cards in grid layout
- Tech-forward icons

Task 4: Team Section (Optional)
If applicable, add team showcase:
- Team member cards with photos
- Expertise areas (engineering, design, materials science)
- Glassmorphism hover effects
- Grid layout with proper spacing

Task 5: Visual Elements
Add supporting visuals:
- High-quality images of 3D printers in action
- Macro shots of printed parts
- Before/after comparisons
- Use next/image with proper optimization
- Parallax or hover effects on images

Task 6: Add to Homepage
Update app/page.tsx:
- Add About section after Process/Timeline
- Ensure visual hierarchy and flow