import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';

export default function BookingPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [numarPersoane, setNumarPersoane] = useState(1);
  const [mesaj, setMesaj] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/rezervari', { vacationPackageId: Number(id), numarPersoane: Number(numarPersoane) });
      setMesaj('Rezervarea a fost realizată cu succes.');
      setTimeout(() => navigate('/dashboard'), 800);
    } catch (err) {
      setMesaj(err?.response?.data?.message || 'Rezervarea a eșuat.');
    }
  };

  return (
    <div className="container">
      <div className="card" style={{ maxWidth: 500 }}>
        <h2>Pagina rezervare</h2>
        <form onSubmit={submit}>
          <label>Număr persoane</label>
          <input
            type="number"
            min="1"
            value={numarPersoane}
            onChange={(e) => setNumarPersoane(e.target.value)}
            required
          />
          <button className="btn btn-primary" type="submit">Confirmă rezervarea</button>
        </form>
        {mesaj && <p>{mesaj}</p>}
      </div>
    </div>
  );
}
