import React from 'react';
import './App.css';
import Menu from './Menu';
import { CartProvider } from './contexts/CartContext';
import Cart from './components/Cart';

function App() {
  return (
    <CartProvider>
    <div className="App">
      <Menu />
      <Cart />
    </div>
    </CartProvider>
  );
}

export default App;