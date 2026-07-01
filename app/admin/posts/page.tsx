"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getPosts, deletePost, BlogPost } from "../../../lib/firebase/firestore";
import { FileText, Edit2, Trash2, Plus } from "lucide-react";

export default function AdminPostsPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const fetchedPosts = await getPosts();
      setPosts(fetchedPosts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (slug: string) => {
    if (!window.confirm("¿Seguro que deseas eliminar este post? Esta acción no se puede deshacer.")) return;
    try {
      await deletePost(slug);
      setPosts(posts.filter(p => p.slug !== slug));
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Hubo un error al eliminar el post. Es posible que no tengas permisos.");
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-oswald text-text-primary uppercase tracking-tight flex items-center gap-2">
          <FileText /> Listado de Posts
        </h1>
        <Link 
          href="/admin/posts/new"
          className="flex items-center gap-2 bg-accent-pink hover:bg-opacity-90 text-white px-4 py-2 rounded-lg font-bold text-sm uppercase tracking-wider transition-colors shrink-0"
        >
          <Plus size={16} /> Crear Nuevo
        </Link>
      </div>

      {loading ? (
        <div className="py-12 text-center text-text-secondary flex justify-center items-center h-40">
          <div className="w-8 h-8 border-4 border-accent-pink border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : posts.length === 0 ? (
        <div className="py-12 text-center border border-dashed border-border-color rounded-2xl">
          <p className="text-text-secondary mb-4">No tienes ningún post todavía.</p>
          <Link href="/admin/posts/new" className="text-accent-pink font-bold hover:underline">¡Escribe tu primer post!</Link>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {posts.map((post) => (
            <div key={post.slug} className="flex flex-col sm:flex-row justify-between sm:items-center p-4 bg-bg-primary border border-border-color rounded-xl hover:border-accent-pink transition-colors gap-4">
              <div>
                <h3 className="font-bold text-text-primary text-lg">{post.title}</h3>
                <p className="text-xs text-text-meta font-mono mt-1">/{post.slug}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Link 
                  href={`/admin/posts/${post.slug}/edit`}
                  className="p-2 text-text-secondary hover:text-accent-pink bg-bg-secondary hover:bg-bg-primary rounded-lg transition-colors"
                  title="Editar"
                >
                  <Edit2 size={18} />
                </Link>
                <button 
                  onClick={() => handleDelete(post.slug)}
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
