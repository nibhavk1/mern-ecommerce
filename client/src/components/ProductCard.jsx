import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { wishlistAPI } from '../services/api';
import '../styles/ProductCard.css';


const ProductCard = ({ product, onWishlistToggle }) => {
    const { isAuthenticated } = useAuth();
    const { addToCart } = useCart();

    const handleQuickAdd = () => {
        if (product.variants && product.variants.length > 0) {
            const firstVariant = product.variants[0];
            addToCart(product, firstVariant.size, firstVariant.color, 1);
        }
    };

    const handleWishlistToggle = async (e) => {
        e.preventDefault();
        if (!isAuthenticated) {
            window.location.href = '/login';
            return;
        }

        try {
            await wishlistAPI.add(product._id);
            if (onWishlistToggle) onWishlistToggle();
        } catch (error) {
            console.error('Error adding to wishlist:', error);
        }
    };

    return (
        <div className="product-card">
            <Link to={`/product/${product._id}`} className="product-image-link">
                <img
                    src={product.images[0] || 'https://via.placeholder.com/300'}
                    alt={product.name}
                    className="product-image"
                />
                <button className="wishlist-heart" onClick={handleWishlistToggle}>
                    ❤️
                </button>
            </Link>

            <div className="product-info">
                <Link to={`/product/${product._id}`} className="product-name">
                    {product.name}
                </Link>

                <div className="product-details">
                    <span className="product-price">${product.price.toFixed(2)}</span>
                    {product.rating > 0 && (
                        <span className="product-rating">
                            ⭐ {product.rating} ({product.reviewCount})
                        </span>
                    )}
                </div>

                <div className="product-actions">
                    <button className="quick-add-btn" onClick={handleQuickAdd}>
                        Quick Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
