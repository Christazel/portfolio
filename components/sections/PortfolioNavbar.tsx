export default function PortfolioNavbar() {
  return (
    <header className="sticky top-3 z-50 px-3 sm:top-4">
      <div className="container-page">
        <div className="navbar-glass">
          <nav className="nav-menu" aria-label="Primary navigation">
            <a className="nav-glass-link" href="#about">
              <span>About Me</span>
            </a>
            <a className="nav-glass-link" href="#skills">
              <span>Skill Stack</span>
            </a>
            <a className="nav-glass-link" href="#projects">
              <span>Projects</span>
            </a>
            <a className="nav-glass-link" href="#contact">
              <span>Contact</span>
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
