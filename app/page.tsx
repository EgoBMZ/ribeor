import { ThemeToggle } from "../components/ThemeToggle";

export default function Home() {
  return (
    <main className="px-8 pb-16 max-w-7xl mx-auto">
      {/* Hero Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
        <div>
          <span className="text-sm text-accent-purple uppercase tracking-wider font-semibold mb-4 block">
            HOLA, SOY EGOBMZ
          </span>
          <h1 className="text-6xl md:text-7xl mb-6">
            CONSTRUYENDO<br/>EXPERIENCIAS<br/>DIGITALES
          </h1>
          <p className="text-xl mb-10 max-w-lg">
            Desarrollador de software. Creo aplicaciones móviles, sitios web dinámicos y experiencias digitales completas para usuarios y negocios.
          </p>
          <div className="flex gap-4">
            <button className="inline-block py-3 px-6 rounded-full font-bold transition-all duration-200 bg-accent-pink text-white border-2 border-accent-pink hover:opacity-90 hover:-translate-y-1">
              VER PROYECTOS
            </button>
            <button className="inline-block py-3 px-6 rounded-full font-bold transition-all duration-200 bg-transparent text-accent-pink border-2 border-accent-pink hover:bg-accent-pink hover:text-white">
              LEER BLOG
            </button>
          </div>
        </div>

        <div className="flex justify-center items-center h-full min-h-[400px] bg-bg-secondary rounded-2xl border-none p-6">
          <div className="text-center">
            <div className="w-40 h-40 rounded-full bg-accent-purple mx-auto mb-8"></div>
            <h3 className="text-2xl">ESPACIO PARA ILUSTRACIÓN</h3>
            <p className="text-sm text-text-meta uppercase tracking-wider font-semibold mt-4">Arte vectorial con estilo orgánico</p>
          </div>
        </div>
      </section>

      {/* Lo que hago (Servicios / Áreas) */}
      <section className="mb-24">
        <h2 className="text-5xl mb-8 text-center">LO QUE HAGO</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-bg-card border border-border-color rounded-xl p-8 hover:-translate-y-2 transition-transform duration-300">
            <h3 className="text-2xl mb-4 text-accent-pink">Mobile Apps</h3>
            <p className="text-lg">Desarrollo de aplicaciones móviles nativas y multiplataforma con interfaces fluidas y excelente experiencia de usuario.</p>
          </div>
          <div className="bg-bg-card border border-border-color rounded-xl p-8 hover:-translate-y-2 transition-transform duration-300">
            <h3 className="text-2xl mb-4 text-accent-purple">Desarrollo Web</h3>
            <p className="text-lg">Sitios web modernos, rápidos y optimizados (SEO) usando las últimas tecnologías del ecosistema frontend.</p>
          </div>
          <div className="bg-bg-card border border-border-color rounded-xl p-8 hover:-translate-y-2 transition-transform duration-300">
            <h3 className="text-2xl mb-4 text-text-primary">Backend & APIs</h3>
            <p className="text-lg">Arquitectura de servidores, bases de datos en tiempo real y lógica de negocio escalable.</p>
          </div>
        </div>
      </section>

      {/* Proyectos Recientes */}
      <section className="mb-24">
        <h2 className="text-5xl mb-8">PROYECTOS RECIENTES</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="min-h-[300px] flex flex-col justify-end bg-bg-secondary rounded-2xl p-6 hover:scale-[1.02] transition-transform duration-300 group cursor-pointer">
            <div className="bg-bg-primary p-4 rounded-lg shadow-sm group-hover:shadow-md transition-shadow">
              <span className="text-sm text-text-meta uppercase tracking-wider font-semibold">APP MÓVIL</span>
              <h3 className="text-xl mt-2">Proyecto Alpha</h3>
            </div>
          </div>
          <div className="min-h-[300px] flex flex-col justify-end bg-bg-secondary rounded-2xl p-6 hover:scale-[1.02] transition-transform duration-300 group cursor-pointer">
            <div className="bg-bg-primary p-4 rounded-lg shadow-sm group-hover:shadow-md transition-shadow">
              <span className="text-sm text-text-meta uppercase tracking-wider font-semibold">PLATAFORMA WEB</span>
              <h3 className="text-xl mt-2">Proyecto Beta</h3>
            </div>
          </div>
        </div>
        <div className="text-center mt-12">
          <button className="inline-block py-3 px-6 rounded-full font-bold transition-all duration-200 bg-transparent text-accent-pink border-2 border-accent-pink hover:bg-accent-pink hover:text-white">
            VER TODOS LOS PROYECTOS
          </button>
        </div>
      </section>
    </main>
  );
}
