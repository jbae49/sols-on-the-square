import React, { createContext, useContext, useReducer } from "react";

const CartContext = createContext();

const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_ITEM':
            const itemExists = state.items.find(item => item.key === action.payload.key);
            if (itemExists) {
                return {
                    ...state,
                    items: state.items.map(item =>
                        item.key === action.payload.key ? {...item, quantity: item.quantity+1} : item),
                };
            }
            return {...state, items: [...state.items, {...action.payload, quantity: 1}]};
        case 'REMOVE_ITEM':
            return {
                ...state,
                items: state.items.filter(item => item.key !== action.payload.key),
            };
        case 'CLEAR_CART':
            return {items: []}

        default:
            return state;
    }
}

export const CartProvider = ({children}) => {
    const [state, dispatch] = useReducer(cartReducer, { items: []})

    return (
        <CartContext.Provider value = {{state, dispatch}}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);