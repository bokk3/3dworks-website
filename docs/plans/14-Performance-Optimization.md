Create Plan 14 - "Performance Optimization"
Plan Name: "Blazing Fast Performance"
Plan Description:
Optimize the site for maximum performance with Next.js 16 features,
image optimization, code splitting, and caching strategies.

Tasks:
Task 1: Image Optimization Deep Dive

Optimize all images comprehensively:
- Convert all images to WebP format (with JPEG/PNG fallbacks)
- Use next/image with responsive sizes attribute
- Implement srcset for different screen sizes
- Lazy load all below-fold images automatically
- Add blur placeholder data URLs for smooth loading
- Priority loading for hero image and above-fold content
- Optimize 3D model preview thumbnails
- Maximum image quality: 85 (balance quality/size)

Task 2: Code Splitting & Bundle Optimization

Optimize JavaScript bundle:
- Dynamic imports for heavy components (Portfolio Modal, 3D viewer)
- Split Framer Motion animations into separate chunks
- Use next/dynamic for all client components not immediately visible
- Tree-shake unused Tailwind classes
- Minimize third-party library usage
- Analyze bundle with @next/bundle-analyzer
- Target: < 200KB initial JS bundle

Task 3: Caching Strategy

Implement proper caching with Next.js 16:
- Static generation for main landing page
- Incremental static regeneration (ISR) for portfolio (revalidate: 3600)
- Cache portfolio data with React cache()
- Optimize API routes with proper cache headers
- Service worker for offline capability (optional)
- CDN configuration for static assets

Task 4: Performance Audit & Core Web Vitals

Run comprehensive performance testing:
- Lighthouse audit targeting 95+ on all metrics
- Core Web Vitals optimization:
  * LCP (Largest Contentful Paint) < 2.5s
  * FID (First Input Delay) < 100ms
  * CLS (Cumulative Layout Shift) < 0.1
- Reduce JavaScript execution time
- Minimize CSS (use Tailwind purge)
- Test on slow 3G connection
- Mobile performance priority