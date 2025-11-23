"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  Upload,
  Send,
  CheckCircle,
  AlertCircle,
  Loader2,
  X,
} from "lucide-react";
import { submitContactForm } from "@/app/actions/contact";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface ValidationErrors {
  name?: string;
  email?: string;
  message?: string;
  file?: string;
}

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
const ALLOWED_FILE_TYPES = [".stl", ".obj", ".step", ".stp"];
const MIN_MESSAGE_LENGTH = 20;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ContactForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState<string | false>(false);
  const [error, setError] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const formRef = useRef<HTMLFormElement>(null);

  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case "name":
        if (!value.trim()) {
          return "Name is required";
        }
        return undefined;
      case "email":
        if (!value.trim()) {
          return "Email is required";
        }
        if (!emailRegex.test(value)) {
          return "Please enter a valid email address";
        }
        return undefined;
      case "message":
        if (!value.trim()) {
          return "Message is required";
        }
        if (value.trim().length < MIN_MESSAGE_LENGTH) {
          return `Message must be at least ${MIN_MESSAGE_LENGTH} characters`;
        }
        return undefined;
      default:
        return undefined;
    }
  };

  const validateFile = (file: File): string | undefined => {
    const fileExtension = "." + file.name.split(".").pop()?.toLowerCase();
    if (!ALLOWED_FILE_TYPES.includes(fileExtension)) {
      return `File type not allowed. Please upload ${ALLOWED_FILE_TYPES.join(", ")} files`;
    }
    if (file.size > MAX_FILE_SIZE) {
      return `File size must be less than ${MAX_FILE_SIZE / (1024 * 1024)}MB`;
    }
    return undefined;
  };

  const validateForm = (): boolean => {
    const errors: ValidationErrors = {};
    
    errors.name = validateField("name", formData.name);
    errors.email = validateField("email", formData.email);
    errors.message = validateField("message", formData.message);
    
    if (file) {
      errors.file = validateFile(file);
    }

    setValidationErrors(errors);
    return !errors.name && !errors.email && !errors.message && !errors.file;
  };

  const handleInputChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (validationErrors[name as keyof ValidationErrors]) {
      setValidationErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleInputBlur = (name: string, value: string) => {
    const error = validateField(name, value);
    setValidationErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      const fileError = validateFile(selectedFile);
      
      if (fileError) {
        setValidationErrors((prev) => ({ ...prev, file: fileError }));
        setFile(null);
        e.target.value = ""; // Clear the input
      } else {
        setFile(selectedFile);
        setValidationErrors((prev) => ({ ...prev, file: undefined }));
      }
    }
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    
    // Validate all fields
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setError("");
    setSuccess(false);

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("message", formData.message);
    formDataToSend.append("projectType", (e.currentTarget.elements.namedItem("projectType") as HTMLSelectElement)?.value || "prototyping");

    if (file) {
      formDataToSend.append("file", file);
    }

    try {
      const result = await submitContactForm(formDataToSend);

      if (result.error) {
        setError(result.error);
      } else {
        setSuccess(result.success || "Message sent successfully! We'll get back to you soon.");
        formRef.current?.reset();
        setFile(null);
        setFormData({ name: "", email: "", message: "" });
        setValidationErrors({});
      }
    } catch (e) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  const isFormValid = 
    formData.name.trim() !== "" &&
    formData.email.trim() !== "" &&
    emailRegex.test(formData.email) &&
    formData.message.trim().length >= MIN_MESSAGE_LENGTH &&
    (!file || !validationErrors.file);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="glass-card p-8 rounded-2xl"
    >
      <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Name
            </label>
            <Input
              id="name"
              name="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              onBlur={(e) => handleInputBlur("name", e.target.value)}
              className={cn(
                "bg-white/5 border-white/10",
                validationErrors.name && "border-red-400"
              )}
            />
            {validationErrors.name && (
              <p className="text-sm text-red-400">{validationErrors.name}</p>
            )}
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              onBlur={(e) => handleInputBlur("email", e.target.value)}
              className={cn(
                "bg-white/5 border-white/10",
                validationErrors.email && "border-red-400"
              )}
            />
            {validationErrors.email && (
              <p className="text-sm text-red-400">{validationErrors.email}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="projectType" className="text-sm font-medium">
            Project Type
          </label>
          <Select name="projectType" defaultValue="prototyping">
            <SelectTrigger className="bg-white/5 border-white/10">
              <SelectValue placeholder="Select project type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="prototyping">Rapid Prototyping</SelectItem>
              <SelectItem value="custom-parts">Custom Parts</SelectItem>
              <SelectItem value="design">Design Services</SelectItem>
              <SelectItem value="quote">Quote Request</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label htmlFor="message" className="text-sm font-medium">
            Message
          </label>
          <Textarea
            id="message"
            name="message"
            placeholder="Tell us about your project requirements..."
            value={formData.message}
            onChange={(e) => handleInputChange("message", e.target.value)}
            onBlur={(e) => handleInputBlur("message", e.target.value)}
            className={cn(
              "min-h-[120px] bg-white/5 border-white/10",
              validationErrors.message && "border-red-400"
            )}
          />
          {validationErrors.message && (
            <p className="text-sm text-red-400">{validationErrors.message}</p>
          )}
          {!validationErrors.message && formData.message.length > 0 && (
            <p className="text-xs text-muted-foreground">
              {formData.message.length}/{MIN_MESSAGE_LENGTH} characters minimum
            </p>
          )}
        </div>

        {/* File Upload UI */}
        <div className="space-y-2">
          <label className="text-sm font-medium">
            Upload 3D Model (Optional)
          </label>
          <div
            className={cn(
              "relative border-2 border-dashed rounded-lg p-6 transition-colors hover:border-cyan-500/50 hover:bg-cyan-500/5 text-center cursor-pointer group",
              validationErrors.file
                ? "border-red-400"
                : "border-white/10"
            )}
          >
            <input
              type="file"
              accept=".stl,.obj,.step,.stp"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            <div className="flex flex-col items-center gap-2 text-muted-foreground group-hover:text-cyan-500 transition-colors">
              <Upload size={24} />
              <span className="text-sm">
                {file ? file.name : "Drop STL/OBJ file here or click to upload"}
              </span>
              <span className="text-xs text-muted-foreground">
                Max size: {MAX_FILE_SIZE / (1024 * 1024)}MB
              </span>
            </div>
          </div>
          {validationErrors.file && (
            <p className="text-sm text-red-400">{validationErrors.file}</p>
          )}
          {file && !validationErrors.file && (
            <div className="flex items-center justify-between text-xs bg-cyan-500/10 text-cyan-500 px-3 py-2 rounded-md">
              <span className="truncate max-w-[200px]">
                {file.name} ({(file.size / (1024 * 1024)).toFixed(2)} MB)
              </span>
              <button
                type="button"
                onClick={() => {
                  setFile(null);
                  setValidationErrors((prev) => ({ ...prev, file: undefined }));
                }}
                className="hover:text-cyan-400"
              >
                <X size={14} />
              </button>
            </div>
          )}
        </div>

        {/* Status Messages */}
        {error && (
          <div className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 p-3 rounded-md">
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="flex items-center gap-2 text-green-400 text-sm bg-green-500/10 p-3 rounded-md">
            <CheckCircle size={16} />
            <span>{typeof success === "string" ? success : "Message sent successfully!"}</span>
          </div>
        )}

        <Button
          type="submit"
          disabled={isLoading || !isFormValid}
          className="w-full bg-cyan-500 hover:bg-cyan-600 text-white shadow-lg shadow-cyan-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...
            </>
          ) : (
            <>
              Send Message <Send className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </form>
    </motion.div>
  );
}
