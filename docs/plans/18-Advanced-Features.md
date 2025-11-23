Create Plan 18 - "Advanced Features (V1.5)"
Plan Name: "Premium Features & Enhancements"
Plan Description:
Optional advanced features to enhance 3Dworks with blog, 3D viewer,
quote calculator, and other premium functionality for V1.5.

Tasks:
- [x] Task 1: Blog/Knowledge Base

Add blog section for 3D printing content:
- [x] Create /blog route with app router
- [x] MDX support for rich content (code blocks, images, 3D embeds)
- [x] Blog posts about:
  * 3D printing tips and techniques
  * Material comparisons
  * Case studies of completed projects
  * Industry news and trends
- [x] Category filtering (Materials, Techniques, Case Studies, News)
- [x] Tag system
- [x] Search functionality
- [x] RSS feed generation
- [x] Glassmorphism card design for blog posts (theme-aware):
  * Light: bg-white border border-slate-200 shadow-md hover:shadow-lg
  * Dark: dark:bg-white/5 dark:backdrop-blur-md dark:border-white/10
- [x] Author profiles

- [x] Task 2: Interactive 3D Model Viewer

Full 3D model viewer implementation:
- [x] Use @react-three/fiber + @react-three/drei
- [x] Upload and view STL/OBJ files in browser
- [x] Interactive controls (rotate, zoom, pan)
- [x] Measurement tools
- [x] Layer-by-layer preview
- [x] Material preview (show different materials on model)
- [x] Export screenshots
- [x] Fullscreen mode
- [x] Performance optimized (lazy load Three.js)
- [x] Fallback for browsers without WebGL

- [x] Task 3: Advanced Quote Calculator

Interactive quote estimation tool:
- [x] Comprehensive quote form:
  * 3D file upload with auto-dimension reading
  * Manual dimension input (L × W × H in mm/cm)
  * Material selection (PLA, ABS, PETG, Resin, Nylon, etc.)
  * Infill percentage slider
  * Layer height selector
  * Quantity input
  * Finish options (as-printed, sanded, painted)
  * Rush delivery option
- [x] Real-time price calculation algorithm
- [x] Price breakdown (material, time, finishing, shipping)
- [x] "Request Official Quote" button
- [x] Save quote to user account (if logged in)
- [x] Generate PDF quote
- [x] Email quote to customer

- [x] Task 4: Material Comparison Tool

Interactive material selector:
- [x] Side-by-side material comparison
- [x] Properties table (strength, flexibility, temperature resistance)
- [x] Use case recommendations
- [x] Cost comparison
- [x] Print time estimates
- [x] Visual samples
- [x] Filter by properties
- [x] "Best for your project" wizard

- [x] Task 5: Add admin page with basic password protection.

Secure Admin page for messages and quotes:
- [x] No seperate /login route, /admin page asks for password and then displays content.
- [x] Non-complicated layout, just a section for messages overview and a received quotes component.
- [x] Mark messages and quotes as 'replied' option

