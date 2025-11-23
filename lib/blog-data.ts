export type BlogCategory = "Materials" | "Techniques" | "Case Studies" | "News";

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string; // MDX content as string
  author: {
    name: string;
    role: string;
    avatar?: string;
  };
  category: BlogCategory;
  tags: string[];
  publishedAt: string; // ISO date string
  updatedAt?: string; // ISO date string
  image?: string;
  readTime: number; // minutes
}

export const blogPosts: BlogPost[] = [
  {
    slug: "pla-vs-abs-choosing-right-material",
    title: "PLA vs ABS: Choosing the Right Material for Your Project",
    excerpt:
      "A comprehensive comparison of PLA and ABS materials, their properties, use cases, and when to choose each for your 3D printing projects.",
    content: `# PLA vs ABS: Choosing the Right Material for Your Project

When starting a 3D printing project, one of the most critical decisions is selecting the right material. Two of the most popular choices are PLA (Polylactic Acid) and ABS (Acrylonitrile Butadiene Styrene). Let's explore their differences.

## PLA: The Beginner-Friendly Choice

PLA is an excellent choice for beginners and many applications:

- **Easy to print**: Low printing temperature (190-220°C)
- **No heated bed required**: Can print on standard print beds
- **Eco-friendly**: Made from renewable resources (cornstarch, sugarcane)
- **Wide color selection**: Available in many colors and finishes
- **Good detail**: Excellent for detailed prints and artistic pieces

### Best For:
- Prototypes and concept models
- Decorative items
- Educational projects
- Low-stress applications

## ABS: The Industrial Workhorse

ABS offers superior mechanical properties:

- **Durability**: Higher impact resistance and toughness
- **Temperature resistance**: Can withstand higher temperatures
- **Post-processing**: Easy to sand, paint, and finish
- **Chemical resistance**: Better resistance to solvents

### Best For:
- Functional parts and mechanical components
- Automotive applications
- Enclosures and housings
- Parts requiring post-processing

## Making the Decision

Consider your project requirements:
1. **Temperature exposure**: Will the part be exposed to heat?
2. **Mechanical stress**: Does it need to withstand impacts?
3. **Post-processing**: Do you plan to sand, paint, or finish?
4. **Environmental concerns**: Is sustainability important?

For most prototyping and decorative work, PLA is the better choice. For functional parts that need durability, ABS is often preferred.`,
    author: {
      name: "Sarah Chen",
      role: "Materials Engineer",
    },
    category: "Materials",
    tags: ["PLA", "ABS", "Materials", "Comparison", "Guide"],
    publishedAt: "2024-01-15T10:00:00Z",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200",
    readTime: 8,
  },
  {
    slug: "layer-height-impact-print-quality",
    title: "Understanding Layer Height: Impact on Print Quality and Time",
    excerpt:
      "Learn how layer height affects your 3D prints, from surface finish to print time, and how to choose the optimal setting for your project.",
    content: `# Understanding Layer Height: Impact on Print Quality and Time

Layer height is one of the most important settings in 3D printing, directly affecting both the quality and time of your prints.

## What is Layer Height?

Layer height refers to the thickness of each horizontal layer that your 3D printer deposits. Common layer heights range from 0.05mm (ultra-fine) to 0.3mm (draft quality).

## Quality vs Speed Trade-off

### Fine Layers (0.1mm - 0.15mm)
- **Pros**: Smooth surface finish, fine details, less visible layer lines
- **Cons**: Longer print times, more material used
- **Best for**: Display pieces, detailed models, final products

### Medium Layers (0.2mm - 0.25mm)
- **Pros**: Good balance of quality and speed
- **Cons**: Slightly visible layer lines
- **Best for**: Most functional parts, prototypes

### Coarse Layers (0.3mm+)
- **Pros**: Very fast printing, less material
- **Cons**: Visible layer lines, reduced detail
- **Best for**: Quick prototypes, large parts where detail isn't critical

## Choosing the Right Layer Height

Consider these factors:
1. **Part purpose**: Display vs functional
2. **Time constraints**: How quickly do you need it?
3. **Material**: Some materials work better with specific layer heights
4. **Nozzle size**: Layer height should be less than 80% of nozzle diameter

## Pro Tips

- Use variable layer heights for complex models
- Combine fine layers for visible areas with coarser layers for hidden sections
- Test different heights to find your printer's sweet spot`,
    author: {
      name: "Michael Rodriguez",
      role: "Print Specialist",
    },
    category: "Techniques",
    tags: ["Layer Height", "Print Quality", "Techniques", "Settings"],
    publishedAt: "2024-01-20T10:00:00Z",
    image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&q=80&w=1200",
    readTime: 6,
  },
  {
    slug: "aerospace-bracket-case-study",
    title: "Case Study: High-Strength Aerospace Bracket Prototype",
    excerpt:
      "How we helped Aerospace Solutions Inc. develop a critical mounting bracket prototype that met all industry standards and performance requirements.",
    content: `# Case Study: High-Strength Aerospace Bracket Prototype

## Project Overview

Aerospace Solutions Inc. approached 3Dworks with a challenging requirement: develop a mounting bracket prototype that could withstand extreme temperatures and vibration loads while meeting tight dimensional tolerances.

## Requirements

- **Material**: Carbon Fiber Nylon
- **Temperature resistance**: -40°C to 120°C
- **Vibration tolerance**: 10-2000 Hz
- **Dimensional accuracy**: ±0.1mm
- **Timeline**: 2 weeks

## Our Approach

### Phase 1: Design Optimization
We worked with their engineering team to optimize the bracket design for additive manufacturing, reducing weight by 15% while maintaining structural integrity.

### Phase 2: Material Selection
Carbon Fiber Nylon was chosen for its excellent strength-to-weight ratio and temperature resistance.

### Phase 3: Printing & Post-Processing
- Layer height: 0.2mm for optimal strength
- Infill: 80% for maximum structural integrity
- Post-processing: Heat treatment and precision sanding

## Results

✅ All dimensional tolerances met
✅ Passed temperature cycling tests
✅ Exceeded vibration resistance requirements
✅ Delivered 3 days ahead of schedule

## Key Learnings

This project demonstrated the importance of:
- Early collaboration with engineering teams
- Material selection based on application requirements
- Post-processing for aerospace-grade finishes

The success of this prototype led to a production order for 500 units.`,
    author: {
      name: "Dr. Anya Sharma",
      role: "Project Manager",
    },
    category: "Case Studies",
    tags: ["Aerospace", "Case Study", "Carbon Fiber", "Prototyping"],
    publishedAt: "2024-02-01T10:00:00Z",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200",
    readTime: 10,
  },
  {
    slug: "3d-printing-industry-trends-2024",
    title: "3D Printing Industry Trends: What to Watch in 2024",
    excerpt:
      "Explore the latest trends shaping the 3D printing industry, from new materials to emerging technologies and market opportunities.",
    content: `# 3D Printing Industry Trends: What to Watch in 2024

The 3D printing industry continues to evolve rapidly. Here are the key trends to watch in 2024.

## 1. Sustainable Materials

Eco-friendly materials are gaining traction:
- Bio-based plastics
- Recycled materials
- Compostable options

## 2. Multi-Material Printing

Printers capable of using multiple materials simultaneously are becoming more accessible, enabling complex, multi-functional parts.

## 3. AI-Powered Optimization

Machine learning is being used to:
- Optimize print parameters
- Predict print failures
- Suggest design improvements

## 4. Mass Production Adoption

Large-scale manufacturers are increasingly adopting 3D printing for:
- Custom tooling
- Spare parts production
- Low-volume manufacturing

## 5. Medical Applications

The medical field is seeing rapid growth in:
- Custom prosthetics
- Surgical guides
- Patient-specific implants

## Looking Ahead

As technology continues to advance, we expect to see:
- Faster printing speeds
- Lower material costs
- More material options
- Improved accessibility

Stay tuned for more updates on these exciting developments!`,
    author: {
      name: "David Lee",
      role: "Industry Analyst",
    },
    category: "News",
    tags: ["Industry", "Trends", "2024", "News"],
    publishedAt: "2024-02-10T10:00:00Z",
    image: "https://images.unsplash.com/photo-1615655406736-b37c4fabf923?auto=format&fit=crop&q=80&w=1200",
    readTime: 5,
  },
  {
    slug: "post-processing-techniques-guide",
    title: "Post-Processing Techniques for Professional Finishes",
    excerpt:
      "Master the art of post-processing your 3D prints to achieve professional, production-quality finishes with these proven techniques.",
    content: `# Post-Processing Techniques for Professional Finishes

Achieving a professional finish on 3D printed parts requires proper post-processing. Here's a comprehensive guide.

## Sanding

### Starting Grit
- Begin with 120-220 grit for rough surfaces
- Progress to 400-600 grit for smooth finishes
- Finish with 800-1000+ grit for mirror-like surfaces

### Tips
- Use wet sanding for better results
- Sand in circular motions
- Use sanding blocks for flat surfaces

## Vapor Smoothing

For ABS and similar materials:
- Acetone vapor creates a glossy finish
- Requires proper ventilation
- Test on scrap material first

## Painting

### Preparation
1. Sand to desired smoothness
2. Apply primer
3. Sand primer coat
4. Apply paint in thin coats

### Best Practices
- Use spray paint for even coverage
- Allow proper drying time between coats
- Consider clear coat for protection

## Assembly

For multi-part assemblies:
- Use proper adhesives (CA glue, epoxy)
- Consider mechanical fasteners
- Plan for assembly during design

## Quality Control

Always inspect:
- Surface finish
- Dimensional accuracy
- Structural integrity
- Fit and function

With practice, these techniques will help you achieve professional-quality results.`,
    author: {
      name: "Emily White",
      role: "Finishing Specialist",
    },
    category: "Techniques",
    tags: ["Post-Processing", "Finishing", "Techniques", "Guide"],
    publishedAt: "2024-02-15T10:00:00Z",
    image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=1200",
    readTime: 7,
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getBlogPostsByCategory(
  category: BlogCategory
): BlogPost[] {
  return blogPosts.filter((post) => post.category === category);
}

export function getBlogPostsByTag(tag: string): BlogPost[] {
  return blogPosts.filter((post) => post.tags.includes(tag));
}

export function searchBlogPosts(query: string): BlogPost[] {
  const lowerQuery = query.toLowerCase();
  return blogPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(lowerQuery) ||
      post.excerpt.toLowerCase().includes(lowerQuery) ||
      post.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
  );
}

export function getAllTags(): string[] {
  const tags = new Set<string>();
  blogPosts.forEach((post) => {
    post.tags.forEach((tag) => tags.add(tag));
  });
  return Array.from(tags).sort();
}

