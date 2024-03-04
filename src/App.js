// App.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import Menu from './Menu'; // Ensure you have this component created as per your setup
import { CartProvider } from './contexts/CartContext'; // Ensure this context is set up
import Cart from './components/Cart'; // Ensure you have this component created as per your setup
import LanguageSelectionModal from './components/LanguageSelectionModal'; // Ensure you've created this component
import { LanguageProvider } from './contexts/LanguageContext';
import ScrollButton from './components/ScrollButton';

function App() {
  const [sessionId, setSessionId] = useState(null); // State to store the session ID

  // Define the function to handle clicks on the Venmo link within the App component
  const handleVenmoClick = () => {
    axios.post('https://api.solsonthesquare.online/api/track-venmo-click', {})
      .then(response => console.log('Venmo click tracked successfully.'))
      .catch(error => console.error('Error tracking Venmo click:', error));
  };

  const handleLanguageSelected = (lang) => {
    axios.post('https://api.solsonthesquare.online/api/save-language', { language: lang })
      .then(response => console.log(response.data))
      .catch(error => console.error('Error posting language selection:', error));
  };

  useEffect(() => {
    let isMounted = true; // Flag to handle async operation

    // Function to track the visit start
    const trackVisit = async () => {
      try {
        const response = await axios.post('https://api.solsonthesquare.online/track-visit', {});
        console.log('Visit tracked successfully.');
        if (isMounted) {
          setSessionId(response.data.sessionId); // Save the session ID from the response
        }
      } catch (error) {
        console.error('Error tracking visit:', error);
      }
    };

    trackVisit();

    // Add event listener for beforeunload to handle when the user leaves
    const updateSessionEnd = async () => {
      if (sessionId) { // Only send if sessionId is set
        try {
          await axios.post('https://api.solsonthesquare.online/update-session-end', { sessionId });
          console.log('Session end updated successfully.');
        } catch (error) {
          console.error('Error updating session end:', error);
        }
      }
    };

    window.addEventListener('beforeunload', updateSessionEnd);

    // Cleanup function
    return () => {
      isMounted = false; // Prevent setting state on unmounted component
      window.removeEventListener('beforeunload', updateSessionEnd);
      // Remove the direct call to updateSessionEnd here to prevent multiple additions
    };
  }, []); // Empty dependency array to ensure this effect only runs once on mount

  return (
    <div>
      <LanguageProvider>
        <CartProvider>
          <LanguageSelectionModal onLanguageSelected={handleLanguageSelected} />
          <div className="App">
            <Menu />
            <div id='cart'>
              <Cart />
            </div>
            <ScrollButton />
          </div>
        </CartProvider>
      </LanguageProvider>
      <div className='tip-julia'>
        💓<br />
        <a href="https://account.venmo.com/u/juliabae" onClick={handleVenmoClick} target="_blank" rel="noopener noreferrer">
          Tip Julia for creating this digital webpage!
        </a>
      </div>
    </div>
  );
}

export default App;
