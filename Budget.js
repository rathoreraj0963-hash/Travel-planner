/**
 * File: frontend/src/components/Itinerary.css
 */

.itin-wrapper {
  max-width: 900px;
  margin: 0 auto;
}

.itin-section {
  margin-bottom: 2rem;
}

.section-title {
  font-size: 1.3rem;
  color: var(--teal);
  margin-bottom: 0.25rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.section-sub {
  font-size: 0.82rem;
  color: var(--muted);
  margin-bottom: 0.75rem;
}

/* ─── Summary ────────────────────────────────────────────────────────────── */
.itin-summary-card {
  background: linear-gradient(135deg, var(--teal) 0%, #0a4a50 100%);
  border-radius: var(--radius-lg);
  padding: 2.5rem 3rem;
  color: var(--white);
  margin-bottom: 2rem;
  position: relative;
  overflow: hidden;
}

.itin-summary-card::before {
  content: '✈';
  position: absolute;
  right: 2rem;
  top: 1rem;
  font-size: 8rem;
  opacity: 0.06;
  line-height: 1;
}

.itin-summary-destination {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;
}

.itin-summary-destination h1 {
  font-size: clamp(2rem, 5vw, 3rem);
  color: var(--white);
  margin: 0;
}

.budget-badge {
  padding: 0.35rem 0.9rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  font-family: 'DM Sans', sans-serif;
}

.badge--success { background: rgba(46,200,120,.25); color: #6eefaa; border: 1px solid rgba(46,200,120,.4); }
.badge--warn    { background: rgba(255,193,7,.2);   color: #ffd54f; border: 1px solid rgba(255,193,7,.4); }
.badge--danger  { background: rgba(239,83,80,.2);   color: #ff8a80; border: 1px solid rgba(239,83,80,.4); }

.itin-summary-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.meta-icon { font-size: 1.3rem; }

.meta-label {
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  opacity: 0.65;
}

.meta-value {
  font-size: 0.95rem;
  font-weight: 600;
}

.meta-item.savings .meta-value { color: #6eefaa; }

.itin-prefs {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-top: 1.25rem;
}

.pref-tag {
  background: rgba(255,255,255,.12);
  border: 1px solid rgba(255,255,255,.2);
  border-radius: 20px;
  padding: 0.25rem 0.75rem;
  font-size: 0.78rem;
  color: rgba(255,255,255,.85);
  text-transform: capitalize;
}

/* ─── Flight Card ────────────────────────────────────────────────────────── */
.flight-card, .hotel-card, .budget-card {
  background: var(--white);
  border-radius: var(--radius-lg);
  padding: 1.75rem 2rem;
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--cream-dark);
}

.flight-airline {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.flight-badge {
  background: var(--teal);
  color: var(--white);
  font-size: 0.72rem;
  font-weight: 700;
  padding: 0.2rem 0.6rem;
  border-radius: 4px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.flight-no { color: var(--muted); font-size: 0.88rem; }

.flight-route {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.25rem;
  justify-content: center;
}

.flight-city {
  font-family: 'Playfair Display', serif;
  font-size: 1.3rem;
  color: var(--ink);
  text-align: center;
}

.flight-line {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: var(--teal);
  font-size: 0.9rem;
  flex: 1;
  justify-content: center;
}

.flight-icon { font-size: 1rem; }

.flight-details, .hotel-details {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1rem;
  border-top: 1px solid var(--cream-dark);
  padding-top: 1rem;
}

.flight-detail-item, .hotel-detail-item {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.detail-label {
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  color: var(--muted);
}

.flight-price strong, .hotel-price strong {
  font-size: 1.3rem;
  color: var(--teal);
}

/* ─── Hotel Card ─────────────────────────────────────────────────────────── */
.hotel-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.hotel-header h3 {
  font-size: 1.2rem;
  color: var(--ink);
}

.hotel-area { font-size: 0.85rem; color: var(--muted); }

.hotel-stars { font-size: 1.1rem; color: var(--gold); letter-spacing: 2px; }

.hotel-amenities {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
}

.amenity-tag {
  background: var(--cream);
  border: 1px solid var(--cream-dark);
  border-radius: 20px;
  padding: 0.2rem 0.7rem;
  font-size: 0.78rem;
  color: var(--muted);
}

.amenity-tag--green { background: rgba(46,125,92,.1); border-color: rgba(46,125,92,.25); color: var(--success); }

/* ─── Budget ─────────────────────────────────────────────────────────────── */
.budget-bars { display: flex; flex-direction: column; gap: 1rem; margin-bottom: 1.5rem; }

.budget-bar-row { display: flex; align-items: center; gap: 0.75rem; }

.budget-bar-label {
  display: flex;
  justify-content: space-between;
  width: 180px;
  font-size: 0.88rem;
  flex-shrink: 0;
}

.budget-bar-track {
  flex: 1;
  height: 8px;
  background: var(--cream-dark);
  border-radius: 4px;
  overflow: hidden;
}

.budget-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--teal), var(--gold));
  border-radius: 4px;
  transition: width 0.8s ease;
}

.budget-bar-pct {
  width: 36px;
  text-align: right;
  font-size: 0.78rem;
  color: var(--muted);
}

.budget-totals {
  border-top: 1px solid var(--cream-dark);
  padding-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.budget-total-row {
  display: flex;
  justify-content: space-between;
  font-size: 0.92rem;
}

.budget-saved { color: var(--success); font-weight: 600; }

/* ─── Day Card ───────────────────────────────────────────────────────────── */
.day-list { display: flex; flex-direction: column; gap: 0.6rem; }

.day-card {
  background: var(--white);
  border-radius: var(--radius);
  border: 1px solid var(--cream-dark);
  overflow: hidden;
  transition: var(--transition);
}

.day-card:hover { box-shadow: var(--shadow-sm); }
.day-card--open { border-color: var(--teal); }

.day-card-header {
  display: grid;
  grid-template-columns: 60px 1fr 1fr 30px;
  align-items: center;
  gap: 1rem;
  padding: 0.9rem 1.25rem;
  cursor: pointer;
}

.day-number {
  font-family: 'Playfair Display', serif;
  font-size: 1rem;
  color: var(--teal);
  font-weight: 700;
}

.day-date { font-size: 0.85rem; color: var(--muted); }

.day-summary { font-size: 0.88rem; color: var(--ink); font-weight: 500; }

.day-toggle { color: var(--muted); font-size: 0.75rem; text-align: right; }

.day-card-body {
  border-top: 1px solid var(--cream-dark);
  padding: 1rem 1.25rem 1.25rem;
  background: rgba(245,239,230,.4);
}

/* Meals */
.day-meals { display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 1rem; }

.meal-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
  font-size: 0.86rem;
}

.meal-type {
  width: 70px;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  color: var(--gold);
  flex-shrink: 0;
}

.meal-name  { font-weight: 600; color: var(--ink); }
.meal-cuisine { color: var(--muted); font-size: 0.8rem; }
.meal-price { color: var(--teal); font-weight: 600; margin-left: auto; }
.meal-rating { color: var(--gold); font-size: 0.8rem; }

/* Activities */
.activities-label {
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--muted);
  margin-bottom: 0.5rem;
}

.activities-list { display: flex; flex-wrap: wrap; gap: 0.5rem; }

.activity-tag {
  background: rgba(13,92,99,.08);
  border: 1px solid rgba(13,92,99,.15);
  border-radius: 20px;
  padding: 0.25rem 0.8rem;
  font-size: 0.8rem;
  color: var(--teal);
}

/* ─── Actions ────────────────────────────────────────────────────────────── */
.itin-actions {
  display: flex;
  gap: 1rem;
  margin-top: 2.5rem;
  flex-wrap: wrap;
}

.btn-reset {
  padding: 0.75rem 1.5rem;
  border-radius: var(--radius);
  border: 1.5px solid var(--teal);
  background: transparent;
  color: var(--teal);
  font-family: 'DM Sans', sans-serif;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
}

.btn-reset:hover { background: var(--teal); color: var(--white); }

.btn-print {
  padding: 0.75rem 1.5rem;
  border-radius: var(--radius);
  border: 1.5px solid var(--cream-dark);
  background: var(--white);
  color: var(--ink);
  font-family: 'DM Sans', sans-serif;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
}

.btn-print:hover { border-color: var(--ink); }

.itin-generated {
  margin-top: 1rem;
  font-size: 0.72rem;
  color: #b0a898;
  text-align: center;
}

/* ─── Print ──────────────────────────────────────────────────────────────── */
@media print {
  .itin-actions, .app-header, .app-footer { display: none; }
  .day-card-body { display: block !important; }
}

/* ─── Responsive ─────────────────────────────────────────────────────────── */
@media (max-width: 600px) {
  .itin-summary-card { padding: 1.5rem 1.25rem; }
  .flight-card, .hotel-card, .budget-card { padding: 1.25rem; }
  .day-card-header { grid-template-columns: 50px 1fr 30px; }
  .day-summary { display: none; }
  .budget-bar-label { width: 130px; }
}
