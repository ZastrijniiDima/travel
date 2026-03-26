import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const FAVORITE_STORAGE_KEY = 'oferteFavorite';

// Demo offers with images
const imaginiOferta = {
  1: '/images/coasta-azurie.svg',
  2: '/images/alpi.svg',
  3: '/images/orase-europene.svg',
  4: '/images/lisabona.svg',
  5: '/images/bali.svg',
  6: '/images/viena.svg',
};

const oferteDemo = [
  { id: 1, titlu: 'Sejur în Santorini', destinatie: 'Grecia', pret: 799, esteDemo: true },
  { id: 2, titlu: 'Circuit cultural la Roma', destinatie: 'Italia', pret: 529, esteDemo: true },
  { id: 3, titlu: 'Weekend relaxant la Praga', destinatie: 'Republica Cehă', pret: 349, esteDemo: true },
  { id: 4, titlu: 'Vacanță boemă în Lisabona', destinatie: 'Portugalia', pret: 619, esteDemo: true },
  { id: 5, titlu: 'Relaxare tropicală în Bali', destinatie: 'Indonezia', pret: 1299, esteDemo: true },
  { id: 6, titlu: 'Weekend imperial la Viena', destinatie: 'Austria', pret: 459, esteDemo: true },
];

export default function SavedPage() {
  const navigate = useNavigate();
  const [oferte, setOferte] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favoriteIds, setFavoriteIds] = useState([]);

  // Load favorites from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(FAVORITE_STORAGE_KEY);
    if (saved) {
      try {
        setFavoriteIds(JSON.parse(saved));
      } catch (e) {
        setFavoriteIds([]);
      }
    }
  }, []);

  // Fetch offers from API, fallback to demo
  useEffect(() => {
    api
      .get('/vacation-packages')
      .then((res) => {
        setOferte(res.data && res.data.length > 0 ? res.data : oferteDemo);
      })
      .catch(() => {
        setOferte(oferteDemo);
      })
      .finally(() => setLoading(false));
  }, []);

  // Filter only saved offers
  const savedOffers = oferte.filter((o) => favoriteIds.includes(String(o.id)));

  const toggleFavorit = (id) => {
    const key = String(id);
    setFavoriteIds((prev) => (prev.includes(key) ? prev.filter((item) => item !== key) : [...prev, key]));
  };

  return (
    <div style={{ backgroundImage: 'linear-gradient(135deg, #e8f3ed 0%, #f5f7f4 100%)', minHeight: '80vh', padding: '40px 0' }}>
      <div className="container">
        <h1 style={{ textAlign: 'center', marginBottom: '40px', color: '#1f7a4c' }}>Ofertele tale salvate</h1>

        {loading && <p style={{ textAlign: 'center' }}>Se încarcă...</p>}

        {!loading && savedOffers.length === 0 && (
          <div
            style={{
              textAlign: 'center',
              padding: '40px',
              background: 'white',
              borderRadius: '8px',
              border: '1px solid #dbe7dc',
            }}
          >
            <p style={{ fontSize: '16px', color: '#666', marginBottom: '20px' }}>
              Nu ai salvat nicio ofertă încă.
            </p>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => navigate('/oferte')}
              style={{ cursor: 'pointer' }}
            >
              Mergi la oferte
            </button>
          </div>
        )}

        {!loading && savedOffers.length > 0 && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
            {savedOffers.map((o) => (
              <div
                key={o.id}
                style={{
                  background: 'white',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  cursor: 'pointer',
                  ':hover': { transform: 'translateY(-4px)', boxShadow: '0 8px 16px rgba(0,0,0,0.15)' },
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                }}
              >
                <img
                  src={imaginiOferta[o.id] || '/images/coasta-azurie.svg'}
                  alt={o.titlu}
                  style={{ width: '100%', height: '180px', objectFit: 'cover' }}
                />
                <div style={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', color: '#1f7a4c' }}>{o.titlu}</h3>
                  <p style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#666' }}>
                    📍 {o.destinatie}
                  </p>
                  <p style={{ margin: '8px 0', fontSize: '14px', color: '#999' }}>
                    {o.locuriDisponibile || 'Locuri disponibile'} locuri
                  </p>
                  <p style={{ margin: '8px 0 16px 0', fontSize: '18px', fontWeight: 'bold', color: '#f2a541' }}>
                    €{o.pret}
                  </p>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => toggleFavorit(o.id)}
                    style={{ marginTop: 'auto', cursor: 'pointer' }}
                  >
                    Șterge din favorite
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
