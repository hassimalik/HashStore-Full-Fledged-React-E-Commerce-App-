import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cartItem, setCartItem] = useState([]);

    // Add item to cart safely
    const addToCart = (product) => {
        setCartItem(prev => {
            // Check if product already exists
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                // Increase quantity if exists
                return prev.map(item => 
                    item.id === product.id 
                    ? {...item, quantity: item.quantity + 1} 
                    : item
                );
            } else {
                // Add new product with quantity 1
                return [...prev, {...product, quantity: 1}];
            }
        });
        console.log("Added to cart:", product);
    };

    // Remove item by id
    const removeFromCart = (productId) => {
        setCartItem(prev => prev.filter(item => item.id !== productId));
    };

    // Clear cart
    const clearCart = () => setCartItem([]);

    // Increase quantity
    const increaseQty = (id) => {
        setCartItem(prev => prev.map(item => 
            item.id === id ? {...item, quantity: item.quantity + 1} : item
        ));
    };

    // Decrease quantity
    const decreaseQty = (id) => {
        setCartItem(prev => prev.map(item => 
            item.id === id && item.quantity > 1 
            ? {...item, quantity: item.quantity - 1} 
            : item
        ));
    };

    return (
        <CartContext.Provider value={{
            cartItem, 
            addToCart, 
            removeFromCart, 
            clearCart,
            increaseQty,
            decreaseQty
        }}>
            {children}
        </CartContext.Provider>
    );
}

// Custom hook for easy usage
export const useCart = () => useContext(CartContext);
