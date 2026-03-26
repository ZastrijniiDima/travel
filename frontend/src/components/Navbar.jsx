import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/autentificare');
  };

  return (
    <header style={{ borderBottom: '1px solid #dbe7dc', background: '#ffffffcc', backdropFilter: 'blur(4px)' }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <strong>Bilete de Vacanță</strong>
        <nav style={{ display: 'flex', gap: 14 }}>
          <Link to="/">Acasă</Link>
          <Link to="/oferte">Lista ofertelor</Link>
          {token && <Link to="/salvate">Salvate</Link>}
          {!token && <Link to="/autentificare">Autentificare</Link>}
          {!token && <Link to="/inregistrare">Înregistrare</Link>}
          {token && <button className="btn btn-primary" onClick={logout}>Ieșire</button>}
        </nav>
      </div>
    </header>
  );
}
