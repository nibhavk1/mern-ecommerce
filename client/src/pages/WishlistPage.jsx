import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { wishlistAPI } from '../services/api';
import { useCart } from '../context/CartContext';
import '../styles/Wishlist.css';

const WishlistPage = () => {
    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useCart();

    useEffect(() => {
        fetchWishlist();
    }, []);

    const fetchWishlist = async () => {
        try {
            const response = await wishlistAPI.get();
            setWishlist(response.data);
        } catch (error) {
            console.error('Error fetching wishlist:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleRemove = async (productId) => {
        try {
            await wishlistAPI.remove(productId);
            fetchWishlist();
        } catch (error) {
            console.error('Error removing from wishlist:', error);
        }
    };

    const handleMoveToCart = (product) => {
        if (product.variants && product.variants.length > 0) {
            const firstVariant = product.variants[0];
            addToCart(product, firstVariant.size, firstVariant.color, 1);
            handleRemove(product._id);
        }
    };

    if (loading) return <div className="loading">Loading wishlist...</div>;

    if (wishlist.length === 0) {
        return (
            <div className="empty-wishlist" data-aos="fade-up">
                <h2>Your wishlist is empty</h2>
                <p>Save your favorite items here!</p>
                <Link to="/shop" className="shop-btn">Start Shopping</Link>
            </div>
        );
    }

    return (
        <div className="wishlist-page">
            <h1 data-aos="fade-up">My Wishlist</h1>

            <div className="wishlist-grid">
                {wishlist.map((product, index) => (
                    <div key={product._id} className="wishlist-card" data-aos="zoom-in" data-aos-delay={index * 50}>
                        <img src={product.images[0]} alt={product.name} />
                        <div className="wishlist-info">
                            <h3>{product.name}</h3>
                            <p className="wishlist-price">${product.price.toFixed(2)}</p>
                            <div className="wishlist-actions">
                                <button
                                    className="move-to-cart-btn"
                                    onClick={() => handleMoveToCart(product)}
                                >
                                    Move to Cart
                                </button>
                                <button
                                    className="remove-wishlist-btn"
                                    onClick={() => handleRemove(product._id)}
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WishlistPage;
