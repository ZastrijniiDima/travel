import { useEffect, useState } from 'react';
import api from '../api';

export default function DashboardPage() {
  const [rezervari, setRezervari] = useState([]);

  useEffect(() => {
    api.get('/rezervari/ale-mele').then((r) => setRezervari(r.data)).catch(() => setRezervari([]));
  }, []);

  return (
    <div className="container">
      <h2>Panou de control</h2>
      <div className="card">
        <h3>Rezervările mele</h3>
        {rezervari.length === 0 && <p>Nu ai încă rezervări.</p>}
        {rezervari.map((r) => (
          <div key={r.id} style={{ borderBottom: '1px solid #dbe7dc', padding: '10px 0' }}>
            <strong>Rezervare #{r.id}</strong>
            <p>Status: {r.status}</p>
            <p>Număr persoane: {r.numarPersoane}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
