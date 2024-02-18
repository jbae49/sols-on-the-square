// App.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import Menu from './Menu'; // Ensure you have this component created as per your setup
import { CartProvider } from './contexts/CartContext'; // Ensure this context is set up
import Cart from './components/Cart'; // Ensure you have this component created as per your setup
import LanguageSelectionModal from './components/LanguageSelectionModal'; // Ensure you've created this component
import { LanguageProvider } from './contexts/LanguageContext';

function App() {
  const handleLanguageSelected = (lang) => {
    axios.post('http://127.0.0.1:5000/api/save-language', { language: lang })
      .then(response => console.log(response.data))
      .catch(error => console.error('Error posting language selection:', error));
  };

  useEffect(() => {
    const trackVisit = async () => {
      try {
        await axios.post('http://127.0.0.1:5000/track-visit', {});
        console.log('Visit tracked successfully.');
      } catch (error) {
        console.error('Error tracking visit:', error);
      }
    };

    trackVisit();
  }, []);

  return (
    <div>
      <LanguageProvider>
        <CartProvider>
          <LanguageSelectionModal onLanguageSelected={handleLanguageSelected} />
          <div className="App">
            <Menu />
            <Cart />
          </div>
        </CartProvider>
      </LanguageProvider>
      <div className='tip-julia'>
        Loved the digital menu? 💓<br />
        <a href="https://account.venmo.com/u/juliabae">
          Feel free to drop Julia a tip for creating this!
        </a>
      </div>
    </div>
  );
}

export default App;
