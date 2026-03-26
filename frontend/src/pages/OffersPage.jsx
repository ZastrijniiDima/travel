import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

const FAVORITE_STORAGE_KEY = 'oferteFavorite';

const imaginiOferta = [
  '/images/coasta-azurie.svg',
  '/images/alpi.svg',
  '/images/orase-europene.svg',
  '/images/lisabona.svg',
  '/images/bali.svg',
  '/images/viena.svg'
];

export default function OffersPage() {
  const [oferte, setOferte] = useState([]);
  const [favoriteIds, setFavoriteIds] = useState(() => {
    try {
      const value = localStorage.getItem(FAVORITE_STORAGE_KEY);
      return value ? JSON.parse(value) : [];
    } catch {
      return [];
    }
  });

  const esteAutentificat = Boolean(localStorage.getItem('token'));

  const oferteDemo = [
    {
      id: 'demo-1',
      titlu: 'Sejur in Santorini',
      descriere: 'Pachet complet cu zbor, transfer si cazare aproape de plaja.',
      destinatie: 'Grecia',
      dataPlecare: '2026-07-14',
      pret: 799,
      locuriDisponibile: 18,
      imagine: '/images/coasta-azurie.svg',
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
      imagine: '/images/orase-europene.svg',
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
      imagine: '/images/viena.svg',
      esteDemo: true
    },
    {
      id: 'demo-4',
      titlu: 'Vacanta boema in Lisabona',
      descriere: 'Atmosfera vibranta, panorame urbane superbe si bucatarie portugheza autentica.',
      destinatie: 'Portugalia',
      dataPlecare: '2026-09-05',
      pret: 619,
      locuriDisponibile: 12,
      imagine: '/images/lisabona.svg',
      esteDemo: true
    },
    {
      id: 'demo-5',
      titlu: 'Relaxare tropicala in Bali',
      descriere: 'Plaje exotice, resort premium si experiente wellness intr-un cadru de vis.',
      destinatie: 'Indonezia',
      dataPlecare: '2026-11-11',
      pret: 1299,
      locuriDisponibile: 8,
      imagine: '/images/bali.svg',
      esteDemo: true
    },
    {
      id: 'demo-6',
      titlu: 'Weekend imperial la Viena',
      descriere: 'Arhitectura clasica, cafenele istorice si concerte memorabile in centrul orasului.',
      destinatie: 'Austria',
      dataPlecare: '2026-10-01',
      pret: 459,
      locuriDisponibile: 22,
      imagine: '/images/alpi.svg',
      esteDemo: true
    }
  ];

  useEffect(() => {
    api.get('/oferte').then((r) => setOferte(r.data)).catch(() => setOferte([]));
  }, []);

  useEffect(() => {
    localStorage.setItem(FAVORITE_STORAGE_KEY, JSON.stringify(favoriteIds));
  }, [favoriteIds]);

  const oferteAfisate = useMemo(() => {
    if (oferte.length === 0) return oferteDemo;

    return oferte.map((item, index) => ({
      ...item,
      imagine: imaginiOferta[index % imaginiOferta.length],
      esteDemo: false
    }));
  }, [oferte, oferteDemo]);

  const favoriteOferte = oferteAfisate.filter((item) => favoriteIds.includes(String(item.id)));

  const toggleFavorit = (id) => {
    const key = String(id);
    setFavoriteIds((prev) => (prev.includes(key) ? prev.filter((item) => item !== key) : [...prev, key]));
  };

  return (
    <div className="container">
      <section className="offers-hero card">
        <div>
          <p className="hero-kicker">Selectie extinsa pentru urmatoarea ta vacanta</p>
          <h2>Lista ofertelor</h2>
          <p>
            Exploreaza destinatii variate, compara pachetele in functie de pret si durata,
            apoi salveaza rapid ofertele care iti plac cel mai mult.
          </p>
        </div>
        <div className="offers-hero-chip-wrap">
          <span className="offers-chip">Plaja</span>
          <span className="offers-chip">Munte</span>
          <span className="offers-chip">City Break</span>
          <span className="offers-chip">Familie</span>
          <span className="offers-chip">Cuplu</span>
        </div>
      </section>

      {esteAutentificat && (
        <section className="card favorites-panel">
          <h3>Oferte salvate de tine</h3>
          {favoriteOferte.length === 0 ? (
            <p>Nu ai salvat inca nicio oferta. Apasa pe butonul "Salveaza la favorite" din carduri.</p>
          ) : (
            <div className="favorites-list">
              {favoriteOferte.map((item) => (
                <span key={`fav-${item.id}`}>{item.titlu}</span>
              ))}
            </div>
          )}
        </section>
      )}

      <div className="grid grid-3">
        {oferteAfisate.map((o) => {
          const esteFavorit = favoriteIds.includes(String(o.id));

          return (
            <article className="card travel-card offer-card" key={o.id}>
              <img src={o.imagine} alt={o.titlu} />
              <div className="travel-card-content">
                <h3>{o.titlu}</h3>
                <p>{o.descriere}</p>
                <p><strong>Destinatie:</strong> {o.destinatie}</p>
                <p><strong>Data plecarii:</strong> {o.dataPlecare}</p>
                <p><strong>Pret:</strong> {o.pret} EUR</p>
                <p><strong>Locuri disponibile:</strong> {o.locuriDisponibile}</p>

                <div className="offer-card-actions">
                  {esteAutentificat ? (
                    <>
                      <button
                        type="button"
                        className={`btn ${esteFavorit ? 'btn-primary' : ''}`}
                        onClick={() => toggleFavorit(o.id)}
                      >
                        {esteFavorit ? 'Salvat in favorite' : 'Salveaza la favorite'}
                      </button>
                      {!o.esteDemo && (
                        <Link className="btn" to={`/rezervare/${o.id}`}>Rezerva acum</Link>
                      )}
                    </>
                  ) : (
                    <Link className="btn" to="/autentificare">Autentifica-te pentru favorite</Link>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
