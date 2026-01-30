export default function Navbar() {
  return (
    <header className="nav" role="banner">
      <div className="navInner">
        <a className="brand" href="#home" aria-label="Ir para Home">
          GTA VI<span className="brandDot">.</span>
        </a>

        <nav aria-label="Navegação principal">
          <ul className="navLinks">
            <li>
              <a className="navLink" href="#home">
                Home
              </a>
            </li>
            <li>
              <a className="navLink" href="#trailers">
                Trailers
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
