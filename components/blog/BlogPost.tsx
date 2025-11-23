"use client";

import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote/rsc";
import { BlogPost } from "@/lib/blog-data";
import { format } from "date-fns";
import { Calendar, Clock, User, Tag } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface BlogPostProps {
  post: BlogPost;
}

// Custom components for MDX content
const components = {
  h1: (props: any) => (
    <h1 className="text-4xl font-display font-bold mt-8 mb-4" {...props} />
  ),
  h2: (props: any) => (
    <h2 className="text-3xl font-display font-bold mt-6 mb-3" {...props} />
  ),
  h3: (props: any) => (
    <h3 className="text-2xl font-display font-bold mt-4 mb-2" {...props} />
  ),
  p: (props: any) => (
    <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4" {...props} />
  ),
  ul: (props: any) => (
    <ul className="list-disc list-inside space-y-2 mb-4 text-slate-700 dark:text-slate-300" {...props} />
  ),
  ol: (props: any) => (
    <ol className="list-decimal list-inside space-y-2 mb-4 text-slate-700 dark:text-slate-300" {...props} />
  ),
  li: (props: any) => <li className="ml-4" {...props} />,
  code: (props: any) => (
    <code
      className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded-md text-sm font-mono"
      {...props}
    />
  ),
  pre: (props: any) => (
    <pre
      className="p-4 bg-slate-100 dark:bg-slate-800 rounded-md overflow-x-auto mb-4"
      {...props}
    />
  ),
  blockquote: (props: any) => (
    <blockquote
      className="border-l-4 border-cyan-500 pl-4 italic my-4 text-slate-600 dark:text-slate-400"
      {...props}
    />
  ),
  a: (props: any) => (
    <a
      className="text-cyan-500 hover:text-cyan-600 underline"
      {...props}
    />
  ),
};

export function BlogPostContent({ post }: BlogPostProps) {
  return (
    <article className="max-w-4xl mx-auto">
      {/* Header Image */}
      {post.image && (
        <div className="relative aspect-video rounded-xl overflow-hidden mb-8">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 1200px"
            quality={90}
            priority
          />
        </div>
      )}

      {/* Header */}
      <header className="mb-8">
        {/* Category */}
        <div className="mb-4">
          <span className="px-3 py-1 text-xs font-medium text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 rounded-full uppercase tracking-wider">
            {post.category}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
          {post.title}
        </h1>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-6">
          <div className="flex items-center gap-2">
            <User size={16} />
            <span>{post.author.name}</span>
            {post.author.role && (
              <span className="text-muted-foreground">• {post.author.role}</span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Calendar size={16} />
            <span>{format(new Date(post.publishedAt), "MMMM d, yyyy")}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={16} />
            <span>{post.readTime} min read</span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-xs bg-slate-100 dark:bg-slate-800 rounded-md text-muted-foreground flex items-center gap-1"
            >
              <Tag size={12} />
              {tag}
            </span>
          ))}
        </div>
      </header>

      {/* Content */}
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <MDXRemote source={post.content} components={components} />
      </div>
    </article>
  );
}

