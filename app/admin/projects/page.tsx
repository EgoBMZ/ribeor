"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getProjects, deleteProject, Project } from "../../../lib/firebase/firestore";
import { FolderGit2, Edit2, Trash2, Plus } from "lucide-react";

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const fetchedProjects = await getProjects();
      setProjects(fetchedProjects);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (slug: string) => {
    if (!window.confirm("¿Seguro que deseas eliminar este proyecto? Esta acción no se puede deshacer.")) return;
    try {
      await deleteProject(slug);
      setProjects(projects.filter(p => p.slug !== slug));
    } catch (error) {
      console.error("Error deleting project:", error);
      alert("Hubo un error al eliminar el proyecto. Es posible que no tengas permisos.");
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-oswald text-text-primary uppercase tracking-tight flex items-center gap-2">
          <FolderGit2 /> Listado de Proyectos
        </h1>
        <Link 
          href="/admin/projects/new"
          className="flex items-center gap-2 bg-accent-purple hover:bg-opacity-90 text-white px-4 py-2 rounded-lg font-bold text-sm uppercase tracking-wider transition-colors shrink-0"
        >
          <Plus size={16} /> Crear Nuevo
        </Link>
      </div>

      {loading ? (
        <div className="py-12 text-center text-text-secondary flex justify-center items-center h-40">
          <div className="w-8 h-8 border-4 border-accent-purple border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : projects.length === 0 ? (
        <div className="py-12 text-center border border-dashed border-border-color rounded-2xl">
          <p className="text-text-secondary mb-4">No tienes ningún proyecto todavía.</p>
          <Link href="/admin/projects/new" className="text-accent-purple font-bold hover:underline">¡Añade tu primer proyecto!</Link>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {projects.map((project) => (
            <div key={project.slug} className="flex flex-col sm:flex-row justify-between sm:items-center p-4 bg-bg-primary border border-border-color rounded-xl hover:border-accent-purple transition-colors gap-4">
              <div>
                <h3 className="font-bold text-text-primary text-lg">{project.title}</h3>
                <p className="text-xs text-text-meta font-mono mt-1">/{project.slug}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Link 
                  href={`/admin/projects/${project.slug}/edit`}
                  className="p-2 text-text-secondary hover:text-accent-purple bg-bg-secondary hover:bg-bg-primary rounded-lg transition-colors"
                  title="Editar"
                >
                  <Edit2 size={18} />
                </Link>
                <button 
                  onClick={() => handleDelete(project.slug)}
                  className="p-2 text-text-secondary hover:text-red-500 bg-bg-secondary hover:bg-bg-primary rounded-lg transition-colors"
                  title="Eliminar"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
