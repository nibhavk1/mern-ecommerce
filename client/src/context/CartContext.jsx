import { createContext, useState, useEffect, useContext } from 'react';

const CartContext = createContext();

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within CartProvider');
    }
    return context;
};

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product, size, color, quantity = 1) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find(
                (item) =>
                    item.productId === product._id &&
                    item.size === size &&
                    item.color === color
            );

            if (existingItem) {
                return prevCart.map((item) =>
                    item.productId === product._id &&
                        item.size === size &&
                        item.color === color
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }

            return [
                ...prevCart,
                {
                    productId: product._id,
                    name: product.name,
                    price: product.price,
                    size,
                    color,
                    quantity,
                    image: product.images[0]
                }
            ];
        });
    };

    const removeFromCart = (productId, size, color) => {
        setCart((prevCart) =>
            prevCart.filter(
                (item) =>
                    !(item.productId === productId && item.size === size && item.color === color)
            )
        );
    };

    const updateQuantity = (productId, size, color, quantity) => {
        if (quantity <= 0) {
            removeFromCart(productId, size, color);
            return;
        }

        setCart((prevCart) =>
            prevCart.map((item) =>
                item.productId === productId && item.size === size && item.color === color
                    ? { ...item, quantity }
                    : item
            )
        );
    };

    const clearCart = () => {
        setCart([]);
    };

    const getCartTotal = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const getCartCount = () => {
        return cart.reduce((count, item) => count + item.quantity, 0);
    };

    const value = {
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartCount
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
