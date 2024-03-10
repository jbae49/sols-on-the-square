import React from 'react';
import { useCart } from '../contexts/CartContext';

const Cart = () => {
    const { state, dispatch } = useCart();

    const calculateTotal = () => {
        return state.items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    };

    const handleQuantityChange = (itemKey, quantity) => {
        if (parseInt(quantity) === 0) {
            dispatch({ type: 'REMOVE_ITEM', payload: { key: itemKey } });
        } else {
            dispatch({ type: 'UPDATE_ITEM_QUANTITY', payload: { key: itemKey, quantity: parseInt(quantity) } });
        }
    };

    return (
        <div>
            <h2>Your Cart</h2>
            {state.items.length > 0 ? (
                <ul>
                    {state.items.map((item) => (
                        <li key={item.key}>
                            {item.description} - ${item.price} x
                            <select
                                value={item.quantity}
                                onChange={(e) => handleQuantityChange(item.key, e.target.value)}
                            >
                                {[0, 1, 2, 3, 4, 5].map(n => (
                                    <option key={n} value={n}>{n}</option>
                                ))}
                            </select>
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
