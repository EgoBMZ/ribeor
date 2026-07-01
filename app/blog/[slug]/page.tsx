"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { BlogPost, getPostBySlug, incrementPostViews } from "../../../lib/firebase/firestore";
import ReactMarkdown from "react-markdown";

export default function BlogPostPage() {
  const params = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPost() {
      if (typeof params.slug === 'string') {
        const data = await getPostBySlug(params.slug);
        setPost(data);
        if (data) {
          try {
            await incrementPostViews(params.slug);
          } catch (e) {
            console.error("Failed to increment post views:", e);
          }
        }
      }
      setLoading(false);
    }
    fetchPost();
  }, [params.slug]);

  if (loading) {
    return <div className="p-20 text-center animate-pulse">Cargando artículo...</div>;
  }

  if (!post) {
    return (
      <div className="p-20 text-center">
        <h1 className="text-4xl mb-4 font-oswald">Artículo no encontrado</h1>
      </div>
    );
  }

  return (
    <main className="w-full">
      {/* Header massive like "Inside Design" reference */}
      <header className="bg-bg-secondary py-20 px-8 flex justify-center">
        <div className="max-w-4xl w-full">
          <span className="text-sm font-bold uppercase tracking-widest text-accent-pink mb-6 block">
            ARTÍCULO / {post.createdAt.toDate().toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}
          </span>
          <h1 className="text-6xl md:text-8xl font-oswald text-text-primary uppercase tracking-tighter leading-none mb-10">
            {post.title}
          </h1>
          
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-accent-purple flex items-center justify-center text-white font-bold text-xl">
              {post.authorName.charAt(0)}
            </div>
            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-text-meta block mb-1">
                AUTOR
              </span>
              <span className="text-lg font-bold text-text-primary">
                {post.authorName}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <article className="py-16 px-8 max-w-3xl mx-auto w-full prose prose-lg dark:prose-invert">
        <ReactMarkdown
          components={{
            h1: ({node, ...props}) => <h1 className="font-oswald text-5xl mt-12 mb-6" {...props} />,
            h2: ({node, ...props}) => <h2 className="font-oswald text-4xl mt-10 mb-4" {...props} />,
            h3: ({node, ...props}) => <h3 className="font-oswald text-3xl mt-8 mb-4" {...props} />,
            p: ({node, ...props}) => <p className="text-lg text-text-secondary leading-relaxed mb-6" {...props} />,
            a: ({node, ...props}) => <a className="text-accent-pink hover:text-accent-purple font-bold transition-colors" {...props} />,
            ul: ({node, ...props}) => <ul className="list-disc pl-6 mb-6 text-text-secondary" {...props} />,
            li: ({node, ...props}) => <li className="mb-2" {...props} />,
          }}
        >
          {post.content}
        </ReactMarkdown>
      </article>
    </main>
  );
}
