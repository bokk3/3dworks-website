import {
  Printer,
  Settings,
  PenTool,
  Package,
  Layers,
  Scan,
} from "lucide-react";

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: any; // Lucide icon component
  specs: string[];
}

export const services: ServiceItem[] = [
  {
    id: "prototyping",
    title: "Rapid Prototyping",
    description:
      "Turn your concepts into physical models in hours, not weeks. Iterate faster with high-fidelity prototypes.",
    icon: Printer,
    specs: ["24h Turnaround", "High Precision", "Multiple Materials"],
  },
  {
    id: "manufacturing",
    title: "Custom Manufacturing",
    description:
      "Small-batch production runs for end-use parts. Industrial-grade materials for functional applications.",
    icon: Settings,
    specs: ["Batch Production", "Industrial Grade", "Quality Control"],
  },
  {
    id: "design",
    title: "Design & Modeling",
    description:
      "Expert CAD design services to optimize your parts for additive manufacturing (DfAM).",
    icon: PenTool,
    specs: ["CAD Modeling", "DfAM Optimization", "File Repair"],
  },
  {
    id: "materials",
    title: "Material Consultation",
    description:
      "Guidance on selecting the perfect material for your specific application requirements.",
    icon: Layers,
    specs: ["Material Selection", "Testing", "Performance Analysis"],
  },
  {
    id: "finishing",
    title: "Post-Processing",
    description:
      "Professional finishing services including sanding, painting, and smoothing for a production look.",
    icon: Package,
    specs: ["Sanding & Painting", "Vapor Smoothing", "Assembly"],
  },
  {
    id: "reverse-engineering",
    title: "Reverse Engineering",
    description:
      "Recreate legacy parts or improve existing designs by converting physical objects into digital CAD models.",
    icon: Scan,
    specs: ["3D Scanning", "CAD Reconstruction", "Design Improvement"],
  },
];
