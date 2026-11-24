import { useParams, Link } from "wouter";
import { useGetBlogPost } from "@workspace/api-client-react";
import { motion } from "framer-motion";
import { PageHero } from "../components/PageHero";

const fallbackPosts: Record<number, any> = {
  1: { id: 1, title: "Walking by Faith in an Age of Uncertainty", category: "Devotional", publishedAt: "June 1, 2026", author: "Reverend N.Jecheche", readTime: "5 min read", excerpt: "In a world full of noise and confusion, what does it truly mean to walk by faith and not by sight?", imageUrl: "https://i.pinimg.com/736x/50/79/e2/5079e269d0c50fa9b276b7f4586e3d05.jpg", content: null },
  2: { id: 2, title: "The Power of Corporate Prayer", category: "Teaching", publishedAt: "May 20, 2026", author: "Minister Shekinah", readTime: "4 min read", excerpt: "When believers gather together in one accord, something powerful happens.", imageUrl: "https://t4.ftcdn.net/jpg/02/02/26/31/240_F_202263179_ot14Mrgl2kReuQVRSAJgUomx98zItbWX.jpg", content: null },
  3: { id: 3, title: "Raising a Generation for God", category: "Youth", publishedAt: "May 10, 2026", author: "Pastor B.Makunda", readTime: "6 min read", excerpt: "Our youth are not the church of tomorrow — they are the church of today.", imageUrl: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800", content: null },
};

export default function BlogDetail() {
  const { id } = useParams<{ id: string }>();
  const postId = parseInt(id || "1", 10);

  const { data: apiPost } = useGetBlogPost(postId, {
    query: { queryKey: ["blogPost", postId], enabled: !!postId }
  });

  const post = apiPost ?? fallbackPosts[postId] ?? fallbackPosts[1];

  return (
    <article className="site-page min-h-screen bg-background text-foreground">
      <PageHero
        align="center"
        eyebrow={`${post.category} · ${post.publishedAt}${post.readTime ? ` · ${post.readTime}` : ""}`}
        title={post.title}
        description={`By ${post.author}`}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="mx-auto max-w-5xl px-4 py-12 sm:px-6 md:py-16 lg:px-8"
      >
        <div className="aspect-[21/9] w-full relative bg-muted overflow-hidden">
          <img
            src={post.imageUrl || "/images/blog-1.png"}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      </motion.div>

      <div className="mx-auto max-w-3xl px-4 pb-12 sm:px-6 md:pb-20 lg:px-8">
        <div className="prose prose-lg prose-p:font-light prose-p:leading-loose prose-headings:font-sans prose-a:text-primary mx-auto">
          <p className="text-2xl font-light leading-relaxed mb-8 text-foreground/90">
            {post.excerpt}
          </p>

          {post.content ? (
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          ) : (
            <>
              <p>The sanctuary was quiet. Only the faint sound of traffic from the avenue outside penetrated the thick stone walls. In moments like these, when the noise of the world fades, we are often confronted with the true state of our own hearts.</p>
              <h2>The Architecture of the Soul</h2>
              <p>Just as physical buildings require intentional design, a solid foundation, and careful maintenance, so do our spiritual lives. We spend so much time constructing our external realities — our careers, our social profiles, our homes — but often neglect the internal architecture that sustains us through storms.</p>
              <blockquote>"He is like a man building a house, who dug deep and laid the foundation on the rock."</blockquote>
              <p>What does it mean to dig deep? It requires unhurried time. It requires silence. It requires the willingness to confront the cracked foundations of our own egos and allow grace to pour in like fresh concrete.</p>
              <p>As you move through this week, consider taking just ten minutes a day to sit in absolute silence. No phone. No music. Just you and the Creator, allowing the dust to settle and the foundation to be fortified.</p>
            </>
          )}
        </div>

        <div className="mt-20 pt-8 border-t border-border flex justify-between items-center">
          <div className="flex gap-4">
            <span className="text-xs uppercase tracking-widest font-medium text-muted-foreground hover:text-primary cursor-pointer transition-colors">Share on Twitter</span>
            <span className="text-xs uppercase tracking-widest font-medium text-muted-foreground hover:text-primary cursor-pointer transition-colors">Share on Facebook</span>
          </div>
          <Link href="/blog">
            <span className="text-xs uppercase tracking-widest font-medium text-primary hover:text-foreground cursor-pointer transition-colors">Back to Journal</span>
          </Link>
        </div>
      </div>
    </article>
  );
}