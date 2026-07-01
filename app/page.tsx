import { ThemeToggle } from "../components/ThemeToggle";

export default function Home() {
  return (
    <main style={{ padding: "4rem 2rem", maxWidth: "1200px", margin: "0 auto" }}>
      {/* Header */}
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4rem" }}>
        <h2 style={{ fontSize: "2rem", margin: 0 }}>RIBEOR</h2>
        <nav style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
          <a href="#" className="metadata" style={{ textDecoration: "none" }}>Proyectos</a>
          <a href="#" className="metadata" style={{ textDecoration: "none" }}>Blog</a>
          <a href="#" className="metadata" style={{ textDecoration: "none" }}>Apps</a>
          <ThemeToggle />
        </nav>
      </header>

      {/* Hero Section */}
      <section style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center", marginBottom: "6rem" }}>
        <div>
          <span className="metadata" style={{ color: "var(--accent-purple)", marginBottom: "1rem", display: "block" }}>
            HOLA, SOY EGOBMZ
          </span>
          <h1 style={{ fontSize: "5rem", marginBottom: "1.5rem" }}>
            CONSTRUYENDO<br/>EXPERIENCIAS<br/>DIGITALES
          </h1>
          <p style={{ fontSize: "1.25rem", marginBottom: "2.5rem", maxWidth: "500px" }}>
            Desarrollador de software. Creo aplicaciones móviles, sitios web dinámicos y experiencias digitales completas para usuarios y negocios.
          </p>
          <div style={{ display: "flex", gap: "1rem" }}>
            <button className="btn btn-primary">VER PROYECTOS</button>
            <button className="btn btn-outline">LEER BLOG</button>
          </div>
        </div>

        <div className="card" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%", minHeight: "400px", backgroundColor: "var(--bg-secondary)", border: "none" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ width: "150px", height: "150px", borderRadius: "50%", backgroundColor: "var(--accent-purple)", margin: "0 auto 2rem auto" }}></div>
            <h3 style={{ fontSize: "1.5rem" }}>ESPACIO PARA ILUSTRACIÓN</h3>
            <p className="metadata" style={{ marginTop: "1rem" }}>Arte vectorial con estilo orgánico</p>
          </div>
        </div>
      </section>

      {/* Lo que hago (Servicios / Áreas) */}
      <section style={{ marginBottom: "6rem" }}>
        <h2 style={{ fontSize: "3rem", marginBottom: "2rem", textAlign: "center" }}>LO QUE HAGO</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
          <div className="card" style={{ backgroundColor: "var(--bg-card)" }}>
            <h3 style={{ fontSize: "1.5rem", marginBottom: "1rem", color: "var(--accent-pink)" }}>Mobile Apps</h3>
            <p>Desarrollo de aplicaciones móviles nativas y multiplataforma con interfaces fluidas y excelente experiencia de usuario.</p>
          </div>
          <div className="card" style={{ backgroundColor: "var(--bg-card)" }}>
            <h3 style={{ fontSize: "1.5rem", marginBottom: "1rem", color: "var(--accent-purple)" }}>Desarrollo Web</h3>
            <p>Sitios web modernos, rápidos y optimizados (SEO) usando las últimas tecnologías del ecosistema frontend.</p>
          </div>
          <div className="card" style={{ backgroundColor: "var(--bg-card)" }}>
            <h3 style={{ fontSize: "1.5rem", marginBottom: "1rem", color: "var(--text-primary)" }}>Backend & APIs</h3>
            <p>Arquitectura de servidores, bases de datos en tiempo real y lógica de negocio escalable.</p>
          </div>
        </div>
      </section>

      {/* Proyectos Recientes */}
      <section style={{ marginBottom: "6rem" }}>
        <h2 style={{ fontSize: "3rem", marginBottom: "2rem" }}>PROYECTOS RECIENTES</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
          <div className="card" style={{ minHeight: "300px", display: "flex", flexDirection: "column", justifyContent: "flex-end", backgroundColor: "var(--bg-secondary)", border: "none" }}>
            <div style={{ backgroundColor: "var(--bg-primary)", padding: "1rem", borderRadius: "8px" }}>
              <span className="metadata">APP MÓVIL</span>
              <h3 style={{ fontSize: "1.2rem", marginTop: "0.5rem" }}>Proyecto Alpha</h3>
            </div>
          </div>
          <div className="card" style={{ minHeight: "300px", display: "flex", flexDirection: "column", justifyContent: "flex-end", backgroundColor: "var(--bg-secondary)", border: "none" }}>
            <div style={{ backgroundColor: "var(--bg-primary)", padding: "1rem", borderRadius: "8px" }}>
              <span className="metadata">PLATAFORMA WEB</span>
              <h3 style={{ fontSize: "1.2rem", marginTop: "0.5rem" }}>Proyecto Beta</h3>
            </div>
          </div>
        </div>
        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <button className="btn btn-outline">VER TODOS LOS PROYECTOS</button>
        </div>
      </section>
    </main>
  );
}
