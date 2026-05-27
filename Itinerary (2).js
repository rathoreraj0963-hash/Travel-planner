/**
 * File: frontend/src/components/Header.js
 * Sticky top navigation bar with brand identity.
 */

import React from 'react';

const Header = ({ onLogoClick }) => (
  <header className="app-header">
    <div className="header-logo" onClick={onLogoClick} title="Back to planner">
      <div className="header-logo-icon">✈</div>
      <div>
        <div className="header-logo-text">
          Wander<span>Mind</span>
        </div>
      </div>
    </div>
    <div className="header-tagline">Multi-Agent AI Travel Planner</div>
  </header>
);

export default Header;
