import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [parola, setParola] = useState('');
  const [mesaj, setMesaj] = useState('');
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/auth/autentificare', { email, parola });
      localStorage.setItem('token', data.access_token);
      navigate('/dashboard');
    } catch (err) {
      setMesaj(err?.response?.data?.message || 'Autentificare eșuată.');
    }
  };

  return (
    <div className="container">
      <div className="card" style={{ maxWidth: 420, margin: '20px auto' }}>
        <h2>Autentificare</h2>
        <form onSubmit={submit}>
          <label>Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required />
          <label>Parolă</label>
          <input value={parola} onChange={(e) => setParola(e.target.value)} type="password" required />
          <button className="btn btn-primary" type="submit">Autentificare</button>
        </form>
        {mesaj && <p style={{ color: '#a32121' }}>{mesaj}</p>}
      </div>
    </div>
  );
}
