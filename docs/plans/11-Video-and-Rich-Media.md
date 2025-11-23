Create Plan 11 - "Video & Rich Media"
Plan Name: "Dynamic Media & 3D Content"
Plan Description:
Add dynamic media content including video backgrounds, 3D model previews,
and rich media showcasing the 3D printing process.

Tasks:
Task 1: Hero Video Background

Add video to hero:
- Subtle background video of 3D printers in action / printing time-lapse
- Muted, looping, autoplay
- Dark overlay gradient for text readability (bg-black/60)
- Fallback to static image on mobile for performance
- Use <video> tag with proper attributes (playsinline, preload="metadata")
- WebM format for better compression

Task 2: 3D Model Viewer Integration (Optional but impressive)

Add interactive 3D model preview:
- Use Three.js or @react-three/fiber for WebGL
- Small 3D model viewer in Hero or About section
- Rotating 3D printed object showcase
- Mouse/touch interaction to rotate
- Glassmorphism frame around viewer (theme-aware):
  * Light: bg-white/90 backdrop-blur border border-slate-200
  * Dark: dark:bg-black/50 dark:backdrop-blur dark:border-white/10
- Loading state with skeleton
- Fallback for devices without WebGL

Task 3: Portfolio Modal/Lightbox

Create components/sections/Portfolio/PortfolioModal.tsx:
- Click portfolio card to open full-screen modal
- Image gallery slider with navigation
- Full project details panel (material, specs, process)
- Optional: embedded 3D model viewer for some projects
- Close button and keyboard navigation (ESC key)
- Use shadcn Dialog component with glassmorphism (theme-aware):
  * Light: bg-white border border-slate-200 shadow-2xl
  * Dark: dark:bg-zinc-900/95 dark:backdrop-blur-xl dark:border-white/10
- Smooth enter/exit animations
- Sharp corners (rounded-md)

Task 4: Process Animation/Video

Enhance Process section:
- Add short clips/GIFs for each process step
- Or animated icons showing the step
- Embed process videos if available
- Time-lapse of printing process
- Before/after transformations

