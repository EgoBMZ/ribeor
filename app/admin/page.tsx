"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { 
  getGlobalVisits, 
  getUsersCount, 
  getPosts, 
  getProjects, 
  BlogPost, 
  Project 
} from "../../lib/firebase/firestore";
import { 
  TrendingUp, 
  Users, 
  FileText, 
  FolderGit2, 
  ArrowUpRight, 
  Plus, 
  Eye 
} from "lucide-react";

export default function AdminDashboardPage() {
  const [visits, setVisits] = useState<number>(0);
  const [usersCount, setUsersCount] = useState<number>(0);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [projectsCount, setProjectsCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const [v, u, pts, prjs] = await Promise.all([
          getGlobalVisits(),
          getUsersCount(),
          getPosts(),
          getProjects()
        ]);
        setVisits(v);
        setUsersCount(u);
        setPosts(pts);
        setProjectsCount(prjs.length);
      } catch (error) {
        console.error("Error loading stats:", error);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  // Sort posts by views to find the top ones
  const topPosts = [...posts]
    .filter(post => post.views && post.views > 0)
    .sort((a, b) => (b.views || 0) - (a.views || 0))
    .slice(0, 5);

  const stats = [
    { 
      name: "Visitas Totales", 
      value: visits, 
      icon: <TrendingUp className="text-accent-pink" size={24} />, 
      bg: "bg-accent-pink/10",
      description: "Visitas únicas por sesión"
    },
    { 
      name: "Usuarios Registrados", 
      value: usersCount, 
      icon: <Users className="text-accent-purple" size={24} />, 
      bg: "bg-accent-purple/10",
      description: "Logueados con Google"
    },
    { 
      name: "Artículos Publicados", 
      value: posts.length, 
      icon: <FileText className="text-blue-500" size={24} />, 
      bg: "bg-blue-500/10",
      description: "En el blog público"
    },
    { 
      name: "Proyectos Añadidos", 
      value: projectsCount, 
      icon: <FolderGit2 className="text-emerald-500" size={24} />, 
      bg: "bg-emerald-500/10",
      description: "En tu portafolio"
    },
  ];

  if (loading) {
    return (
      <div className="py-20 flex justify-center items-center">
        <div className="w-8 h-8 border-4 border-accent-pink border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-oswald text-text-primary uppercase tracking-tight mb-2">Métricas y Analíticas</h1>
        <p className="text-text-secondary">Visión general en tiempo real del rendimiento de tu sitio web.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div 
            key={i} 
            className="flex flex-col gap-4 p-6 rounded-2xl border border-border-color bg-bg-primary hover:border-border-color/80 transition-all shadow-sm"
          >
            <div className="flex justify-between items-start">
              <span className="text-3xl font-bold text-text-primary font-mono tracking-tight">
                {stat.value}
              </span>
              <div className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center`}>
                {stat.icon}
              </div>
            </div>
            <div>
              <h3 className="text-sm uppercase font-bold tracking-wider text-text-meta">{stat.name}</h3>
              <p className="text-xs text-text-secondary mt-1">{stat.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Top Posts Table */}
        <div className="lg:col-span-2 flex flex-col gap-4 p-6 rounded-2xl border border-border-color bg-bg-primary">
          <h2 className="text-xl font-bold text-text-primary flex items-center gap-2">
            <Eye size={20} className="text-accent-pink" /> Artículos Más Leídos (Top 5)
          </h2>
          {topPosts.length === 0 ? (
            <div className="py-10 text-center text-text-secondary text-sm border border-dashed border-border-color rounded-xl">
              Aún no hay visualizaciones registradas en tus artículos.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-border-color text-text-meta uppercase text-xs tracking-wider">
                    <th className="pb-3 font-bold">Título</th>
                    <th className="pb-3 font-bold text-right">Visualizaciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-color">
                  {topPosts.map((post, i) => (
                    <tr key={i} className="hover:bg-bg-secondary/40 transition-colors">
                      <td className="py-3 font-medium text-text-primary max-w-xs sm:max-w-sm truncate">
                        <Link href={`/blog/${post.slug}`} target="_blank" className="hover:underline flex items-center gap-1">
                          {post.title} <ArrowUpRight size={14} className="opacity-40" />
                        </Link>
                      </td>
                      <td className="py-3 text-right font-bold text-accent-pink font-mono text-base">
                        {post.views || 0}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Quick Actions Panel */}
        <div className="flex flex-col gap-4 p-6 rounded-2xl border border-border-color bg-bg-primary">
          <h2 className="text-xl font-bold text-text-primary">Accesos Rápidos</h2>
          <p className="text-xs text-text-secondary mb-2">Comienza a publicar contenido nuevo de inmediato.</p>
          
          <div className="flex flex-col gap-3">
            <Link 
              href="/admin/posts/new"
              className="flex items-center justify-between p-4 rounded-xl border border-border-color bg-bg-secondary/30 hover:border-accent-pink transition-colors font-semibold text-sm group"
            >
              <span className="flex items-center gap-2">
                <FileText size={18} className="text-accent-pink" />
                Redactar Artículo
              </span>
              <Plus size={16} className="opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all" />
            </Link>

            <Link 
              href="/admin/projects/new"
              className="flex items-center justify-between p-4 rounded-xl border border-border-color bg-bg-secondary/30 hover:border-accent-purple transition-colors font-semibold text-sm group"
            >
              <span className="flex items-center gap-2">
                <FolderGit2 size={18} className="text-accent-purple" />
                Añadir Proyecto
              </span>
              <Plus size={16} className="opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
