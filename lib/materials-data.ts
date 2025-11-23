export interface MaterialProperty {
  id: string;
  name: string;
  description: string;
  strength: number; // 0-100
  flexibility: number; // 0-100
  temperatureResistance: number; // °C
  cost: number; // $ per cm³
  printTime: number; // hours per 100cm³
  useCases: string[];
  image?: string;
}

export const materials: MaterialProperty[] = [
  {
    id: "pla",
    name: "PLA",
    description:
      "Polylactic Acid - the most popular 3D printing material, perfect for beginners and decorative items.",
    strength: 60,
    flexibility: 20,
    temperatureResistance: 60,
    cost: 0.05,
    printTime: 2.5,
    useCases: [
      "Prototypes",
      "Decorative items",
      "Educational projects",
      "Low-stress applications",
    ],
  },
  {
    id: "abs",
    name: "ABS",
    description:
      "Acrylonitrile Butadiene Styrene - durable and impact-resistant, ideal for functional parts.",
    strength: 75,
    flexibility: 40,
    temperatureResistance: 100,
    cost: 0.06,
    printTime: 3.0,
    useCases: [
      "Functional parts",
      "Automotive components",
      "Enclosures",
      "Mechanical assemblies",
    ],
  },
  {
    id: "petg",
    name: "PETG",
    description:
      "Polyethylene Terephthalate Glycol - combines the ease of PLA with the strength of ABS.",
    strength: 70,
    flexibility: 50,
    temperatureResistance: 85,
    cost: 0.07,
    printTime: 2.8,
    useCases: [
      "Food-safe containers",
      "Outdoor applications",
      "Mechanical parts",
      "Transparent parts",
    ],
  },
  {
    id: "resin",
    name: "Resin",
    description:
      "UV-curable resin - produces extremely smooth, detailed prints perfect for miniatures and jewelry.",
    strength: 80,
    flexibility: 10,
    temperatureResistance: 50,
    cost: 0.15,
    printTime: 1.5,
    useCases: [
      "Miniatures",
      "Jewelry",
      "High-detail models",
      "Dental applications",
    ],
  },
  {
    id: "nylon",
    name: "Nylon",
    description:
      "Strong, flexible, and chemical-resistant - excellent for industrial applications.",
    strength: 85,
    flexibility: 70,
    temperatureResistance: 120,
    cost: 0.12,
    printTime: 4.0,
    useCases: [
      "Gears and bearings",
      "Industrial parts",
      "Wear-resistant components",
      "Functional prototypes",
    ],
  },
  {
    id: "carbon-fiber",
    name: "Carbon Fiber Nylon",
    description:
      "Nylon reinforced with carbon fiber - maximum strength and stiffness for demanding applications.",
    strength: 95,
    flexibility: 30,
    temperatureResistance: 130,
    cost: 0.25,
    printTime: 4.5,
    useCases: [
      "Aerospace components",
      "High-performance parts",
      "Racing components",
      "Structural applications",
    ],
  },
];

export function getMaterialById(id: string): MaterialProperty | undefined {
  return materials.find((m) => m.id === id);
}

export function filterMaterialsByProperty(
  property: "strength" | "flexibility" | "temperatureResistance" | "cost",
  min: number,
  max: number
): MaterialProperty[] {
  return materials.filter((m) => {
    const value = m[property];
    return value >= min && value <= max;
  });
}

export function getRecommendedMaterials(
  requirements: {
    strength?: number;
    flexibility?: number;
    temperatureResistance?: number;
    maxCost?: number;
  }
): MaterialProperty[] {
  return materials.filter((m) => {
    if (requirements.strength && m.strength < requirements.strength) return false;
    if (requirements.flexibility && m.flexibility < requirements.flexibility)
      return false;
    if (
      requirements.temperatureResistance &&
      m.temperatureResistance < requirements.temperatureResistance
    )
      return false;
    if (requirements.maxCost && m.cost > requirements.maxCost) return false;
    return true;
  });
}

