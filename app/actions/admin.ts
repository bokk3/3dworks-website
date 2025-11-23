"use server";

import { cookies } from "next/headers";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";

export async function verifyAdminPassword(password: string): Promise<boolean> {
  return password === ADMIN_PASSWORD;
}

export async function setAdminSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set("admin_session", "authenticated", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24, // 24 hours
  });
}

export async function checkAdminSession(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");
  return session?.value === "authenticated";
}

export async function clearAdminSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete("admin_session");
}

// In a real application, these would fetch from a database
// For now, we'll use localStorage on the client side
export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  files?: string[];
  projectType?: string;
  complexity?: string;
  material?: string;
  quantity?: string;
  deliveryDate?: string;
  timestamp: string;
  status: "new" | "replied";
}

export interface QuoteRequest {
  id: string;
  length?: number;
  width?: number;
  height?: number;
  material: string;
  quantity: number;
  finish: string;
  rush: boolean;
  estimatedPrice: number;
  timestamp: string;
  status: "new" | "replied";
}

