export interface QuoteInput {
  // Dimensions (in mm)
  length?: number;
  width?: number;
  height?: number;
  volume?: number; // Calculated or from file
  
  // Material
  material: string;
  
  // Print settings
  infill: number; // 0-100%
  layerHeight: number; // in mm (0.1, 0.2, 0.3, etc.)
  
  // Quantity
  quantity: number;
  
  // Finishing
  finish: "as-printed" | "sanded" | "painted" | "polished";
  
  // Options
  rush: boolean;
}

export interface QuoteBreakdown {
  materialCost: number;
  timeCost: number;
  finishingCost: number;
  shippingCost: number;
  subtotal: number;
  bulkDiscount: number;
  rushSurcharge: number;
  total: number;
}

export interface Material {
  id: string;
  name: string;
  basePricePerCm3: number; // Price per cm³
  printSpeed: number; // mm/s
  layerHeightOptions: number[]; // Available layer heights
}

export const materials: Material[] = [
  {
    id: "pla",
    name: "PLA",
    basePricePerCm3: 0.05,
    printSpeed: 60,
    layerHeightOptions: [0.1, 0.2, 0.25, 0.3],
  },
  {
    id: "abs",
    name: "ABS",
    basePricePerCm3: 0.06,
    printSpeed: 50,
    layerHeightOptions: [0.1, 0.2, 0.25, 0.3],
  },
  {
    id: "petg",
    name: "PETG",
    basePricePerCm3: 0.07,
    printSpeed: 50,
    layerHeightOptions: [0.1, 0.2, 0.25, 0.3],
  },
  {
    id: "resin",
    name: "Resin",
    basePricePerCm3: 0.15,
    printSpeed: 30,
    layerHeightOptions: [0.05, 0.1, 0.15, 0.2],
  },
  {
    id: "nylon",
    name: "Nylon",
    basePricePerCm3: 0.12,
    printSpeed: 40,
    layerHeightOptions: [0.1, 0.2, 0.25],
  },
  {
    id: "carbon-fiber",
    name: "Carbon Fiber Nylon",
    basePricePerCm3: 0.25,
    printSpeed: 35,
    layerHeightOptions: [0.1, 0.2, 0.25],
  },
];

export const finishOptions = [
  { id: "as-printed", name: "As Printed", priceMultiplier: 1.0 },
  { id: "sanded", name: "Sanded", priceMultiplier: 1.2 },
  { id: "painted", name: "Painted", priceMultiplier: 1.5 },
  { id: "polished", name: "Polished", priceMultiplier: 2.0 },
];

export function calculateVolume(
  length: number,
  width: number,
  height: number
): number {
  // Convert mm³ to cm³
  return (length * width * height) / 1000;
}

export function calculatePrintTime(
  volume: number,
  material: Material,
  layerHeight: number,
  infill: number
): number {
  // Estimate print time in hours
  // Simplified calculation based on volume, layer height, and infill
  const baseTime = volume / (material.printSpeed * layerHeight * 10); // hours
  const infillMultiplier = 0.5 + (infill / 100) * 0.5; // 0.5 to 1.0
  return baseTime * infillMultiplier;
}

