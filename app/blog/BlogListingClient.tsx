"use client";

import { useState, useMemo } from "react";
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
import {
  BlogPost,
  BlogCategory,
  searchBlogPosts,
  getBlogPostsByCategory,
} from "@/lib/blog-data";

interface BlogListingClientProps {
  initialPosts: BlogPost[];
  categories: BlogCategory[];
  tags: string[];
}

export function BlogListingClient({
  initialPosts,
  categories,
  tags,
}: BlogListingClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedTag, setSelectedTag] = useState<string>("all");

  const filteredPosts = useMemo(() => {
    let posts = initialPosts;

    // Category filter
    if (selectedCategory !== "all") {
      posts = getBlogPostsByCategory(selectedCategory as BlogCategory);
    }

    // Tag filter
    if (selectedTag !== "all") {
      posts = posts.filter((post) => post.tags.includes(selectedTag));
    }

    // Search filter
    if (searchQuery) {
      posts = searchBlogPosts(searchQuery);
      // Apply category and tag filters to search results
      if (selectedCategory !== "all") {
        posts = posts.filter((post) => post.category === selectedCategory);
      }
      if (selectedTag !== "all") {
        posts = posts.filter((post) => post.tags.includes(selectedTag));
      }
    }

    return posts;
  }, [initialPosts, searchQuery, selectedCategory, selectedTag]);

  const hasActiveFilters =
    searchQuery !== "" ||
    selectedCategory !== "all" ||
    selectedTag !== "all";

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedTag("all");
  };

  return (
    <>
      {/* Filters */}
      <div className="glass-card p-6 rounded-xl mb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <Input
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white/5 border-white/10 focus-visible:ring-cyan-500/20"
            />
          </div>

          {/* Category Filter */}
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="bg-white/5 border-white/10 focus-visible:ring-cyan-500/20">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Tag Filter */}
          <Select value={selectedTag} onValueChange={setSelectedTag}>
            <SelectTrigger className="bg-white/5 border-white/10 focus-visible:ring-cyan-500/20">
              <SelectValue placeholder="All Tags" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Tags</SelectItem>
              {tags.map((tag) => (
                <SelectItem key={tag} value={tag}>
                  {tag}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing {filteredPosts.length} of {initialPosts.length} articles
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={clearFilters}
              className="border-white/10 text-muted-foreground hover:text-cyan-500 hover:border-cyan-500/50"
            >
              <X className="mr-2 h-4 w-4" /> Clear Filters
            </Button>
          </div>
        )}
      </div>

      {/* Blog Grid */}
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post, index) => (
            <BlogCard key={post.slug} post={post} index={index} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-muted-foreground text-lg">
            No articles found matching your filters.
          </p>
          <Button
            variant="outline"
            onClick={clearFilters}
            className="mt-4 border-white/10 hover:border-cyan-500/50"
          >
            Clear Filters
          </Button>
        </div>
      )}
    </>
  );
}

