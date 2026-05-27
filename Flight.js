/**
 * File: frontend/src/components/Form.css
 */

/* ─── Hero ───────────────────────────────────────────────────────────────── */
.form-section {
  padding-top: 2.5rem;
}

.form-hero {
  text-align: center;
  margin-bottom: 2.5rem;
}

.form-hero-title {
  font-size: clamp(2rem, 5vw, 3.2rem);
  color: var(--ink);
  margin-bottom: 0.75rem;
}

.form-hero-title em {
  color: var(--teal);
  font-style: italic;
}

.form-hero-sub {
  font-size: 1rem;
  color: var(--muted);
  max-width: 520px;
  margin: 0 auto;
}

/* ─── Card ───────────────────────────────────────────────────────────────── */
.form-card {
  background: var(--white);
  border-radius: var(--radius-lg);
  padding: 2.5rem 3rem;
  box-shadow: var(--shadow-md);
  max-width: 860px;
  margin: 0 auto;
}

/* ─── Error banner ───────────────────────────────────────────────────────── */
.form-errors {
  background: #fff5f5;
  border: 1px solid #f5c6c6;
  border-left: 4px solid var(--danger);
  border-radius: var(--radius);
  padding: 1rem 1.25rem;
  margin-bottom: 1.5rem;
  color: var(--danger);
  font-size: 0.88rem;
}

.form-errors ul {
  margin-top: 0.4rem;
  padding-left: 1.2rem;
}

.form-errors li { margin-top: 0.2rem; }

/* ─── Row / Group ────────────────────────────────────────────────────────── */
.form-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.25rem;
  margin-bottom: 1.25rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.form-group--full {
  margin-bottom: 1.25rem;
}

label {
  font-size: 0.82rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--muted);
}

.required { color: var(--gold); }
.optional { font-weight: 400; text-transform: none; letter-spacing: 0; color: #b0a898; font-size: 0.8rem; }

input[type="text"],
input[type="number"],
input[type="date"] {
  border: 1.5px solid var(--cream-dark);
  border-radius: var(--radius);
  padding: 0.7rem 1rem;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.95rem;
  color: var(--ink);
  background: var(--cream);
  transition: var(--transition);
  width: 100%;
  outline: none;
}

input:focus {
  border-color: var(--teal);
  background: var(--white);
  box-shadow: 0 0 0 3px rgba(13,92,99,.1);
}

/* Budget prefix */
.input-prefix-wrap {
  position: relative;
  display: flex;
  align-items: center;
}

.input-prefix {
  position: absolute;
  left: 0.9rem;
  color: var(--teal);
  font-weight: 600;
  font-size: 1rem;
  pointer-events: none;
}

.input-prefix-wrap input {
  padding-left: 1.8rem;
}

/* ─── Preferences ────────────────────────────────────────────────────────── */
.pref-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-top: 0.3rem;
}

.pref-chip {
  padding: 0.45rem 1rem;
  border-radius: 30px;
  border: 1.5px solid var(--cream-dark);
  background: var(--cream);
  font-size: 0.85rem;
  font-family: 'DM Sans', sans-serif;
  cursor: pointer;
  transition: var(--transition);
  color: var(--ink);
}

.pref-chip:hover {
  border-color: var(--teal);
  color: var(--teal);
}

.pref-chip--selected {
  background: var(--teal);
  border-color: var(--teal);
  color: var(--white);
}

/* ─── Summary bar ────────────────────────────────────────────────────────── */
.form-summary {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
  background: rgba(13,92,99,.06);
  border-radius: var(--radius);
  padding: 0.75rem 1.25rem;
  margin-bottom: 1.5rem;
  font-size: 0.85rem;
  color: var(--teal);
  font-weight: 500;
}

/* ─── Submit button ──────────────────────────────────────────────────────── */
.btn-generate {
  width: 100%;
  background: linear-gradient(135deg, var(--teal) 0%, var(--teal-light) 100%);
  color: var(--white);
  border: none;
  border-radius: var(--radius);
  padding: 1rem 2rem;
  font-family: 'DM Sans', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  transition: var(--transition);
  letter-spacing: 0.02em;
}

.btn-generate:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(13,92,99,.35);
}

.btn-generate:active { transform: translateY(0); }

.btn-arrow {
  font-size: 1.2rem;
  transition: transform 0.2s;
}

.btn-generate:hover .btn-arrow { transform: translateX(4px); }

/* ─── Responsive ─────────────────────────────────────────────────────────── */
@media (max-width: 600px) {
  .form-card { padding: 1.5rem 1.25rem; }
}
