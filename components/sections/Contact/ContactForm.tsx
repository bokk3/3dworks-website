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

export default function ContactForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(formData: FormData) {
    setIsLoading(true);
    setError("");
    setSuccess(false);

    if (file) {
      formData.append("file", file);
    }

    try {
      const result = await submitContactForm(formData);

      if (result.error) {
        setError(result.error);
      } else {
        setSuccess(true);
        formRef.current?.reset();
        setFile(null);
      }
    } catch (e) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="glass-card p-8 rounded-2xl"
    >
      <form ref={formRef} action={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Name
            </label>
            <Input
              id="name"
              name="name"
              placeholder="John Doe"
              required
              className="bg-white/5 border-white/10"
            />
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
              required
              className="bg-white/5 border-white/10"
            />
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
            required
            className="min-h-[120px] bg-white/5 border-white/10"
          />
        </div>

        {/* File Upload UI */}
        <div className="space-y-2">
          <label className="text-sm font-medium">
            Upload 3D Model (Optional)
          </label>
          <div className="relative border-2 border-dashed border-white/10 rounded-lg p-6 transition-colors hover:border-cyan-500/50 hover:bg-cyan-500/5 text-center cursor-pointer group">
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
            </div>
          </div>
          {file && (
            <div className="flex items-center justify-between text-xs bg-cyan-500/10 text-cyan-500 px-3 py-2 rounded-md">
              <span className="truncate max-w-[200px]">{file.name}</span>
              <button
                type="button"
                onClick={() => setFile(null)}
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
            <span>{success}</span>
          </div>
        )}

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-cyan-500 hover:bg-cyan-600 text-white shadow-lg shadow-cyan-500/20"
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
