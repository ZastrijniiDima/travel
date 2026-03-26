import { Link } from 'react-router-dom';

export default function HomePage() {
  const esteAutentificat = Boolean(localStorage.getItem('token'));

  const sugestii = [
    {
      titlu: 'Escapada la Coasta Azurie',
      durata: '7 zile',
      buget: 'de la 899 EUR',
      text: 'Plaje spectaculoase, hoteluri elegante si excursii optionale in orasele de pe Riviera.',
      imagine: '/images/coasta-azurie.svg'
    },
    {
      titlu: 'Aventura in Alpi',
      durata: '5 zile',
      buget: 'de la 649 EUR',
      text: 'Drumetii panoramice, aer curat si activitati montane pentru cupluri sau grupuri de prieteni.',
      imagine: '/images/alpi.svg'
    },
    {
      titlu: 'City Break in Orase Europene',
      durata: '3 zile',
      buget: 'de la 299 EUR',
      text: 'Descopera cultura locala, gastronomia autentica si atractiile emblematice in ritmul tau.',
      imagine: '/images/orase-europene.svg'
    }
  ];

  return (
    <div className="container">
      <section className="hero-home card">
        <div>
          <p className="hero-kicker">Planifica-ti concediul inteligent</p>
          <h1>Sistem modern pentru rezervare bilete de vacanta</h1>
          <p>
            Gasesti rapid destinatii atractive, compari ofertele in functie de buget si finalizezi
            rezervarea in doar cateva minute. Platforma este construita pentru claritate, viteza si
            siguranta.
          </p>
          <p>
            Fie ca visezi la mare, munte sau city break, ai la dispozitie un spatiu simplu de utilizat
            pentru a-ti organiza urmatoarea experienta.
          </p>
          <div className="hero-actions">
            <Link to="/oferte" className="btn btn-primary">Vezi ofertele</Link>
            {!esteAutentificat && <Link to="/inregistrare" className="btn">Creeaza cont</Link>}
          </div>
        </div>
        <div className="hero-note">
          <h3>De ce sa alegi platforma noastra?</h3>
          <ul>
            <li>Rezervare online rapida si intuitiva</li>
            <li>Oferte variate pentru toate preferintele</li>
            <li>Panou de control pentru rezervarile tale</li>
            <li>Informatii clare despre costuri si disponibilitate</li>
          </ul>
        </div>
      </section>

      <section>
        <div className="section-title-wrap">
          <h2>Propuneri de calatorie populare</h2>
          <Link to="/oferte" className="home-more-link">Vezi toate ofertele</Link>
        </div>
        <div className="grid grid-3">
          {sugestii.map((item) => (
            <article className="card travel-card" key={item.titlu}>
              <img src={item.imagine} alt={item.titlu} />
              <div className="travel-card-content">
                <h3>{item.titlu}</h3>
                <p>{item.text}</p>
                <p><strong>Durata:</strong> {item.durata}</p>
                <p><strong>Buget orientativ:</strong> {item.buget}</p>
                <Link className="btn btn-primary" to="/oferte">Rezerva acum</Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="card benefits-strip">
        <div>
          <h3>Consultanta si ghidare</h3>
          <p>Primesti recomandari personalizate pentru tipul tau de vacanta.</p>
        </div>
        <div>
          <h3>Transparenta costurilor</h3>
          <p>Afisam clar preturile, serviciile incluse si conditiile rezervarii.</p>
        </div>
        <div>
          <h3>Experienta unificata</h3>
          <p>De la alegerea destinatiei pana la confirmare, totul se face dintr-un singur loc.</p>
        </div>
      </section>
    </div>
  );
}
