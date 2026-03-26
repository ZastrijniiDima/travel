export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-wrap">
        <div>
          <h4>Bilete de Vacanta</h4>
          <p>
            Platforma ta pentru rezervari rapide, oferte atent selectionate si planuri de calatorie
            fara stres.
          </p>
        </div>
        <div>
          <h4>Pagini utile</h4>
          <p>Acasa</p>
          <p>Lista ofertelor</p>
          <p>Autentificare / Inregistrare</p>
        </div>
        <div>
          <h4>Contact</h4>
          <p>Email: suport@biletevacanta.ro</p>
          <p>Program: Luni - Vineri, 09:00 - 18:00</p>
          <p>Telefon: +40 731 000 111</p>
        </div>
      </div>
      <div className="footer-copy">© {new Date().getFullYear()} Bilete de Vacanta. Toate drepturile rezervate.</div>
    </footer>
  );
}
