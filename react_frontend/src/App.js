import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { getSupabaseClient } from './lib/supabaseClient';

// PUBLIC_INTERFACE
function App() {
  const [theme, setTheme] = useState('light');

  // Initialize Supabase client once to ensure configuration is valid
  useEffect(() => {
    const supabase = getSupabaseClient();
    // Optional: small no-op call to verify client is created in dev.
    // This is a placeholder for future CRUD integration.
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.log('Supabase client initialized:', Boolean(supabase));
    }
  }, []);

  // Effect to apply theme to document element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="App">
      <header className="App-header">
        <button 
          className="theme-toggle" 
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <p>
          Current theme: <strong>{theme}</strong>
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
