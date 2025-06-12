import React from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Router from './components/Router';

// PUBLIC_INTERFACE
function App() {
  return (
    <div className="app">
      <Header />
      <main tabIndex={-1} aria-label="Main content" style={{ flex: 1 }}>
        <Router />
      </main>
      <Footer />
    </div>
  );
}

export default App;
