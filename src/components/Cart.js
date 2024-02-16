import React from 'react';
import {useCart} from '../contexts/CartContext';

const Cart = () => {
    const {state, dispatch} = useCart();
    const calculateTotal = () => {
        return state.items.reduce((total, item) => total + item.price*item.quantity, 0).toFixed(2);
    };
    return (
        <div>
            <h2>Your Cart</h2>
            {state.items.length > 0 ? (
                <ul>
                    {state.items.map((item) => (
                        <li key={item.key}>
                            {item.description} - ${item.price} x {item.quantity}
                            <button onClick={() => dispatch({type: 'REMOVE_ITEM', payload: {key:item.key}})}>
                                Remove
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Your cart is empty.</p>
            )}
            <h3>Total: ${calculateTotal()}</h3>
        </div>
    );
};

export default Cart;