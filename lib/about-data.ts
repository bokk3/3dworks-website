import {
  CheckCircle,
  Target,
  Package,
  Clock,
  Printer,
  Zap,
  Layers,
} from "lucide-react";

export interface StatItem {
  id: string;
  value: string;
  label: string;
  icon: any;
  description?: string;
}

export interface TechnologyItem {
  id: string;
  name: string;
  fullName: string;
  description: string;
  icon: any;
  buildVolume: string;
  resolution: string;
  precision: string;
  materials: string[];
}

export interface MaterialItem {
  id: string;
  name: string;
  type: string;
  properties: string[];
}

export const companyStory = {
  heading: "Precision Meets Innovation",
  paragraphs: [
    "With over a decade of expertise in 3D printing technology, 3Dworks has established itself as a leader in precision additive manufacturing. We combine cutting-edge equipment with deep technical knowledge to deliver exceptional results for clients across diverse industries.",
    "Our commitment to quality and precision is evident in every project we undertake. From aerospace components requiring the highest tolerances to medical devices demanding biocompatibility, we leverage advanced 3D printing technologies to meet the most stringent requirements.",
    "We serve clients in aerospace, automotive, medical, and consumer products industries, providing tailored solutions that bridge the gap between digital design and physical reality. Our state-of-the-art facility houses multiple 3D printing technologies, ensuring we can match the perfect process to your specific needs.",
  ],
  industries: [
    "Aerospace",
    "Automotive",
    "Medical",
    "Consumer Products",
  ],
};

export const stats: StatItem[] = [
  {
    id: "projects",
    value: "1000+",
    label: "Projects Completed",
    icon: CheckCircle,
    description: "Successfully delivered projects",
  },
  {
    id: "precision",
    value: "0.01mm",
    label: "Precision",
    icon: Target,
    description: "Layer resolution capability",
  },
  {
    id: "materials",
    value: "15+",
    label: "Material Types",
    icon: Package,
    description: "Different materials available",
  },
  {
    id: "turnaround",
    value: "24h",
    label: "Turnaround Available",
    icon: Clock,
    description: "Rapid prototyping service",
  },
];

export const technologies: TechnologyItem[] = [
  {
    id: "fdm",
    name: "FDM",
    fullName: "Fused Deposition Modeling",
    description:
      "Ideal for functional prototypes and end-use parts. Excellent strength and durability with a wide range of materials.",
    icon: Printer,
    buildVolume: "300 × 300 × 300 mm",
    resolution: "0.1 - 0.3 mm",
    precision: "±0.2 mm",
    materials: ["PLA", "ABS", "PETG", "TPU", "Nylon", "PC"],
  },
  {
    id: "sla",
    name: "SLA",
    fullName: "Stereolithography",
    description:
      "Ultra-high resolution printing for detailed prototypes, jewelry, and dental applications. Smooth surface finish.",
    icon: Zap,
    buildVolume: "145 × 145 × 175 mm",
    resolution: "0.025 - 0.1 mm",
    precision: "±0.05 mm",
    materials: ["Standard Resin", "Tough Resin", "Clear Resin", "Dental Resin"],
  },
  {
    id: "sls",
    name: "SLS",
    fullName: "Selective Laser Sintering",
    description:
      "Industrial-grade parts with no support structures needed. Excellent for complex geometries and functional components.",
    icon: Layers,
    buildVolume: "300 × 300 × 300 mm",
    resolution: "0.08 - 0.15 mm",
    precision: "±0.1 mm",
    materials: ["Nylon PA12", "Nylon PA11", "TPU", "Glass-filled Nylon"],
  },
];

export const materials: MaterialItem[] = [
  {
    id: "pla",
    name: "PLA",
    type: "Thermoplastic",
    properties: ["Biodegradable", "Easy to print", "Good detail", "Rigid"],
  },
  {
    id: "abs",
    name: "ABS",
    type: "Thermoplastic",
    properties: ["Durable", "Heat resistant", "Impact resistant", "Post-processable"],
  },
  {
    id: "petg",
    name: "PETG",
    type: "Thermoplastic",
    properties: ["Chemical resistant", "Transparent", "Food safe", "Strong"],
  },
  {
    id: "nylon",
    name: "Nylon",
    type: "Thermoplastic",
    properties: ["Flexible", "Wear resistant", "High strength", "Chemical resistant"],
  },
  {
    id: "resin",
    name: "Resin",
    type: "Photopolymer",
    properties: ["High detail", "Smooth finish", "Isotropic", "Variety of properties"],
  },
];

