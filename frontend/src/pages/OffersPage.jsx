import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

export default function OffersPage() {
  const [oferte, setOferte] = useState([]);

  const oferteDemo = [
    {
      id: 'demo-1',
      titlu: 'Sejur in Santorini',
      descriere: 'Pachet complet cu zbor, transfer si cazare aproape de plaja.',
      destinatie: 'Grecia',
      dataPlecare: '2026-07-14',
      pret: 799,
      locuriDisponibile: 18,
      esteDemo: true
    },
    {
      id: 'demo-2',
      titlu: 'Circuit cultural la Roma',
      descriere: 'Tur ghidat prin cele mai importante atractii istorice si gastronomice.',
      destinatie: 'Italia',
      dataPlecare: '2026-08-02',
      pret: 529,
      locuriDisponibile: 24,
      esteDemo: true
    },
    {
      id: 'demo-3',
      titlu: 'Weekend relaxant la Praga',
      descriere: 'City break cu cazare centrala si itinerar recomandat pentru 3 zile.',
      destinatie: 'Cehia',
      dataPlecare: '2026-06-20',
      pret: 349,
      locuriDisponibile: 16,
      esteDemo: true
    }
  ];

  const oferteAfisate = oferte.length > 0 ? oferte : oferteDemo;

  useEffect(() => {
    api.get('/oferte').then((r) => setOferte(r.data)).catch(() => setOferte([]));
  }, []);

  return (
    <div className="container">
      <h2>Lista ofertelor</h2>
      {oferte.length === 0 && (
        <div className="card" style={{ marginBottom: 16 }}>
          <strong>Momentan afisam oferte demonstrative.</strong>
          <p>
            Adauga oferte reale din backend, iar aceasta pagina va afisa automat continutul din baza de date.
          </p>
        </div>
      )}
      <div className="grid grid-3">
        {oferteAfisate.map((o) => (
          <div className="card" key={o.id}>
            <h3>{o.titlu}</h3>
            <p>{o.descriere}</p>
            <p><strong>Destinație:</strong> {o.destinatie}</p>
            <p><strong>Data plecării:</strong> {o.dataPlecare}</p>
            <p><strong>Preț:</strong> {o.pret} EUR</p>
            <p><strong>Locuri disponibile:</strong> {o.locuriDisponibile}</p>
            {o.esteDemo ? (
              <Link className="btn" to="/autentificare">Autentifica-te pentru rezervare</Link>
            ) : (
              <Link className="btn btn-primary" to={`/rezervare/${o.id}`}>Rezervă acum</Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
