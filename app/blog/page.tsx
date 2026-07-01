"use client";

import { useEffect, useState } from "react";
import { BlogPost, getPosts } from "../../lib/firebase/firestore";
import Link from "next/link";

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const fetchedPosts = await getPosts();
        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  return (
    <main className="px-8 py-16 max-w-7xl mx-auto w-full">
      <header className="mb-16">
        <h1 className="text-6xl md:text-8xl mb-4 font-oswald text-text-primary tracking-tighter">EL BLOG</h1>
        <p className="text-xl max-w-2xl text-text-secondary">
          Artículos sobre desarrollo frontend, interfaces de usuario, aplicaciones móviles y experiencias digitales.
        </p>
      </header>

      {loading ? (
        <div className="flex gap-4 flex-wrap">
          {[1, 2, 3].map(i => (
            <div key={i} className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1rem)] h-80 bg-bg-secondary rounded-2xl animate-pulse"></div>
          ))}
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-20 bg-bg-card rounded-2xl border border-border-color">
          <h2 className="text-2xl font-bold mb-2">Aún no hay artículos</h2>
          <p className="text-text-meta">Pronto habrá contenido nuevo.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, idx) => {
            // Pick a color to alternate for the visual aesthetic (like Invision reference)
            const colors = ['var(--accent-purple)', 'var(--accent-pink)', '#2F80ED', '#F2C94C'];
            const accentColor = colors[idx % colors.length];

            return (
              <Link href={`/blog/${post.slug}`} key={post.id} className="group no-underline block h-full">
                <article className="flex flex-col h-full bg-bg-card rounded-2xl overflow-hidden border border-border-color hover:-translate-y-2 transition-transform duration-300">
                  {/* Faux image placeholder area to match the vivid illustrations aesthetic */}
                  <div 
                    className="h-48 w-full flex items-center justify-center p-6 relative overflow-hidden" 
                    style={{ backgroundColor: accentColor }}
                  >
                    {/* Simulated abstract shapes for illustration placeholder */}
                    <div className="absolute w-32 h-32 rounded-full bg-white opacity-20 -top-10 -right-10"></div>
                    <div className="absolute w-24 h-24 rounded-lg bg-black opacity-20 -bottom-5 -left-5 rotate-12"></div>
                  </div>
                  
                  <div className="p-6 flex flex-col flex-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-accent-pink mb-3">
                      DESARROLLO
                    </span>
                    <h2 className="text-2xl font-oswald text-text-primary mb-3 leading-tight group-hover:text-accent-purple transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-sm text-text-secondary mb-6 flex-1 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex justify-between items-center mt-auto">
                      <span className="text-xs uppercase tracking-widest text-text-meta font-bold">
                        POR {post.authorName}
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            );
          })}
        </div>
      )}
    </main>
  );
}
