import { blogPosts, getAllTags, type BlogCategory } from "@/lib/blog-data";
import { BlogCard } from "@/components/blog/BlogCard";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { X, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { searchBlogPosts } from "@/lib/blog-data";
import { BlogListingClient } from "./BlogListingClient";

export const metadata = {
  title: "Blog | 3Dworks",
  description:
    "Learn about 3D printing techniques, material comparisons, case studies, and industry news from the experts at 3Dworks.",
};

export default function BlogPage() {
  const categories: BlogCategory[] = [
    "Materials",
    "Techniques",
    "Case Studies",
    "News",
  ];
  const allTags = getAllTags();

  return (
    <section className="section relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 grid-pattern opacity-[0.03] dark:opacity-[0.05]" />
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-orange-500/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-amber-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="container relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h1 className="text-4xl md:text-5xl font-display font-bold">
            <span className="text-gradient-cyber">3D Printing</span> Knowledge Base
          </h1>
          <p className="text-lg text-muted-foreground">
            Expert insights, tips, case studies, and industry news to help you
            master 3D printing
          </p>
        </div>

        {/* Client Component for Interactive Features */}
        <BlogListingClient
          initialPosts={blogPosts}
          categories={categories}
          tags={allTags}
        />
      </div>
    </section>
  );
}

