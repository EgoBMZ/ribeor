"use client";

import { useEffect, useState } from "react";
import { Project, getProjects } from "../../lib/firebase/firestore";
import Link from "next/link";
import { Code2, Globe, FolderGit2 } from "lucide-react";
import { useTranslations } from "../../lib/i18n/TranslationsProvider";

export default function ProyectosPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslations();
  const pg = t.projects_page;

  useEffect(() => {
    async function fetchProjects() {
      try {
        const fetchedProjects = await getProjects();
        setProjects(fetchedProjects);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  return (
    <main className="px-6 md:px-12 py-16 max-w-7xl mx-auto w-full">
      <header className="mb-16">
        <span
          className="text-xs uppercase tracking-widest font-bold block mb-4"
          style={{ color: "var(--accent-lime)" }}
        >
          {pg.label}
        </span>
        <h1 className="text-6xl md:text-8xl mb-6 font-oswald text-text-primary tracking-tighter">{pg.heading}</h1>
        <p className="text-xl max-w-2xl" style={{ color: "var(--text-secondary)" }}>
          {pg.description}
        </p>
      </header>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map(i => (
            <div key={i} className="w-full h-96 bg-bg-secondary rounded-2xl animate-pulse"></div>
          ))}
        </div>
      ) : projects.length === 0 ? (
        <div className="text-center py-20 bg-bg-card rounded-2xl border border-border-color">
          <FolderGit2 className="mx-auto mb-4 text-text-meta" size={48} />
          <h2 className="text-2xl font-bold mb-2">Aún no hay proyectos</h2>
          <p className="text-text-meta">Pronto se añadirán nuevos proyectos.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => {
            // Alternating accent colors for cards without images
            const colors = ['var(--accent-purple)', 'var(--accent-pink)', '#2F80ED', '#10B981'];
            const accentColor = colors[idx % colors.length];

            return (
              <div key={project.id} className="relative flex flex-col h-full bg-bg-card rounded-2xl overflow-hidden border border-border-color hover:-translate-y-2 transition-transform duration-300 group">
                {/* Card cover image or placeholder */}
                {project.coverImage ? (
                  <div className="h-48 w-full relative overflow-hidden">
                    <img 
                      src={project.coverImage} 
                      alt={project.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                  </div>
                ) : (
                  <div 
                    className="h-48 w-full flex items-center justify-center p-6 relative overflow-hidden" 
                    style={{ backgroundColor: accentColor }}
                  >
                    <div className="absolute w-32 h-32 rounded-full bg-white opacity-20 -top-10 -right-10"></div>
                    <div className="absolute w-24 h-24 rounded-lg bg-black opacity-20 -bottom-5 -left-5 rotate-12"></div>
                    <FolderGit2 size={48} className="text-white relative z-10 opacity-80" />
                  </div>
                )}
                
                <div className="p-6 flex flex-col flex-1">
                  {/* Tech stack tags */}
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {project.technologies.slice(0, 3).map((tech, i) => (
                        <span key={i} className="px-2 py-0.5 bg-bg-secondary text-text-meta border border-border-color rounded-full text-[10px] font-semibold">
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="px-2 py-0.5 bg-bg-secondary text-text-meta border border-border-color rounded-full text-[10px] font-semibold">
                          +{project.technologies.length - 3}
                        </span>
                      )}
                    </div>
                  )}

                  <h2 className="text-2xl font-oswald text-text-primary mb-3 leading-tight group-hover:text-accent-purple transition-colors uppercase tracking-tight">
                    {project.title}
                  </h2>

                  <p className="text-sm text-text-secondary mb-6 flex-1 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Stretched Link Overlay for the whole card */}
                  <Link href={`/proyectos/${project.slug}`} className="absolute inset-0 z-10" aria-label={`Ver detalles de ${project.title}`} />

                  {/* Footer buttons (higher z-index to overlay stretched link) */}
                  <div className="relative z-20 flex justify-between items-center mt-auto border-t border-border-color pt-4 gap-4">
                    {/* Action links */}
                    <div className="flex gap-3">
                      {project.repoUrl && (
                        <a 
                          href={project.repoUrl} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-text-meta hover:text-accent-purple transition-colors p-1"
                          title="Ver Código"
                        >
                          <Code2 size={18} />
                        </a>
                      )}
                      {project.liveUrl && (
                        <a 
                          href={project.liveUrl} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-text-meta hover:text-accent-purple transition-colors p-1"
                          title="Ver Demo"
                        >
                          <Globe size={18} />
                        </a>
                      )}
                    </div>
                    
                    <span 
                      className="text-xs uppercase tracking-widest text-accent-purple group-hover:text-accent-pink font-bold transition-colors shrink-0"
                    >
                      Ver Detalles →
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}
