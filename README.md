/**
 * File: frontend/src/styles/App.css
 * Layout styles for App shell (header, main, footer)
 */

.app-main {
  max-width: 1100px;
  margin: 0 auto;
  padding: 2rem 1.5rem 4rem;
  min-height: calc(100vh - 140px);
}

.app-footer {
  text-align: center;
  padding: 1.5rem;
  font-size: 0.8rem;
  color: var(--muted);
  border-top: 1px solid var(--cream-dark);
  background: var(--cream-dark);
}

/* ─── Header ─────────────────────────────────────────────────────────────── */
.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.2rem 2.5rem;
  background: var(--ink);
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 2px 12px rgba(0,0,0,.25);
}

.header-logo {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  cursor: pointer;
}

.header-logo-icon {
  width: 36px;
  height: 36px;
  background: var(--gold);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
}

.header-logo-text {
  font-family: 'Playfair Display', serif;
  font-size: 1.4rem;
  color: var(--cream);
  letter-spacing: 0.02em;
}

.header-logo-text span {
  color: var(--gold);
}

.header-tagline {
  font-size: 0.78rem;
  color: var(--muted);
  letter-spacing: 0.12em;
  text-transform: uppercase;
}
