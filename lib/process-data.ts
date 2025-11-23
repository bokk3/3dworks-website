import {
  MessageSquare,
  PenTool,
  Layers,
  Printer,
  Package,
  CheckCircle,
} from "lucide-react";

export interface ProcessStep {
  id: number;
  title: string;
  description: string;
  icon: any; // Lucide icon component
  videoUrl?: string;
  animationUrl?: string; // For GIFs
  thumbnailImage?: string;
}

export const processSteps: ProcessStep[] = [
  {
    id: 1,
    title: "Consultation",
    description:
      "We discuss your project requirements, material needs, and timeline to ensure the best results.",
    icon: MessageSquare,
  },
  {
    id: 2,
    title: "Design & CAD",
    description:
      "Our engineers review your files or create custom 3D models optimized for additive manufacturing.",
    icon: PenTool,
  },
  {
    id: 3,
    title: "Material Selection",
    description:
      "Choose from our wide range of industrial-grade materials suited for your specific application.",
    icon: Layers,
  },
  {
    id: 4,
    title: "3D Printing",
    description:
      "Production begins using our state-of-the-art FDM or SLA printers with precise layer resolution.",
    icon: Printer,
  },
  {
    id: 5,
    title: "Post-Processing",
    description:
      "Parts are cleaned, cured, sanded, and finished to meet your exact aesthetic and functional standards.",
    icon: Package,
  },
  {
    id: 6,
    title: "Quality Control",
    description:
      "Final inspection ensures dimensional accuracy and structural integrity before shipping.",
    icon: CheckCircle,
  },
];
