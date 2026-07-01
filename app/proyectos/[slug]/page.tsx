"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Project, getProjectBySlug } from "../../../lib/firebase/firestore";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import { ArrowLeft, Code2, Globe } from "lucide-react";

export default function ProjectDetailPage() {
  const params = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProject() {
      if (typeof params.slug === 'string') {
        const data = await getProjectBySlug(params.slug);
        setProject(data);
      }
      setLoading(false);
    }
    fetchProject();
  }, [params.slug]);

  if (loading) {
    return <div className="p-20 text-center animate-pulse text-text-meta">Cargando detalles del proyecto...</div>;
  }

  if (!project) {
    return (
      <div className="p-20 text-center">
        <h1 className="text-4xl mb-4 font-oswald text-text-primary">Proyecto no encontrado</h1>
        <Link href="/proyectos" className="text-accent-purple hover:underline font-semibold">
          Volver a portafolio
        </Link>
      </div>
    );
  }

  return (
    <main className="w-full">
      {/* Back button */}
      <div className="max-w-4xl mx-auto px-8 pt-8">
        <Link href="/proyectos" className="inline-flex items-center gap-2 text-sm font-bold text-text-meta hover:text-accent-purple transition-colors no-underline">
          <ArrowLeft size={16} /> VOLVER A PORTAFOLIO
        </Link>
      </div>

      {/* Header section */}
      <header className="py-16 px-8 flex justify-center bg-bg-secondary/40 border-b border-border-color mt-4">
        <div className="max-w-4xl w-full">
          <span className="text-sm font-bold uppercase tracking-widest text-accent-purple mb-4 block">
            PROYECTO
          </span>
          <h1 className="text-5xl md:text-7xl font-oswald text-text-primary uppercase tracking-tighter leading-none mb-6">
            {project.title}
          </h1>

          {/* Tech Badges */}
          {project.technologies && project.technologies.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {project.technologies.map((tech, i) => (
                <span key={i} className="px-3 py-1 bg-accent-purple/10 border border-accent-purple/20 text-accent-purple rounded-full text-xs font-semibold">
                  {tech}
                </span>
              ))}
            </div>
          )}

          {/* Links and Author */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-t border-border-color pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-accent-purple flex items-center justify-center text-white font-bold text-lg">
                {project.authorName.charAt(0)}
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-text-meta block">
                  DESARROLLADOR
                </span>
                <span className="text-base font-bold text-text-primary">
                  {project.authorName}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              {project.repoUrl && (
                <a 
                  href={project.repoUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-2 bg-bg-card hover:bg-bg-secondary text-text-primary px-4 py-2.5 rounded-lg border border-border-color font-bold text-sm transition-colors"
                >
                  <Code2 size={16} /> Código / GitHub
                </a>
              )}
              {project.liveUrl && (
                <a 
                  href={project.liveUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-2 bg-accent-purple hover:bg-opacity-90 text-white px-4 py-2.5 rounded-lg font-bold text-sm transition-colors"
                >
                  <Globe size={16} /> Demo en Vivo
                </a>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-8 py-16 w-full flex flex-col md:flex-row gap-12">
        {/* Document Content */}
        <div className="flex-1 min-w-0">
          {project.coverImage && (
            <div className="w-full h-72 md:h-96 rounded-2xl overflow-hidden mb-10 border border-border-color shadow-sm">
              <img src={project.coverImage} alt={project.title} className="w-full h-full object-cover" />
            </div>
          )}

          {project.description && (
            <p className="text-xl text-text-secondary leading-relaxed font-light italic mb-10 border-l-4 border-accent-purple pl-6 py-2">
              {project.description}
            </p>
          )}

          <article className="prose prose-lg dark:prose-invert max-w-none">
            <ReactMarkdown
              components={{
                h1: ({node, ...props}) => <h1 className="font-oswald text-4xl mt-12 mb-6 border-b border-border-color pb-2" {...props} />,
                h2: ({node, ...props}) => <h2 className="font-oswald text-3xl mt-10 mb-4" {...props} />,
                h3: ({node, ...props}) => <h3 className="font-oswald text-2xl mt-8 mb-4" {...props} />,
                p: ({node, ...props}) => <p className="text-lg text-text-secondary leading-relaxed mb-6" {...props} />,
                a: ({node, ...props}) => <a className="text-accent-purple hover:text-accent-pink font-bold transition-colors" {...props} />,
                ul: ({node, ...props}) => <ul className="list-disc pl-6 mb-6 text-text-secondary" {...props} />,
                li: ({node, ...props}) => <li className="mb-2" {...props} />,
                code: ({node, ...props}) => <code className="bg-bg-secondary p-1 rounded font-mono text-sm text-accent-purple" {...props} />,
                pre: ({node, ...props}) => <pre className="bg-bg-secondary p-4 rounded-lg overflow-x-auto font-mono text-sm text-text-primary mb-6 border border-border-color" {...props} />,
              }}
            >
              {project.content}
            </ReactMarkdown>
          </article>
        </div>
      </div>
    </main>
  );
}