export function calculateQuote(input: QuoteInput): QuoteBreakdown {
  const material = materials.find((m) => m.id === input.material);
  if (!material) {
    throw new Error("Invalid material");
  }

  // Calculate volume if not provided
  const volume =
    input.volume ||
    (input.length && input.width && input.height
      ? calculateVolume(input.length, input.width, input.height)
      : 0);

  if (volume === 0) {
    return {
      materialCost: 0,
      timeCost: 0,
      finishingCost: 0,
      shippingCost: 0,
      subtotal: 0,
      bulkDiscount: 0,
      rushSurcharge: 0,
      total: 0,
    };
  }

  // Material cost
  const materialCostPerUnit = volume * material.basePricePerCm3;
  const materialCost = materialCostPerUnit * input.quantity;

  // Time cost (machine time + labor)
  const printTime = calculatePrintTime(
    volume,
    material,
    input.layerHeight,
    input.infill
  );
  const machineRate = 5; // $/hour
  const laborRate = 15; // $/hour
  const timeCostPerUnit = printTime * (machineRate + laborRate);
  const timeCost = timeCostPerUnit * input.quantity;

  // Finishing cost
  const finish = finishOptions.find((f) => f.id === input.finish);
  const finishMultiplier = finish?.priceMultiplier || 1.0;
  const finishingCost = materialCost * (finishMultiplier - 1.0);

  // Shipping cost (flat rate for now)
  const shippingCost = input.quantity > 1 ? 15 + (input.quantity - 1) * 5 : 15;

  // Subtotal
  const subtotal = materialCost + timeCost + finishingCost + shippingCost;

  // Bulk discount
  let bulkDiscount = 0;
  if (input.quantity >= 50) {
    bulkDiscount = subtotal * 0.2; // 20% off
  } else if (input.quantity >= 20) {
    bulkDiscount = subtotal * 0.15; // 15% off
  } else if (input.quantity >= 10) {
    bulkDiscount = subtotal * 0.1; // 10% off
  } else if (input.quantity >= 5) {
    bulkDiscount = subtotal * 0.05; // 5% off
  }

  // Rush surcharge
  const rushSurcharge = input.rush ? subtotal * 0.5 : 0; // 50% surcharge

  // Total
  const total = subtotal - bulkDiscount + rushSurcharge;

  return {
    materialCost: Math.round(materialCost * 100) / 100,
    timeCost: Math.round(timeCost * 100) / 100,
    finishingCost: Math.round(finishingCost * 100) / 100,
    shippingCost: Math.round(shippingCost * 100) / 100,
    subtotal: Math.round(subtotal * 100) / 100,
    bulkDiscount: Math.round(bulkDiscount * 100) / 100,
    rushSurcharge: Math.round(rushSurcharge * 100) / 100,
    total: Math.round(total * 100) / 100,
  };
}

// Parse STL file to extract dimensions (simplified)
export async function parseSTLDimensions(file: File): Promise<{
  length: number;
  width: number;
  height: number;
  volume: number;
}> {
  // This is a simplified parser - in production, use a proper STL parser library
  const arrayBuffer = await file.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);
  
  // STL files can be ASCII or binary
  // For now, return placeholder values
  // In production, implement proper STL parsing
  return {
    length: 100,
    width: 100,
    height: 100,
    volume: 1000,
  };
}

// Parse OBJ file to extract dimensions (simplified)
export async function parseOBJDimensions(file: File): Promise<{
  length: number;
  width: number;
  height: number;
  volume: number;
}> {
  // This is a simplified parser - in production, use a proper OBJ parser library
  const text = await file.text();
  
  // Parse OBJ vertices to calculate bounding box
  const vertices: number[][] = [];
  const lines = text.split("\n");
  
  for (const line of lines) {
    if (line.startsWith("v ")) {
      const parts = line.trim().split(/\s+/);
      if (parts.length >= 4) {
        vertices.push([
          parseFloat(parts[1]),
          parseFloat(parts[2]),
          parseFloat(parts[3]),
        ]);
      }
    }
  }
  
  if (vertices.length === 0) {
    return { length: 100, width: 100, height: 100, volume: 1000 };
  }
  
  // Calculate bounding box
  let minX = Infinity,
    maxX = -Infinity;
  let minY = Infinity,
    maxY = -Infinity;
  let minZ = Infinity,
    maxZ = -Infinity;
  
  for (const [x, y, z] of vertices) {
    minX = Math.min(minX, x);
    maxX = Math.max(maxX, x);
    minY = Math.min(minY, y);
    maxY = Math.max(maxY, y);
    minZ = Math.min(minZ, z);
    maxZ = Math.max(maxZ, z);
  }
  
  const length = Math.abs(maxX - minX) * 10; // Convert to mm (assuming OBJ is in cm)
  const width = Math.abs(maxY - minY) * 10;
  const height = Math.abs(maxZ - minZ) * 10;
  const volume = (length * width * height) / 1000; // Convert to cm³
  
  return { length, width, height, volume };
}

