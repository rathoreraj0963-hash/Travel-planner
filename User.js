/**
 * File: frontend/src/styles/global.css
 * Design system — warm editorial aesthetic with cream & deep teal palette
 * Typography: Playfair Display (headings) + DM Sans (body)
 */

:root {
  --cream:      #f5efe6;
  --cream-dark: #ede3d4;
  --ink:        #1a1208;
  --teal:       #0d5c63;
  --teal-light: #16818b;
  --gold:       #c9963a;
  --gold-light: #e8b55a;
  --muted:      #7a6e62;
  --success:    #2e7d5c;
  --danger:     #c0392b;
  --warn:       #d4860a;
  --white:      #ffffff;
  --shadow-sm:  0 2px 8px rgba(26,18,8,.08);
  --shadow-md:  0 8px 32px rgba(26,18,8,.12);
  --shadow-lg:  0 20px 60px rgba(26,18,8,.18);
  --radius:     12px;
  --radius-lg:  20px;
  --transition: all 0.25s cubic-bezier(0.4,0,0.2,1);
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

html { scroll-behavior: smooth; }

body {
  font-family: 'DM Sans', sans-serif;
  font-weight: 400;
  background: var(--cream);
  color: var(--ink);
  line-height: 1.6;
  min-height: 100vh;
}

h1, h2, h3, h4 {
  font-family: 'Playfair Display', serif;
  line-height: 1.2;
}

a { color: var(--teal); text-decoration: none; }

/* Scrollbar */
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: var(--cream); }
::-webkit-scrollbar-thumb { background: var(--teal); border-radius: 3px; }

/* Global page wrapper */
.app-wrapper {
  min-height: 100vh;
  background:
    radial-gradient(ellipse 80% 50% at 50% -10%, rgba(13,92,99,.12) 0%, transparent 70%),
    var(--cream);
}

/* Fade-in animation */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}

.fade-up { animation: fadeUp 0.6s ease both; }
.fade-up-delay-1 { animation-delay: 0.1s; }
.fade-up-delay-2 { animation-delay: 0.2s; }
.fade-up-delay-3 { animation-delay: 0.3s; }

/* Pulse loader */
@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50%       { opacity: 0.5; transform: scale(0.95); }
}
