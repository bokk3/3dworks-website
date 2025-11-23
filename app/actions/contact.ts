"use server";

export async function submitContactForm(formData: FormData) {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const name = formData.get("name");
  const email = formData.get("email");
  const projectType = formData.get("projectType");
  const message = formData.get("message");
  const file = formData.get("file") as File | null;

  // Server-side validation
  if (!name || !email || !message) {
    return { error: "Please fill in all required fields." };
  }

  // Log data (mock email sending)
  console.log("--- Contact Form Submission ---");
  console.log("Name:", name);
  console.log("Email:", email);
  console.log("Project Type:", projectType);
  console.log("Message:", message);

  if (file && file.size > 0) {
    console.log("File Uploaded:", file.name, `(${file.size} bytes)`);
    // In a real app, upload to S3/Blob storage here
  }

  return { success: "Message sent successfully! We'll get back to you soon." };
}
