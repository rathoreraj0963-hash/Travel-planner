/**
 * File: frontend/src/App.js
 * Root component — manages global state and view switching.
 * Views: 'form' (input) → 'loading' (agents running) → 'itinerary' (results)
 */

import React, { useState } from 'react';
import axios from 'axios';
import Form from './components/Form';
import Itinerary from './components/Itinerary';
import LoadingScreen from './components/LoadingScreen';
import Header from './components/Header';
import './styles/App.css';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

function App() {
  const [view, setView]           = useState('form');      // 'form' | 'loading' | 'itinerary'
  const [itinerary, setItinerary] = useState(null);
  const [errors, setErrors]       = useState([]);
  const [agentStep, setAgentStep] = useState(0);           // tracks loading animation step

  /**
   * Called when the user submits the form.
   * Triggers the multi-agent pipeline via the backend API.
   */
  const handleGenerate = async (formData) => {
    setErrors([]);
    setView('loading');
    setAgentStep(1);

    // Simulate agent step progression for UX feedback
    const stepTimer = setInterval(() => {
      setAgentStep((s) => (s < 5 ? s + 1 : s));
    }, 900);

    try {
      const response = await axios.post(`${API_BASE}/itinerary/generate`, formData);
      clearInterval(stepTimer);

      if (response.data.success) {
        setItinerary(response.data.itinerary);
        setView('itinerary');
      } else {
        throw new Error('Generation failed');
      }
    } catch (err) {
      clearInterval(stepTimer);
      const serverErrors =
        err.response?.data?.errors ||
        [err.response?.data?.error || 'Something went wrong. Please try again.'];
      setErrors(serverErrors);
      setView('form');
    }
  };

  /**
   * Reset back to the form to plan a new trip
   */
  const handleReset = () => {
    setItinerary(null);
    setErrors([]);
    setAgentStep(0);
    setView('form');
  };

  return (
    <div className="app-wrapper">
      <Header onLogoClick={handleReset} />

      <main className="app-main">
        {view === 'form' && (
          <Form onSubmit={handleGenerate} serverErrors={errors} />
        )}

        {view === 'loading' && (
          <LoadingScreen step={agentStep} />
        )}

        {view === 'itinerary' && itinerary && (
          <Itinerary data={itinerary} onReset={handleReset} />
        )}
      </main>

      <footer className="app-footer">
        <p>WanderMind © {new Date().getFullYear()} · Multi-Agent AI Travel Planner</p>
      </footer>
    </div>
  );
}

export default App;
