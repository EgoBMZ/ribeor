"use client";

import { useAuth } from "../../components/AuthProvider";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FileText, FolderGit2 } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const pathname = usePathname();
  const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;

  if (loading) return <div className="p-8 text-center min-h-[50vh] flex items-center justify-center">Cargando Panel de Administración...</div>;

  if (!user || user.email !== adminEmail) {
    return (
      <div className="p-8 max-w-2xl mx-auto text-center mt-20 min-h-screen">
        <h1 className="text-4xl mb-4 font-oswald text-text-primary">Acceso Denegado</h1>
        <p className="text-text-secondary">
          {!user 
            ? "Debes iniciar sesión con Google en la barra superior para acceder a esta página." 
            : "No tienes permisos de administrador para acceder a esta página."}
        </p>
      </div>
    );
  }

  const navItems = [
    { name: "Dashboard", href: "/admin", exact: true, icon: <LayoutDashboard size={18} /> },
    { name: "Posts", href: "/admin/posts", exact: false, icon: <FileText size={18} /> },
    { name: "Proyectos", href: "/admin/projects", exact: false, icon: <FolderGit2 size={18} /> },
  ];

  return (
    <div className="flex flex-col md:flex-row min-h-[70vh] w-full gap-8 pb-20">
      {/* Sidebar */}
      <aside className="w-full md:w-64 shrink-0">
        <h2 className="text-2xl font-oswald text-text-primary mb-6 uppercase tracking-tight">Panel Admin</h2>
        <nav className="flex flex-col gap-2">
          {navItems.map((item) => {
            const isActive = item.exact 
              ? pathname === item.href 
              : pathname.startsWith(item.href);
              
            return (
              <Link 
                key={item.name} 
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                  isActive 
                    ? "bg-accent-pink text-white" 
                    : "text-text-secondary hover:bg-bg-secondary hover:text-text-primary"
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-bg-card border border-border-color rounded-2xl p-6 md:p-8">
        {children}
      </main>
    </div>
  );
}
