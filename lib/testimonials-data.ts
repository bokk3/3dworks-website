export interface TestimonialItem {
  id: string;
  clientName: string;
  company: string;
  projectType: string;
  industry: "aerospace" | "automotive" | "medical" | "consumer" | "other";
  testimonial: string;
  rating: number; // 1-5
  clientPhoto?: string;
  companyLogo?: string;
}

export const testimonials: TestimonialItem[] = [
  {
    id: "1",
    clientName: "Sarah Chen",
    company: "Aerospace Solutions Inc.",
    projectType: "Prototype Development",
    industry: "aerospace",
    testimonial:
      "3Dworks delivered exceptional results on our bracket prototype. The precision and attention to detail exceeded our expectations. Their expertise in aerospace-grade materials and tight tolerances made them the perfect partner for our project.",
    rating: 5,
    companyLogo:
      "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200&h=200&fit=crop",
  },
  {
    id: "2",
    clientName: "Michael Rodriguez",
    company: "Performance Auto Engineering",
    projectType: "Custom Parts",
    industry: "automotive",
    testimonial:
      "The custom intake manifold they printed for our testing was flawless. The high-temperature resin handled engine bay conditions perfectly, and the turnaround time was impressive. We'll definitely be working with them again.",
    rating: 5,
    companyLogo:
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=200&h=200&fit=crop",
  },
  {
    id: "3",
    clientName: "Dr. Emily Watson",
    company: "MedTech Innovations",
    projectType: "Medical Device Prototype",
    industry: "medical",
    testimonial:
      "The custom-fit splint prototype was a game-changer for our patient. The precision and biocompatibility of the materials were outstanding. 3Dworks understands the unique requirements of medical applications.",
    rating: 5,
    companyLogo:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=200&h=200&fit=crop",
  },
  {
    id: "4",
    clientName: "James Park",
    company: "Modern Architecture Studio",
    projectType: "Architectural Model",
    industry: "other",
    testimonial:
      "The architectural model they created was incredibly detailed and accurate. It helped us win the client presentation. The quality of the finish and attention to scale was remarkable. Highly professional service.",
    rating: 5,
    companyLogo:
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=200&h=200&fit=crop",
  },
  {
    id: "5",
    clientName: "Lisa Thompson",
    company: "Industrial Solutions Group",
    projectType: "Functional Parts",
    industry: "consumer",
    testimonial:
      "We needed replacement gears for vintage machinery, and 3Dworks delivered exactly what we needed. The parts fit perfectly and have been running smoothly for months. Fast turnaround and excellent communication throughout.",
    rating: 5,
    companyLogo:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=200&h=200&fit=crop",
  },
  {
    id: "6",
    clientName: "David Kim",
    company: "Racing Drones Co.",
    projectType: "Custom Manufacturing",
    industry: "consumer",
    testimonial:
      "The drone chassis they printed is incredibly lightweight yet strong. The design optimization they suggested improved our performance significantly. Great partnership and technical expertise.",
    rating: 5,
    companyLogo:
      "https://images.unsplash.com/photo-1579829366248-204fe8413f31?w=200&h=200&fit=crop",
  },
];

