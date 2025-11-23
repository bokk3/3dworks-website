"use server";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function subscribeNewsletter(formData: FormData) {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const email = formData.get("email") as string;

  // Validation
  if (!email || typeof email !== "string" || !email.trim()) {
    return { error: "Email is required." };
  }

  if (!emailRegex.test(email)) {
    return { error: "Please enter a valid email address." };
  }

  // In a real app, save to database here
  console.log("--- Newsletter Subscription ---");
  console.log("Email:", email);
  console.log("Subscribed at:", new Date().toISOString());

  return {
    success: "Thank you for subscribing! Check your inbox for project inspiration and 3D printing tips.",
  };
}

