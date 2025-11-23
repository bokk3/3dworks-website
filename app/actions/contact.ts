"use server";

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
const ALLOWED_FILE_TYPES = [".stl", ".obj", ".step", ".stp"];
const MIN_MESSAGE_LENGTH = 20;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function submitContactForm(formData: FormData) {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const projectType = formData.get("projectType");
  const message = formData.get("message") as string;
  const file = formData.get("file") as File | null;

  // Server-side validation
  if (!name || typeof name !== "string" || !name.trim()) {
    return { error: "Name is required." };
  }

  if (!email || typeof email !== "string" || !email.trim()) {
    return { error: "Email is required." };
  }

  if (!emailRegex.test(email)) {
    return { error: "Please enter a valid email address." };
  }

  if (!message || typeof message !== "string" || !message.trim()) {
    return { error: "Message is required." };
  }

  if (message.trim().length < MIN_MESSAGE_LENGTH) {
    return {
      error: `Message must be at least ${MIN_MESSAGE_LENGTH} characters long.`,
    };
  }

  // File validation
  if (file && file.size > 0) {
    const fileExtension =
      "." + file.name.split(".").pop()?.toLowerCase() || "";
    if (!ALLOWED_FILE_TYPES.includes(fileExtension)) {
      return {
        error: `File type not allowed. Please upload ${ALLOWED_FILE_TYPES.join(", ")} files.`,
      };
    }

    if (file.size > MAX_FILE_SIZE) {
      return {
        error: `File size must be less than ${MAX_FILE_SIZE / (1024 * 1024)}MB.`,
      };
    }
  }

  const complexity = formData.get("complexity");
  const material = formData.get("material");
  const quantity = formData.get("quantity");
  const deliveryDate = formData.get("deliveryDate");
  const files = formData.getAll("files") as File[];

  // Log data (mock email sending)
  console.log("--- Contact Form Submission ---");
  console.log("Name:", name);
  console.log("Email:", email);
  console.log("Project Type:", projectType);
  console.log("Complexity:", complexity);
  console.log("Material:", material);
  console.log("Quantity:", quantity);
  console.log("Delivery Date:", deliveryDate);
  console.log("Message:", message);

  if (files && files.length > 0) {
    files.forEach((file, index) => {
      if (file.size > 0) {
        console.log(`File ${index + 1}:`, file.name, `(${file.size} bytes)`);
      }
    });
    // In a real app, upload to S3/Blob storage here
  }

  return { success: "Message sent successfully! We'll get back to you soon." };
}
