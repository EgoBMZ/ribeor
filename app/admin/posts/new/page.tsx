"use client";

import { useState, useEffect } from "react";
import { useAuth } from "../../../../components/AuthProvider";
import { createPost } from "../../../../lib/firebase/firestore";
import { useRouter } from "next/navigation";
import { ImageUploadButton } from "../../../../components/ImageUploadButton";
import ReactMarkdown from "react-markdown";

export default function CreatePostPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState<"edit" | "preview" | "split">("split");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) { // xl breakpoint
        setActiveTab("split");
      } else {
        setActiveTab("edit");
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !slug || !content || !user) return;
    
    setIsSubmitting(true);
    try {
      await createPost({
        title,
        slug,
        excerpt,
        content,
        authorId: user.uid,
        authorName: user.displayName || "Admin",
      });
      alert("¡Post creado con éxito!");
      router.push("/blog");
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Hubo un error al crear el post.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const autoGenerateSlug = (text: string) => {
    return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  };

  const handleImageUploaded = (url: string) => {
    setContent((prev) => prev + (prev ? "\n\n" : "") + `![Descripción de la imagen](${url})\n`);
  };

  return (
    <div className="w-full flex flex-col gap-6">
      <h1 className="text-3xl font-oswald text-text-primary uppercase tracking-tight">Crear Nuevo Artículo</h1>
      
      {/* View Mode Switcher */}
      <div className="flex gap-2 bg-bg-secondary p-1 rounded-lg self-start">
        <button
          type="button"
          onClick={() => setActiveTab("edit")}
          className={`px-4 py-2 rounded-md text-sm font-semibold transition-colors ${
            activeTab === "edit" ? "bg-bg-primary text-text-primary shadow-sm" : "text-text-meta hover:text-text-primary"
          }`}
        >
          Editar
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("preview")}
          className={`px-4 py-2 rounded-md text-sm font-semibold transition-colors ${
            activeTab === "preview" ? "bg-bg-primary text-text-primary shadow-sm" : "text-text-meta hover:text-text-primary"
          }`}
        >
          Vista Previa
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("split")}
          className={`hidden xl:block px-4 py-2 rounded-md text-sm font-semibold transition-colors ${
            activeTab === "split" ? "bg-bg-primary text-text-primary shadow-sm" : "text-text-meta hover:text-text-primary"
          }`}
        >
          Pantalla Dividida
        </button>
      </div>

      <div className="w-full flex flex-col xl:flex-row gap-8 items-start">
        {/* Editor Form */}
        {(activeTab === "edit" || activeTab === "split") && (
          <form onSubmit={handleSubmit} className={`flex flex-col gap-6 w-full ${activeTab === "split" ? "xl:w-1/2" : ""}`}>
            <div className="flex flex-col gap-2">
              <label className="text-sm uppercase tracking-wider font-bold text-text-meta">Título</label>
              <input 
                type="text" 
                value={title} 
                onChange={(e) => {
                  setTitle(e.target.value);
                  if (!slug) setSlug(autoGenerateSlug(e.target.value));
                }}
                className="p-4 rounded-lg bg-bg-primary border border-border-color text-text-primary focus:border-accent-pink outline-none transition-colors"
                placeholder="El futuro del desarrollo web"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm uppercase tracking-wider font-bold text-text-meta">Slug (URL)</label>
              <input 
                type="text" 
                value={slug} 
                onChange={(e) => setSlug(e.target.value)}
                className="p-4 rounded-lg bg-bg-primary border border-border-color text-text-primary focus:border-accent-pink outline-none transition-colors font-mono text-sm"
                placeholder="el-futuro-del-desarrollo-web"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm uppercase tracking-wider font-bold text-text-meta">Extracto (Resumen)</label>
              <textarea 
                value={excerpt} 
                onChange={(e) => setExcerpt(e.target.value)}
                className="p-4 rounded-lg bg-bg-primary border border-border-color text-text-primary focus:border-accent-pink outline-none transition-colors"
                placeholder="Un breve resumen que aparecerá en la tarjeta del blog..."
                rows={3}
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-end mb-1">
                <label className="text-sm uppercase tracking-wider font-bold text-text-meta flex flex-col">
                  <span>Contenido (Markdown)</span>
                  <span className="text-accent-pink font-normal lowercase text-xs mt-1">soporta formato markdown</span>
                </label>
                <ImageUploadButton onUploadSuccess={handleImageUploaded} folder="posts" />
              </div>
              <textarea 
                value={content} 
                onChange={(e) => setContent(e.target.value)}
                className="p-4 rounded-lg bg-bg-primary border border-border-color text-text-primary focus:border-accent-pink outline-none transition-colors font-mono text-sm"
                placeholder="# Encabezado principal&#10;&#10;Escribe tu post aquí..."
                rows={15}
                required
              />
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="bg-accent-pink text-white font-bold py-4 px-8 rounded-full hover:bg-opacity-90 transition-all uppercase tracking-wider self-start disabled:opacity-50 mt-4"
            >
              {isSubmitting ? "Publicando..." : "Publicar Artículo"}
            </button>
          </form>
        )}

        {/* Live Preview Panel */}
        {(activeTab === "preview" || activeTab === "split") && (
          <div className={`flex-1 w-full p-6 bg-bg-card border border-border-color rounded-2xl max-h-[calc(100vh-12rem)] overflow-y-auto ${activeTab === "split" ? "xl:sticky xl:top-8" : ""}`}>
            <h2 className="text-xl font-bold font-oswald text-text-primary uppercase tracking-wider mb-6 border-b border-border-color pb-2">
              Vista Previa en Vivo
            </h2>
            <div className="w-full">
              <span className="text-xs font-bold uppercase tracking-widest text-accent-pink mb-4 block">
                VISTA PREVIA / {new Date().toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}
              </span>
              <h1 className="text-4xl md:text-5xl font-oswald text-text-primary uppercase tracking-tighter leading-none mb-6">
                {title || "Sin Título"}
              </h1>
              
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-accent-purple flex items-center justify-center text-white font-bold text-lg">
                  {user?.displayName?.charAt(0) || "A"}
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-text-meta block">
                    AUTOR
                  </span>
                  <span className="text-sm font-bold text-text-primary">
                    {user?.displayName || "Admin"}
                  </span>
                </div>
              </div>
              
              {excerpt && (
                <div className="p-4 bg-bg-secondary rounded-lg border-l-4 border-accent-pink mb-6 text-sm text-text-secondary italic">
                  {excerpt}
                </div>
              )}
              
              <article className="prose prose-lg dark:prose-invert max-w-none">
                {content ? (
                  <ReactMarkdown
                    components={{
                      h1: ({node, ...props}) => <h1 className="font-oswald text-3xl mt-8 mb-4 border-b border-border-color pb-1" {...props} />,
                      h2: ({node, ...props}) => <h2 className="font-oswald text-2xl mt-6 mb-3" {...props} />,
                      h3: ({node, ...props}) => <h3 className="font-oswald text-xl mt-4 mb-2" {...props} />,
                      p: ({node, ...props}) => <p className="text-base text-text-secondary leading-relaxed mb-4" {...props} />,
                      a: ({node, ...props}) => <a className="text-accent-pink hover:text-accent-purple font-bold transition-colors" {...props} />,
                      ul: ({node, ...props}) => <ul className="list-disc pl-6 mb-4 text-text-secondary" {...props} />,
                      li: ({node, ...props}) => <li className="mb-1" {...props} />,
                      code: ({node, ...props}) => <code className="bg-bg-secondary p-1 rounded font-mono text-sm text-accent-pink" {...props} />,
                      pre: ({node, ...props}) => <pre className="bg-bg-secondary p-4 rounded-lg overflow-x-auto font-mono text-sm text-text-primary mb-4 border border-border-color" {...props} />,
                    }}
                  >
                    {content}
                  </ReactMarkdown>
                ) : (
                  <p className="text-text-meta italic">Escribe contenido para verlo renderizado en tiempo real...</p>
                )}
              </article>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
