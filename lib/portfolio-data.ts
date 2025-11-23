export interface PortfolioItem {
  id: string;
  title: string;
  category: "prototypes" | "custom-parts" | "art" | "functional";
  image: string;
  description: string;
  material: string;
  printTime: string;
  dimensions: string;
  layerHeight?: string;
  technology?: "FDM" | "SLA" | "SLS";
  postProcessing?: string[];
  clientName?: string;
  clientCompany?: string;
  beforeAfterImages?: string[];
  processImages?: string[];
}

export const projects: PortfolioItem[] = [
  {
    id: "1",
    title: "Aerospace Bracket Prototype",
    category: "prototypes",
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800",
    description:
      "High-strength mounting bracket prototype for aerospace testing. Designed to withstand extreme temperatures and vibration loads. This critical component underwent rigorous stress testing and met all aerospace industry standards for material properties and dimensional accuracy.",
    material: "Carbon Fiber Nylon",
    printTime: "14h",
    dimensions: "120 × 85 × 40 mm",
    layerHeight: "0.2mm",
    technology: "FDM",
    postProcessing: ["Sanding", "Heat treatment", "Quality inspection"],
    clientCompany: "Aerospace Solutions Inc.",
  },
  {
    id: "2",
    title: "Custom Mechanical Gears",
    category: "functional",
    image:
      "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&q=80&w=800",
    description:
      "Replacement gear set for vintage machinery restoration. Precise tooth profiles and tolerances ensure smooth operation and longevity. These custom gears restored functionality to a 1950s industrial lathe, eliminating the need for expensive custom machining.",
    material: "Tough PLA",
    printTime: "6h",
    dimensions: "45 × 45 × 12 mm",
    layerHeight: "0.15mm",
    technology: "FDM",
    postProcessing: ["Precision sanding", "Dimensional verification"],
  },
  {
    id: "3",
    title: "Voronoi Vase Collection",
    category: "art",
    image:
      "https://images.unsplash.com/photo-1615655406736-b37c4fabf923?auto=format&fit=crop&q=80&w=800",
    description:
      "Complex geometric vase featuring intricate voronoi patterns. This artistic piece showcases the precision and detail possible with modern 3D printing. The organic, cellular structure creates a stunning visual effect while maintaining structural integrity. Perfect for modern interior design.",
    material: "Silk PLA",
    printTime: "18h",
    dimensions: "150 × 150 × 220 mm",
    layerHeight: "0.1mm",
    technology: "FDM",
    postProcessing: ["Surface smoothing", "UV coating"],
  },
  {
    id: "4",
    title: "Drone Frame Chassis",
    category: "custom-parts",
    image:
      "https://images.unsplash.com/photo-1579829366248-204fe8413f31?auto=format&fit=crop&q=80&w=800",
    description:
      "Lightweight racing drone chassis with integrated camera mount. Optimized for maximum strength-to-weight ratio using advanced topology optimization. The design includes vibration dampening features and modular mounting points for various FPV camera systems.",
    material: "PETG",
    printTime: "9h",
    dimensions: "210 × 210 × 45 mm",
    layerHeight: "0.2mm",
    technology: "FDM",
    postProcessing: ["Weight optimization", "Hardware installation"],
  },
  {
    id: "5",
    title: "Architectural Model",
    category: "prototypes",
    image:
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&q=80&w=800",
    description:
      "Detailed scale model for a modern residential complex. This 1:100 scale architectural model accurately represents the building's facade, landscaping, and surrounding environment. Used for client presentations and planning approvals, showcasing fine details including windows, balconies, and exterior textures.",
    material: "White PLA",
    printTime: "32h",
    dimensions: "300 × 250 × 180 mm",
    layerHeight: "0.1mm",
    technology: "FDM",
    postProcessing: ["Surface finishing", "Painting", "Assembly"],
    clientCompany: "Modern Architecture Studio",
  },
  {
    id: "6",
    title: "Ergonomic Tool Handle",
    category: "functional",
    image:
      "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=800",
    description:
      "Custom-fitted handle for industrial equipment operator. Designed using 3D scanning of the operator's hand for perfect ergonomic fit. The flexible TPU material provides excellent grip and reduces hand fatigue during extended use. This custom solution improved operator comfort and productivity.",
    material: "TPU (Flexible)",
    printTime: "5h",
    dimensions: "110 × 35 × 35 mm",
    layerHeight: "0.2mm",
    technology: "FDM",
    postProcessing: ["Surface texturing", "Grip enhancement"],
  },
  {
    id: "7",
    title: "Abstract Sculpture",
    category: "art",
    image:
      "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=800",
    description:
      "Fluid organic shape sculpture for interior decor. This artistic piece features smooth, flowing curves that would be impossible to achieve with traditional manufacturing. The marble-like finish creates an elegant, sophisticated appearance perfect for modern spaces. Each print is unique due to the material's natural variation.",
    material: "Marble PLA",
    printTime: "24h",
    dimensions: "180 × 160 × 240 mm",
    layerHeight: "0.1mm",
    technology: "FDM",
    postProcessing: ["Surface polishing", "Sealing"],
  },
  {
    id: "8",
    title: "Automotive Intake Manifold",
    category: "custom-parts",
    image:
      "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&q=80&w=800",
    description:
      "Custom intake manifold for performance vehicle testing. This complex part features intricate internal channels optimized for airflow. Printed using high-temperature resin capable of withstanding engine bay temperatures. The design allows for rapid prototyping and testing of different airflow configurations before committing to expensive metal casting.",
    material: "High-Temp Resin",
    printTime: "28h",
    dimensions: "350 × 120 × 80 mm",
    layerHeight: "0.05mm",
    technology: "SLA",
    postProcessing: ["Post-curing", "Temperature testing", "Flow analysis"],
    clientCompany: "Performance Auto Engineering",
  },
  {
    id: "9",
    title: "Medical Splint Prototype",
    category: "prototypes",
    image:
      "https://images.unsplash.com/photo-1584036561566-b93a90a6b262?auto=format&fit=crop&q=80&w=800",
    description:
      "Breathable, custom-fit wrist splint for patient comfort. Designed from 3D scan of patient's anatomy for perfect fit. The lattice structure provides support while allowing airflow and reducing skin irritation. This medical-grade prototype demonstrates the potential for personalized healthcare solutions through 3D printing.",
    material: "Nylon PA12",
    printTime: "7h",
    dimensions: "180 × 90 × 60 mm",
    layerHeight: "0.1mm",
    technology: "SLS",
    postProcessing: ["Medical-grade finishing", "Biocompatibility testing"],
    clientCompany: "MedTech Innovations",
  },
];
