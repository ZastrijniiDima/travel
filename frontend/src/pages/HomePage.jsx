import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="container">
      <section className="card" style={{ padding: 32 }}>
        <h1 style={{ marginTop: 0 }}>Sistem de rezervare bilete de vacanță</h1>
        <p>Descoperă oferte turistice, rezervă rapid și gestionează vacanțele tale dintr-un panou modern.</p>
        <div style={{ display: 'flex', gap: 12 }}>
          <Link to="/oferte" className="btn btn-primary">Vezi ofertele</Link>
          <Link to="/inregistrare" className="btn">Creează cont</Link>
        </div>
      </section>
    </div>
  );
}
