"use client";

import { useState, useEffect } from "react";
import { useAuth } from "../../../../components/AuthProvider";
import { createProject } from "../../../../lib/firebase/firestore";
import { useRouter } from "next/navigation";
import { ImageUploadButton } from "../../../../components/ImageUploadButton";
import { Link as LinkIcon, Globe, Code2 } from "lucide-react";
import ReactMarkdown from "react-markdown";

export default function CreateProjectPage() {
  const { user } = useAuth();
  const router = useRouter();
  
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [repoUrl, setRepoUrl] = useState("");
  const [liveUrl, setLiveUrl] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [coverImage, setCoverImage] = useState("");
  
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
    if (!title || !slug || !description || !content || !user) return;
    
    setIsSubmitting(true);
    try {
      const techArray = technologies.split(",").map(t => t.trim()).filter(Boolean);
      
      await createProject({
        title,
        slug,
        description,
        content,
        repoUrl,
        liveUrl,
        technologies: techArray,
        coverImage,
        authorId: user.uid,
        authorName: user.displayName || "Admin",
      });
      alert("¡Proyecto creado con éxito!");
      router.push("/proyectos");
    } catch (error) {
      console.error("Error creating project:", error);
      alert("Hubo un error al crear el proyecto.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const autoGenerateSlug = (text: string) => {
    return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  };

  const handleBodyImageUploaded = (url: string) => {
    setContent((prev) => prev + (prev ? "\n\n" : "") + `![Descripción de la imagen](${url})\n`);
  };

  return (
    <div className="w-full flex flex-col gap-6">
      <h1 className="text-3xl font-oswald text-text-primary uppercase tracking-tight">Añadir Nuevo Proyecto</h1>
      
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
            {/* Title and Slug */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm uppercase tracking-wider font-bold text-text-meta">Título del Proyecto</label>
                <input 
                  type="text" 
                  value={title} 
                  onChange={(e) => {
                    setTitle(e.target.value);
                    if (!slug) setSlug(autoGenerateSlug(e.target.value));
                  }}
                  className="p-3 rounded-lg bg-bg-primary border border-border-color text-text-primary focus:border-accent-purple outline-none transition-colors"
                  placeholder="Mi super aplicación"
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm uppercase tracking-wider font-bold text-text-meta">Slug (URL)</label>
                <input 
                  type="text" 
                  value={slug} 
                  onChange={(e) => setSlug(e.target.value)}
                  className="p-3 rounded-lg bg-bg-primary border border-border-color text-text-primary focus:border-accent-purple outline-none transition-colors font-mono text-sm"
                  placeholder="mi-super-aplicacion"
                  required
                />
              </div>
            </div>

            {/* Description */}
            <div className="flex flex-col gap-2">
              <label className="text-sm uppercase tracking-wider font-bold text-text-meta">Descripción Corta</label>
              <textarea 
                value={description} 
                onChange={(e) => setDescription(e.target.value)}
                className="p-3 rounded-lg bg-bg-primary border border-border-color text-text-primary focus:border-accent-purple outline-none transition-colors"
                placeholder="Resumen del proyecto para la tarjeta..."
                rows={2}
                required
              />
            </div>

            {/* URLs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm uppercase tracking-wider font-bold text-text-meta flex items-center gap-2">
                  <LinkIcon size={14} /> Repositorio (GitHub)
                </label>
                <input 
                  type="url" 
                  value={repoUrl} 
                  onChange={(e) => setRepoUrl(e.target.value)}
                  className="p-3 rounded-lg bg-bg-primary border border-border-color text-text-primary focus:border-accent-purple outline-none transition-colors"
                  placeholder="https://github.com/tu-usuario/repo"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm uppercase tracking-wider font-bold text-text-meta flex items-center gap-2">
                  <Globe size={14} /> Demo en vivo
                </label>
                <input 
                  type="url" 
                  value={liveUrl} 
                  onChange={(e) => setLiveUrl(e.target.value)}
                  className="p-3 rounded-lg bg-bg-primary border border-border-color text-text-primary focus:border-accent-purple outline-none transition-colors"
                  placeholder="https://tu-proyecto.vercel.app"
                />
              </div>
            </div>

            {/* Technologies and Cover Image */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm uppercase tracking-wider font-bold text-text-meta flex items-center gap-2">
                  <Code2 size={14} /> Tecnologías
                </label>
                <input 
                  type="text" 
                  value={technologies} 
                  onChange={(e) => setTechnologies(e.target.value)}
                  className="p-3 rounded-lg bg-bg-primary border border-border-color text-text-primary focus:border-accent-purple outline-none transition-colors"
                  placeholder="React, Next.js, Firebase, Tailwind..."
                />
                <span className="text-xs text-text-meta">Separa cada tecnología con una coma.</span>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm uppercase tracking-wider font-bold text-text-meta">Imagen de Portada (Opcional)</label>
                <div className="flex gap-4 items-center">
                  <div className="flex-1">
                    <input 
                      type="url" 
                      value={coverImage} 
                      onChange={(e) => setCoverImage(e.target.value)}
                      className="w-full p-3 rounded-lg bg-bg-primary border border-border-color text-text-primary focus:border-accent-purple outline-none transition-colors"
                      placeholder="URL de la imagen..."
                    />
                  </div>
                  <ImageUploadButton 
                    folder="projects" 
                    label="Subir Portada"
                    onUploadSuccess={(url) => setCoverImage(url)} 
                  />
                </div>
                {coverImage && (
                  <img src={coverImage} alt="Portada" className="h-20 w-auto rounded object-cover mt-2 border border-border-color" />
                )}
              </div>
            </div>

            {/* Markdown Content */}
            <div className="flex flex-col gap-2 mt-4">
              <div className="flex justify-between items-end mb-1">
                <label className="text-sm uppercase tracking-wider font-bold text-text-meta flex flex-col">
                  <span>Contenido Completo (Markdown)</span>
                  <span className="text-accent-purple font-normal lowercase text-xs mt-1">documentación del proyecto</span>
                </label>
                <ImageUploadButton onUploadSuccess={handleBodyImageUploaded} folder="projects" />
              </div>
              <textarea 
                value={content} 
                onChange={(e) => setContent(e.target.value)}
                className="p-4 rounded-lg bg-bg-primary border border-border-color text-text-primary focus:border-accent-purple outline-none transition-colors font-mono text-sm"
                placeholder="## Sobre este proyecto&#10;&#10;Detalla aquí cómo lo construiste..."
                rows={15}
                required
              />
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="bg-accent-purple text-white font-bold py-4 px-8 rounded-full hover:bg-opacity-90 transition-all uppercase tracking-wider self-start disabled:opacity-50 mt-4"
            >
              {isSubmitting ? "Guardando..." : "Crear Proyecto"}
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
              {coverImage && (
                <div className="w-full h-48 rounded-xl overflow-hidden mb-6 border border-border-color">
                  <img src={coverImage} alt="Portada del proyecto" className="w-full h-full object-cover" />
                </div>
              )}
              
              <span className="text-xs font-bold uppercase tracking-widest text-accent-purple mb-3 block">
                PROYECTO / PORTAFOLIO
              </span>
              
              <h1 className="text-4xl md:text-5xl font-oswald text-text-primary uppercase tracking-tighter leading-none mb-4">
                {title || "Proyecto sin Título"}
              </h1>
              
              {/* Technologies */}
              {technologies && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {technologies.split(",").map(t => t.trim()).filter(Boolean).map((tech, i) => (
                    <span key={i} className="px-3 py-1 bg-accent-purple/10 border border-accent-purple/20 text-accent-purple rounded-full text-xs font-semibold">
                      {tech}
                    </span>
                  ))}
                </div>
              )}

              {/* Links */}
              {(repoUrl || liveUrl) && (
                <div className="flex gap-4 mb-6">
                  {repoUrl && (
                    <a href={repoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs font-bold text-text-primary hover:text-accent-purple transition-colors bg-bg-secondary px-3 py-2 rounded-lg border border-border-color">
                      <Code2 size={14} /> Código / GitHub
                    </a>
                  )}
                  {liveUrl && (
                    <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs font-bold text-text-primary hover:text-accent-purple transition-colors bg-bg-secondary px-3 py-2 rounded-lg border border-border-color">
                      <Globe size={14} /> Demo en Vivo
                    </a>
                  )}
                </div>
              )}
              
              {description && (
                <div className="p-4 bg-bg-secondary rounded-lg border-l-4 border-accent-purple mb-6 text-sm text-text-secondary">
                  {description}
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
                      a: ({node, ...props}) => <a className="text-accent-purple hover:text-accent-pink font-bold transition-colors" {...props} />,
                      ul: ({node, ...props}) => <ul className="list-disc pl-6 mb-4 text-text-secondary" {...props} />,
                      li: ({node, ...props}) => <li className="mb-1" {...props} />,
                      code: ({node, ...props}) => <code className="bg-bg-secondary p-1 rounded font-mono text-sm text-accent-purple" {...props} />,
                      pre: ({node, ...props}) => <pre className="bg-bg-secondary p-4 rounded-lg overflow-x-auto font-mono text-sm text-text-primary mb-4 border border-border-color" {...props} />,
                    }}
                  >
                    {content}
                  </ReactMarkdown>
                ) : (
                  <p className="text-text-meta italic">Escribe la documentación del proyecto para verla renderizada aquí...</p>
                )}
              </article>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
