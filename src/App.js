import React from 'react';
import './App.css';
import Menu from './Menu';
import { CartProvider } from './contexts/CartContext';
import Cart from './components/Cart';

function App() {
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