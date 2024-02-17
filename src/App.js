import React, { useEffect } from 'react';
import './App.css';
import Menu from './Menu';
import { CartProvider } from './contexts/CartContext';
import Cart from './components/Cart';
import FingerprintJS from '@fingerprintjs/fingerprintjs'

function App() {
  // useEffect(() => {
  //   // Initialize FingerprintJS agent
  //   const loadFingerprint = async () => {
  //     // Get the FingerprintJS agent
  //     const fp = await FingerprintJS.load();

  //     // Get the visitor's identifier
  //     const result = await fp.get();
  //     const visitorId = result.visitorId;

  //     // Send the fingerprint to backend
  //     fetch('http://localhost:5000/record-visit', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ fingerprint: visitorId }),
  //     })
  //       .then(response => response.json())
  //       .then(data => console.log(data.message))
  //       .catch(error => console.error('Error recording visit with fingerprint:', error))
  //   };
  //   loadFingerprint();
  // }, []);


  return (
    <div>
      <CartProvider>
        <div className="App">
          <Menu />
          <Cart />
        </div>
      </CartProvider>
      <div className='tip-julia'>
        Loved the digital menu? 💓
        <br />
        <a href="https://account.venmo.com/u/juliabae">
          Feel free to drop Julia a tip for creating this!
        </a>
      </div>
    </div>
  );
}

export default App;