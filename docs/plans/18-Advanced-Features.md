Create Plan 18 - "Advanced Features (V1.5)"
Plan Name: "Premium Features & Enhancements"
Plan Description:
Optional advanced features to enhance 3Dworks with blog, 3D viewer,
quote calculator, and other premium functionality for V1.5.

Tasks:
Task 1: Blog/Knowledge Base

Add blog section for 3D printing content:
- Create /blog route with app router
- MDX support for rich content (code blocks, images, 3D embeds)
- Blog posts about:
  * 3D printing tips and techniques
  * Material comparisons
  * Case studies of completed projects
  * Industry news and trends
- Category filtering (Materials, Techniques, Case Studies, News)
- Tag system
- Search functionality
- RSS feed generation
- Glassmorphism card design for blog posts (theme-aware):
  * Light: bg-white border border-slate-200 shadow-md hover:shadow-lg
  * Dark: dark:bg-white/5 dark:backdrop-blur-md dark:border-white/10
- Author profiles

Task 2: Interactive 3D Model Viewer

Full 3D model viewer implementation:
- Use @react-three/fiber + @react-three/drei
- Upload and view STL/OBJ files in browser
- Interactive controls (rotate, zoom, pan)
- Measurement tools
- Layer-by-layer preview
- Material preview (show different materials on model)
- Export screenshots
- Fullscreen mode
- Performance optimized (lazy load Three.js)
- Fallback for browsers without WebGL

Task 3: Advanced Quote Calculator

Interactive quote estimation tool:
- Comprehensive quote form:
  * 3D file upload with auto-dimension reading
  * Manual dimension input (L × W × H in mm/cm)
  * Material selection (PLA, ABS, PETG, Resin, Nylon, etc.)
  * Infill percentage slider
  * Layer height selector
  * Quantity input
  * Finish options (as-printed, sanded, painted)
  * Rush delivery option
- Real-time price calculation algorithm
- Price breakdown (material, time, finishing, shipping)
- "Request Official Quote" button
- Save quote to user account (if logged in)
- Generate PDF quote
- Email quote to customer

Task 4: Customer Portal (Advanced)

User authentication and project management:
- NextAuth.js integration
- Customer login/signup
- Project dashboard
- Upload history
- Quote history
- Track order status
- Reorder previous projects
- Save favorite materials/settings
- Glassmorphism dashboard design (theme-aware):
  * Light: bg-slate-50 with white cards (border border-slate-200)
  * Dark: dark:bg-[#050505] with dark:bg-white/5 cards

Task 5: Material Comparison Tool

Interactive material selector:
- Side-by-side material comparison
- Properties table (strength, flexibility, temperature resistance)
- Use case recommendations
- Cost comparison
- Print time estimates
- Visual samples
- Filter by properties
- "Best for your project" wizard

