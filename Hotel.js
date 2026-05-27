/**
 * File: frontend/src/components/LoadingScreen.js
 * Animated loading screen that visualises the multi-agent pipeline
 * in real time so the user knows what's happening under the hood.
 */

import React from 'react';
import './LoadingScreen.css';

const AGENTS = [
  { step: 1, icon: '🔍', label: 'Validating your input...',         agent: null },
  { step: 2, icon: '✈️', label: 'Flight Agent searching routes...',  agent: 'Flight Agent' },
  { step: 3, icon: '🏨', label: 'Hotel Agent finding stays...',      agent: 'Hotel Agent' },
  { step: 4, icon: '🍽️', label: 'Food Agent curating dining...',     agent: 'Food Agent' },
  { step: 5, icon: '💰', label: 'Budget Agent optimizing plan...',   agent: 'Budget Agent' },
  { step: 6, icon: '📋', label: 'Generating your itinerary...',      agent: null },
];

const LoadingScreen = ({ step }) => (
  <div className="loading-wrapper fade-up">
    <div className="loading-card">
      <div className="loading-globe">🌍</div>
      <h2 className="loading-title">Planning your perfect trip</h2>
      <p className="loading-subtitle">Our AI agents are working in parallel for you</p>

      <div className="loading-steps">
        {AGENTS.map(({ step: s, icon, label, agent }) => {
          const status =
            step > s ? 'done' : step === s ? 'active' : 'pending';
          return (
            <div key={s} className={`loading-step loading-step--${status}`}>
              <div className="loading-step-icon">{status === 'done' ? '✓' : icon}</div>
              <div className="loading-step-info">
                <span className="loading-step-label">{label}</span>
                {agent && (
                  <span className="loading-step-badge">{agent}</span>
                )}
              </div>
              {status === 'active' && (
                <div className="loading-spinner" />
              )}
            </div>
          );
        })}
      </div>

      <div className="loading-bar-track">
        <div
          className="loading-bar-fill"
          style={{ width: `${Math.min((step / 6) * 100, 100)}%` }}
        />
      </div>
      <p className="loading-percent">{Math.min(Math.round((step / 6) * 100), 99)}% complete</p>
    </div>
  </div>
);

export default LoadingScreen;
