export interface PortfolioItem {
  id: string;
  title: string;
  category: "prototypes" | "custom-parts" | "art" | "functional";
  image: string;
  description: string;
  material: string;
  printTime: string;
  dimensions: string;
}

export const projects: PortfolioItem[] = [
  {
    id: "1",
    title: "Aerospace Bracket Prototype",
    category: "prototypes",
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800",
    description:
      "High-strength mounting bracket prototype for aerospace testing.",
    material: "Carbon Fiber Nylon",
    printTime: "14h",
    dimensions: "120 × 85 × 40 mm",
  },
  {
    id: "2",
    title: "Custom Mechanical Gears",
    category: "functional",
    image:
      "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&q=80&w=800",
    description: "Replacement gear set for vintage machinery restoration.",
    material: "Tough PLA",
    printTime: "6h",
    dimensions: "45 × 45 × 12 mm",
  },
  {
    id: "3",
    title: "Voronoi Vase Collection",
    category: "art",
    image:
      "https://images.unsplash.com/photo-1615655406736-b37c4fabf923?auto=format&fit=crop&q=80&w=800",
    description: "Complex geometric vase featuring voronoi patterns.",
    material: "Silk PLA",
    printTime: "18h",
    dimensions: "150 × 150 × 220 mm",
  },
  {
    id: "4",
    title: "Drone Frame Chassis",
    category: "custom-parts",
    image:
      "https://images.unsplash.com/photo-1579829366248-204fe8413f31?auto=format&fit=crop&q=80&w=800",
    description:
      "Lightweight racing drone chassis with integrated camera mount.",
    material: "PETG",
    printTime: "9h",
    dimensions: "210 × 210 × 45 mm",
  },
  {
    id: "5",
    title: "Architectural Model",
    category: "prototypes",
    image:
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&q=80&w=800",
    description: "Detailed scale model for a modern residential complex.",
    material: "White PLA",
    printTime: "32h",
    dimensions: "300 × 250 × 180 mm",
  },
  {
    id: "6",
    title: "Ergonomic Tool Handle",
    category: "functional",
    image:
      "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=800",
    description: "Custom-fitted handle for industrial equipment operator.",
    material: "TPU (Flexible)",
    printTime: "5h",
    dimensions: "110 × 35 × 35 mm",
  },
  {
    id: "7",
    title: "Abstract Sculpture",
    category: "art",
    image:
      "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=800",
    description: "Fluid organic shape sculpture for interior decor.",
    material: "Marble PLA",
    printTime: "24h",
    dimensions: "180 × 160 × 240 mm",
  },
  {
    id: "8",
    title: "Automotive Intake Manifold",
    category: "custom-parts",
    image:
      "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&q=80&w=800",
    description: "Custom intake manifold for performance vehicle testing.",
    material: "High-Temp Resin",
    printTime: "28h",
    dimensions: "350 × 120 × 80 mm",
  },
  {
    id: "9",
    title: "Medical Splint Prototype",
    category: "prototypes",
    image:
      "https://images.unsplash.com/photo-1584036561566-b93a90a6b262?auto=format&fit=crop&q=80&w=800",
    description: "Breathable, custom-fit wrist splint for patient comfort.",
    material: "Nylon PA12",
    printTime: "7h",
    dimensions: "180 × 90 × 60 mm",
  },
];
