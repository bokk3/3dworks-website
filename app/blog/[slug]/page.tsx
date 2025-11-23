import { notFound } from "next/navigation";
import { getBlogPost, blogPosts } from "@/lib/blog-data";
import { BlogPostContent } from "@/components/blog/BlogPostContent";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return {
      title: "Post Not Found | 3Dworks Blog",
    };
  }

  return {
    title: `${post.title} | 3Dworks Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author.name],
      tags: post.tags,
      images: post.image ? [post.image] : [],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <section className="section relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 grid-pattern opacity-[0.03] dark:opacity-[0.05]" />
      </div>

      <div className="container relative z-10">
        {/* Back Button */}
        <div className="mb-8">
          <Button
            variant="outline"
            asChild
            className="border-white/10 hover:border-cyan-500/50"
          >
            <Link href="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
            </Link>
          </Button>
        </div>

        {/* Blog Post Content */}
        <BlogPostContent post={post} />
      </div>
    </section>
  );
}

