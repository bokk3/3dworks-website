# Images Directory Structure

This directory contains optimized images for the 3Dworks website.

## Folder Structure

- `hero/` - Hero section images (1920x1080 recommended)
- `portfolio/` - Full-size portfolio project images (1200x900 recommended)
- `portfolio/thumbnails/` - Thumbnail images for portfolio (600x450 recommended)
- `process/` - Process workflow images
- `technology/` - Technology and equipment images
- `testimonials/` - Client logos or photos

## Image Optimization Guidelines

### Recommended Sizes
- **Hero images**: 1920x1080px (16:9 aspect ratio)
- **Portfolio images**: 1200x900px (4:3 aspect ratio)
- **Thumbnails**: 600x450px (4:3 aspect ratio)
- **Process/Technology**: 1200x800px (3:2 aspect ratio)
- **Testimonials**: 200x200px (1:1 aspect ratio for logos/photos)

### Usage with next/image

All images should use Next.js `Image` component with:
- Proper `sizes` attribute for responsive loading
- Quality setting: 85 (balance between quality and file size)
- Blur placeholders for smooth loading experience
- WebP format (handled automatically by Next.js)

### Example Usage

```tsx
import Image from "next/image";

<Image
  src="/images/portfolio/project-1.jpg"
  alt="Project description"
  width={1200}
  height={900}
  quality={85}
  className="object-cover"
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>
```

### Image Sources

Currently using Unsplash placeholder images. Replace with actual project images when available.

