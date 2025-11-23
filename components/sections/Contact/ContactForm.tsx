"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  Send,
  CheckCircle,
  AlertCircle,
  Loader2,
  X,
  File,
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
import { analytics } from "@/lib/analytics";

interface ValidationErrors {
  name?: string;
  email?: string;
  message?: string;
  files?: string;
  quantity?: string;
  deliveryDate?: string;
}

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
const MAX_FILES = 5;
const ALLOWED_FILE_TYPES = [".stl", ".obj", ".step", ".stp"];
const MIN_MESSAGE_LENGTH = 20;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const materials = [
  "PLA",
  "ABS",
  "PETG",
  "Resin",
  "Nylon",
  "Carbon Fiber Nylon",
  "TPU",
  "Tough PLA",
  "High-Temp Resin",
  "Not Sure",
];

const complexities = [
  { value: "simple", label: "Simple" },
  { value: "medium", label: "Medium" },
  { value: "complex", label: "Complex" },
];

export function ContactForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState<string | false>(false);
  const [error, setError] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropZoneRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "prototyping",
    message: "",
    complexity: "medium",
    material: "",
    quantity: "",
    deliveryDate: "",
  });
  const formRef = useRef<HTMLFormElement>(null);

  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case "name":
        if (!value.trim()) return "Name is required";
        return undefined;
      case "email":
        if (!value.trim()) return "Email is required";
        if (!emailRegex.test(value)) return "Please enter a valid email address";
        return undefined;
      case "message":
        if (!value.trim()) return "Message is required";
        if (value.trim().length < MIN_MESSAGE_LENGTH)
          return `Message must be at least ${MIN_MESSAGE_LENGTH} characters`;
        return undefined;
      case "quantity":
        if (value && (isNaN(Number(value)) || Number(value) < 1))
          return "Quantity must be a positive number";
        return undefined;
      case "deliveryDate":
        if (value) {
          const date = new Date(value);
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          if (date < today) return "Delivery date cannot be in the past";
        }
        return undefined;
      default:
        return undefined;
    }
  };

  const validateFiles = (fileList: File[]): string | undefined => {
    if (fileList.length > MAX_FILES) {
      return `Maximum ${MAX_FILES} files allowed`;
    }
    for (const file of fileList) {
      const fileExtension = "." + file.name.split(".").pop()?.toLowerCase();
      if (!ALLOWED_FILE_TYPES.includes(fileExtension)) {
        return `File type not allowed. Please upload ${ALLOWED_FILE_TYPES.join(", ")} files`;
      }
      if (file.size > MAX_FILE_SIZE) {
        return `File size must be less than ${MAX_FILE_SIZE / (1024 * 1024)}MB`;
      }
    }
    return undefined;
  };

  const handleInputChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (validationErrors[name as keyof ValidationErrors]) {
      setValidationErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleInputBlur = (name: string, value: string) => {
    const error = validateField(name, value);
    setValidationErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    const validFiles = droppedFiles.filter((file) => {
      const ext = "." + file.name.split(".").pop()?.toLowerCase();
      return ALLOWED_FILE_TYPES.includes(ext) && file.size <= MAX_FILE_SIZE;
    });

    if (validFiles.length !== droppedFiles.length) {
      setValidationErrors((prev) => ({
        ...prev,
        files: "Some files were invalid. Only STL, OBJ, STEP files under 50MB are allowed.",
      }));
    }

    const newFiles = [...files, ...validFiles].slice(0, MAX_FILES);
    setFiles(newFiles);
    const fileError = validateFiles(newFiles);
    setValidationErrors((prev) => ({ ...prev, files: fileError }));
  }, [files]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      const newFiles = [...files, ...selectedFiles].slice(0, MAX_FILES);
      setFiles(newFiles);
      const fileError = validateFiles(newFiles);
      setValidationErrors((prev) => ({ ...prev, files: fileError }));
    }
  };

  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    const fileError = validateFiles(newFiles);
    setValidationErrors((prev) => ({ ...prev, files: fileError }));
  };

  const validateForm = (): boolean => {
    const errors: ValidationErrors = {};
    errors.name = validateField("name", formData.name);
    errors.email = validateField("email", formData.email);
    errors.message = validateField("message", formData.message);
    errors.quantity = validateField("quantity", formData.quantity);
    errors.deliveryDate = validateField("deliveryDate", formData.deliveryDate);
    errors.files = validateFiles(files);

    setValidationErrors(errors);
    return !Object.values(errors).some((error) => error !== undefined);
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setError("");
    setSuccess(false);

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("projectType", formData.projectType);
    formDataToSend.append("message", formData.message);
    formDataToSend.append("complexity", formData.complexity);
    if (formData.material) {
      formDataToSend.append("material", formData.material);
    }
    if (formData.quantity) {
      formDataToSend.append("quantity", formData.quantity);
    }
    if (formData.deliveryDate) {
      formDataToSend.append("deliveryDate", formData.deliveryDate);
    }

    files.forEach((file) => {
      formDataToSend.append("files", file);
      // Track file upload
      analytics.trackFileUpload(
        file.name.split(".").pop() || "unknown",
        file.size
      );
    });

    try {
      const result = await submitContactForm(formDataToSend);

      if (result.error) {
        setError(result.error);
      } else {
        // Track form submission
        const formType =
          formData.projectType === "quote" ? "quote" : "contact";
        analytics.trackFormSubmission(formType);
        setSuccess(result.success || "Message sent successfully! We'll get back to you soon.");
        formRef.current?.reset();
        setFiles([]);
        setFormData({
          name: "",
          email: "",
          projectType: "prototyping",
          message: "",
          complexity: "medium",
          material: "",
          quantity: "",
          deliveryDate: "",
        });
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
    (!files.length || !validationErrors.files) &&
    !validationErrors.quantity &&
    !validationErrors.deliveryDate;

  // Calculate form progress (simple indicator)
  const formProgress = (() => {
    let completed = 0;
    if (formData.name.trim()) completed++;
    if (formData.email.trim() && emailRegex.test(formData.email)) completed++;
    if (formData.message.trim().length >= MIN_MESSAGE_LENGTH) completed++;
    if (formData.projectType) completed++;
    return Math.round((completed / 4) * 100);
  })();

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="glass-card p-8 rounded-2xl"
    >
      {/* Form Progress Indicator */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-muted-foreground">
            Form Progress
          </span>
          <span className="text-sm font-semibold text-cyan-500">{formProgress}%</span>
        </div>
        <div className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${formProgress}%` }}
            transition={{ duration: 0.3 }}
            className="h-full bg-gradient-to-r from-cyan-500 to-purple-500"
          />
        </div>
      </div>

      <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Name *
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
                validationErrors.name
                  ? "border-red-400 focus-visible:ring-red-500/50"
                  : "focus-visible:ring-cyan-500/20"
              )}
            />
            {validationErrors.name && (
              <p className="text-sm text-red-400">{validationErrors.name}</p>
            )}
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email *
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
                validationErrors.email
                  ? "border-red-400 focus-visible:ring-red-500/50"
                  : "focus-visible:ring-cyan-500/20"
              )}
            />
            {validationErrors.email && (
              <p className="text-sm text-red-400">{validationErrors.email}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="projectType" className="text-sm font-medium">
              Project Type
            </label>
            <Select
              name="projectType"
              value={formData.projectType}
              onValueChange={(value) => handleInputChange("projectType", value)}
            >
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
            <label htmlFor="complexity" className="text-sm font-medium">
              Project Complexity
            </label>
            <Select
              value={formData.complexity}
              onValueChange={(value) => handleInputChange("complexity", value)}
            >
              <SelectTrigger className="bg-white/5 border-white/10">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {complexities.map((comp) => (
                  <SelectItem key={comp.value} value={comp.value}>
                    {comp.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="material" className="text-sm font-medium">
              Preferred Material
            </label>
            <Select
              value={formData.material}
              onValueChange={(value) => handleInputChange("material", value)}
            >
              <SelectTrigger className="bg-white/5 border-white/10">
                <SelectValue placeholder="Select material (optional)" />
              </SelectTrigger>
              <SelectContent>
                {materials.map((material) => (
                  <SelectItem key={material} value={material}>
                    {material}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label htmlFor="quantity" className="text-sm font-medium">
              Quantity
            </label>
            <Input
              id="quantity"
              name="quantity"
              type="number"
              min="1"
              placeholder="1"
              value={formData.quantity}
              onChange={(e) => handleInputChange("quantity", e.target.value)}
              onBlur={(e) => handleInputBlur("quantity", e.target.value)}
              className={cn(
                "bg-white/5 border-white/10",
                validationErrors.quantity
                  ? "border-red-400 focus-visible:ring-red-500/50"
                  : "focus-visible:ring-cyan-500/20"
              )}
            />
            {validationErrors.quantity && (
              <p className="text-sm text-red-400">{validationErrors.quantity}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="deliveryDate" className="text-sm font-medium">
            Expected Delivery Date
          </label>
          <Input
            id="deliveryDate"
            name="deliveryDate"
            type="date"
            value={formData.deliveryDate}
            onChange={(e) => handleInputChange("deliveryDate", e.target.value)}
            onBlur={(e) => handleInputBlur("deliveryDate", e.target.value)}
            min={new Date().toISOString().split("T")[0]}
            className={cn(
              "bg-white/5 border-white/10",
              validationErrors.deliveryDate
                ? "border-red-400 focus-visible:ring-red-500/50"
                : "focus-visible:ring-cyan-500/20"
            )}
          />
          {validationErrors.deliveryDate && (
            <p className="text-sm text-red-400">{validationErrors.deliveryDate}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="message" className="text-sm font-medium">
            Message *
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
              validationErrors.message
                ? "border-red-400 focus-visible:ring-red-500/50"
                : "focus-visible:ring-cyan-500/20"
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

        {/* Enhanced File Upload with Drag-and-Drop */}
        <div className="space-y-2">
          <label className="text-sm font-medium">
            Upload 3D Model Files (Optional, Max {MAX_FILES} files)
          </label>
          <div
            ref={dropZoneRef}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={cn(
              "relative border-2 border-dashed rounded-lg p-6 transition-all text-center cursor-pointer group",
              isDragging
                ? "border-cyan-500 bg-cyan-500/10 scale-105"
                : validationErrors.files
                ? "border-red-400 hover:border-red-300"
                : "border-white/10 hover:border-cyan-500/50 hover:bg-cyan-500/5"
            )}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".stl,.obj,.step,.stp"
              multiple
              onChange={handleFileSelect}
              className="hidden"
            />
            <div
              className={cn(
                "flex flex-col items-center gap-2 transition-colors",
                isDragging || validationErrors.files
                  ? "text-cyan-500"
                  : "text-muted-foreground group-hover:text-cyan-500"
              )}
            >
              <Upload size={24} />
              <span className="text-sm">
                {isDragging
                  ? "Drop files here"
                  : files.length > 0
                  ? `${files.length} file(s) selected`
                  : "Drop STL/OBJ/STEP files here or click to upload"}
              </span>
              <span className="text-xs text-muted-foreground">
                Max {MAX_FILES} files, {MAX_FILE_SIZE / (1024 * 1024)}MB each
              </span>
            </div>
          </div>
          {validationErrors.files && (
            <p className="text-sm text-red-400">{validationErrors.files}</p>
          )}

          {/* File Previews */}
          <AnimatePresence>
            {files.length > 0 && (
              <div className="space-y-2">
                {files.map((file, index) => (
                  <motion.div
                    key={`${file.name}-${index}`}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex items-center justify-between text-xs bg-cyan-500/10 text-cyan-500 px-3 py-2 rounded-md"
                  >
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <File size={14} />
                      <span className="truncate">{file.name}</span>
                      <span className="text-muted-foreground">
                        ({(file.size / (1024 * 1024)).toFixed(2)} MB)
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFile(index);
                      }}
                      className="hover:text-cyan-400 ml-2"
                    >
                      <X size={14} />
                    </button>
                  </motion.div>
                ))}
              </div>
            )}
          </AnimatePresence>
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
              <Loader2 className="mr-2 h-4 w-4 animate-spin text-white" /> Sending...
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
