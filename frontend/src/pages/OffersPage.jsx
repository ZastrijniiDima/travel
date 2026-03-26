import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

export default function OffersPage() {
  const [oferte, setOferte] = useState([]);

  useEffect(() => {
    api.get('/oferte').then((r) => setOferte(r.data)).catch(() => setOferte([]));
  }, []);

  return (
    <div className="container">
      <h2>Lista ofertelor</h2>
      <div className="grid grid-3">
        {oferte.map((o) => (
          <div className="card" key={o.id}>
            <h3>{o.titlu}</h3>
            <p>{o.descriere}</p>
            <p><strong>Destinație:</strong> {o.destinatie}</p>
            <p><strong>Data plecării:</strong> {o.dataPlecare}</p>
            <p><strong>Preț:</strong> {o.pret} EUR</p>
            <p><strong>Locuri disponibile:</strong> {o.locuriDisponibile}</p>
            <Link className="btn btn-primary" to={`/rezervare/${o.id}`}>Rezervă acum</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
