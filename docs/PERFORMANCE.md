# Performance Optimization Documentation

## Overview
This document outlines the performance optimizations implemented for the 3Dworks website, targeting 95+ Lighthouse scores and optimal Core Web Vitals.

## Image Optimization

### Configuration
- **Format**: WebP and AVIF formats enabled in `next.config.ts`
- **Quality**: Set to 85 (balance between quality and file size)
- **Device Sizes**: Responsive breakpoints configured for optimal image delivery
- **Cache TTL**: 60 seconds minimum cache time

### Implementation
- All images use `next/image` component
- Above-fold images: Priority loading enabled
- Below-fold images: Lazy loading enabled
- Responsive `sizes` attribute for all images
- Proper aspect ratios to prevent layout shift (CLS)

### Image Components Optimized
- Hero section (priority loading)
- Portfolio cards (lazy loading)
- Portfolio modal (lazy loading)
- About section (lazy loading)
- Testimonials (lazy loading)
- Process videos (lazy loading)
- Model viewer fallbacks (lazy loading)

## Code Splitting

### Dynamic Imports
Heavy components are dynamically imported to reduce initial bundle size:

- **PortfolioModal**: Loaded only when modal is opened
- **QuickQuote**: Client-side only, loaded on demand
- **About**: Below-fold, lazy loaded
- **Testimonials**: Below-fold, lazy loaded
- **Contact**: Below-fold, lazy loaded

### Bundle Optimization
- Framer Motion optimized with `optimizePackageImports`
- Lucide React icons optimized with tree-shaking
- Bundle analyzer configured (`ANALYZE=true npm run build`)

### Target Metrics
- Initial JS bundle: < 200KB (gzipped)
- CSS bundle: < 100KB (gzipped)

## Caching Strategy

### Static Generation
- Main landing page (`app/page.tsx`) is statically generated
- All sections are pre-rendered at build time

### Cache Headers
- Static assets: `max-age=31536000, immutable` (1 year)
- Images: `max-age=31536000, immutable` (1 year)
- ETags enabled for efficient cache validation

### Incremental Static Regeneration (ISR)
- Portfolio data can be revalidated every hour (3600 seconds)
- React cache() used for data fetching when needed

## Core Web Vitals Targets

### Largest Contentful Paint (LCP)
- **Target**: < 2.5s
- **Optimizations**:
  - Hero image priority loading
  - Critical CSS inlined
  - Font preloading
  - Image optimization (WebP/AVIF)

### First Input Delay (FID)
- **Target**: < 100ms
- **Optimizations**:
  - Code splitting reduces JavaScript execution time
  - Dynamic imports for heavy components
  - Lazy loading below-fold content

### Cumulative Layout Shift (CLS)
- **Target**: < 0.1
- **Optimizations**:
  - Proper image dimensions (aspect ratios)
  - Reserved space for images
  - No layout shifts during loading

## Performance Testing

### Tools
- **Lighthouse**: Chrome DevTools or CI
- **Bundle Analyzer**: `ANALYZE=true npm run build`
- **WebPageTest**: For real-world performance testing
- **Chrome DevTools**: Network throttling (slow 3G)

### Running Tests

#### Lighthouse Audit
```bash
# Build the production version
npm run build

# Start production server
npm start

# Run Lighthouse in Chrome DevTools
# Or use Lighthouse CI
```

#### Bundle Analysis
```bash
ANALYZE=true npm run build
# Opens bundle analyzer in browser
```

#### Performance Budget
- Initial JS: < 200KB (gzipped)
- CSS: < 100KB (gzipped)
- Images: Optimized with WebP/AVIF
- Fonts: Preloaded and subset

## Mobile Performance

### Optimizations
- Responsive images with proper sizes
- Touch-optimized interactions
- Reduced motion support
- Mobile-first CSS approach

### Testing
- Test on real mobile devices
- Use Chrome DevTools mobile emulation
- Test on slow 3G connection
- Verify touch interactions

## Monitoring

### Metrics to Track
- Lighthouse scores (Performance, Accessibility, Best Practices, SEO)
- Core Web Vitals (LCP, FID, CLS)
- Bundle sizes
- Image sizes and formats
- Time to Interactive (TTI)
- First Contentful Paint (FCP)

### Continuous Monitoring
- Set up Lighthouse CI in deployment pipeline
- Monitor Core Web Vitals in production
- Track bundle size changes
- Alert on performance regressions

## Future Optimizations

### Potential Improvements
- Service Worker for offline capability (PWA)
- Image CDN for faster delivery
- Advanced caching strategies
- Prefetching for critical resources
- Resource hints (preconnect, dns-prefetch)

## Notes

- All optimizations respect `prefers-reduced-motion`
- Images are optimized but original quality is maintained
- Bundle analyzer should be run periodically to catch regressions
- Performance budgets should be enforced in CI/CD

