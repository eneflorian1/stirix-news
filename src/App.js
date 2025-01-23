import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import AppRoutes from './Routes';
import Header from './components/Header';
import Footer from './components/Footer';
import styles from './styles/App.module.css';
import { startNewsGeneration } from './services/trendsFetcher';

function App() {
  React.useEffect(() => {
    // Pornim generarea de știri și salvăm intervalul
    const interval = startNewsGeneration();
    
    // Curățăm intervalul când componenta este demontată
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, []); // Rulăm doar la montarea componentei

  return (
    <Router>
      <div className={styles.app}>
        <Helmet>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet" />
        </Helmet>
        <Header />
        <main className={styles.main}>
          <AppRoutes />
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;