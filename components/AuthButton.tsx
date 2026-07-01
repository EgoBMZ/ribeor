"use client";

import { useAuth } from "./AuthProvider";
import { useState, useEffect, useRef } from "react";
import { LogOut, User as UserIcon, LayoutDashboard, FileText, FolderGit2 } from "lucide-react";
import Link from "next/link";

export function AuthButton() {
  const { user, loading, login, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (loading) {
    return <div className="w-8 h-8 rounded-full bg-border-color animate-pulse"></div>;
  }

  const handleLogout = async () => {
    const confirmLogout = window.confirm("¿De verdad quieres cerrar la sesión?");
    if (confirmLogout) {
      await logout();
      setDropdownOpen(false);
    }
  };

  if (user) {
    return (
      <div className="relative" ref={dropdownRef}>
        <button 
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center gap-2 focus:outline-none hover:opacity-90 transition-opacity"
          title={user.displayName || "Usuario"}
        >
          {user.photoURL ? (
            <img 
              src={user.photoURL} 
              alt={user.displayName || "Usuario"} 
              className="w-8 h-8 rounded-full border-2 border-accent-pink object-cover"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-accent-pink flex items-center justify-center text-white font-bold text-xs">
              {user.email?.charAt(0).toUpperCase()}
            </div>
          )}
        </button>

        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-56 bg-bg-card border border-border-color rounded-xl shadow-lg py-2 z-50 animate-in fade-in slide-in-from-top-1 duration-200">
            <div className="px-4 py-2 border-b border-border-color mb-1 block">
              <p className="text-sm font-bold text-text-primary truncate">{user.displayName || "Usuario"}</p>
              <p className="text-xs text-text-meta truncate">{user.email}</p>
            </div>
            
            {user.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL && (
              <>
                <Link
                  href="/admin"
                  onClick={() => setDropdownOpen(false)}
                  className="w-full text-left px-4 py-2 text-sm text-text-primary hover:bg-bg-secondary transition-colors font-semibold flex items-center gap-2"
                >
                  <LayoutDashboard size={16} />
                  Panel de Admin
                </Link>

                <Link
                  href="/admin/projects/new"
                  onClick={() => setDropdownOpen(false)}
                  className="w-full text-left px-4 py-2 text-sm text-text-primary hover:bg-bg-secondary transition-colors font-semibold flex items-center gap-2"
                >
                  <FolderGit2 size={16} />
                  Crear Proyecto
                </Link>
                <div className="w-full h-px bg-border-color my-1"></div>
              </>
            )}

            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-sm text-accent-pink hover:bg-bg-secondary transition-colors font-semibold flex items-center gap-2"
            >
              <LogOut size={16} />
              Cerrar sesión
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <button 
      onClick={login}
      className="flex items-center gap-2 border border-border-color bg-bg-card hover:bg-bg-secondary text-text-primary px-4 py-2 rounded-full text-sm font-semibold transition-all shadow-sm hover:scale-[1.02] duration-200"
    >
      <svg className="w-4 h-4" viewBox="0 0 24 24">
        <path fill="#EA4335" d="M12 5.04c1.66 0 3.2.57 4.38 1.69l3.27-3.27C17.68 1.54 14.98 1 12 1 7.35 1 3.37 3.65 1.43 7.54l3.81 2.96C6.18 7.37 8.87 5.04 12 5.04z"/>
        <path fill="#4285F4" d="M23.49 12.27c0-.81-.07-1.59-.2-2.36H12v4.51h6.46c-.29 1.48-1.14 2.73-2.4 3.58l3.76 2.92c2.2-2.03 3.67-5.01 3.67-8.65z"/>
        <path fill="#FBBC05" d="M5.24 14.54c-.24-.72-.38-1.5-.38-2.3s.14-1.58.38-2.3L1.43 6.98C.52 8.81 0 10.85 0 13s.52 4.19 1.43 6.02l3.81-2.96z"/>
        <path fill="#34A853" d="M12 23c3.24 0 5.97-1.07 7.96-2.92l-3.76-2.92c-1.1.74-2.52 1.18-4.2 1.18-3.13 0-5.82-2.33-6.76-5.46L1.43 15.8C3.37 19.69 7.35 23 12 23z"/>
      </svg>
      <span>Inicia con Google</span>
    </button>
  );
}
