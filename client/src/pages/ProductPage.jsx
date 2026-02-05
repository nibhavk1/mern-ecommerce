import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productsAPI, reviewsAPI } from '../services/api';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import '../styles/ProductPage.css';

const ProductPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const { isAuthenticated, user } = useAuth();
    const [product, setProduct] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [reviewData, setReviewData] = useState({ rating: 5, comment: '' });

    useEffect(() => {
        fetchProduct();
        fetchReviews();
    }, [id]);

    const fetchProduct = async () => {
        try {
            const response = await productsAPI.getById(id);
            setProduct(response.data);
            if (response.data.sizes?.length > 0) setSelectedSize(response.data.sizes[0]);
            if (response.data.colors?.length > 0) setSelectedColor(response.data.colors[0]);
        } catch (error) {
            console.error('Error fetching product:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchReviews = async () => {
        try {
            const response = await reviewsAPI.getByProductId(id);
            setReviews(response.data);
        } catch (error) {
            console.error('Error fetching reviews:', error);
        }
    };

    const handleAddToCart = () => {
        if (!selectedSize || !selectedColor) {
            alert('Please select size and color');
            return;
        }
        addToCart(product, selectedSize, selectedColor, quantity);
        alert('Added to cart!');
    };

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }

        try {
            await reviewsAPI.create({
                productId: id,
                userName: user.name,
                ...reviewData
            });
            setReviewData({ rating: 5, comment: '' });
            fetchReviews();
            fetchProduct();
        } catch (error) {
            console.error('Error submitting review:', error);
        }
    };

    const getStockQuantity = () => {
        const variant = product?.variants?.find(
            v => v.size === selectedSize && v.color === selectedColor
        );
        return variant?.stockQuantity || 0;
    };

    if (loading) return <div className="loading">Loading product...</div>;
    if (!product) return <div className="error">Product not found</div>;

    return (
        <div className="product-page">
            <div className="product-container">
                <div className="product-images">
                    <img src={product.images[0]} alt={product.name} className="main-image" />
                </div>

                <div className="product-details">
                    <h1>{product.name}</h1>

                    <div className="product-meta">
                        <span className="product-price">${product.price.toFixed(2)}</span>
                        {product.rating > 0 && (
                            <span className="product-rating">⭐ {product.rating} ({product.reviewCount} reviews)</span>
                        )}
                    </div>

                    <p className="product-description">{product.description}</p>

                    <div className="product-options">
                        <div className="option-group">
                            <label>Size:</label>
                            <div className="size-options">
                                {product.sizes.map(size => (
                                    <button
                                        key={size}
                                        className={`size-btn ${selectedSize === size ? 'active' : ''}`}
                                        onClick={() => setSelectedSize(size)}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="option-group">
                            <label>Color:</label>
                            <div className="color-options">
                                {product.colors.map(color => (
                                    <button
                                        key={color}
                                        className={`color-btn ${selectedColor === color ? 'active' : ''}`}
                                        onClick={() => setSelectedColor(color)}
                                    >
                                        {color}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="option-group">
                            <label>Quantity:</label>
                            <input
                                type="number"
                                min="1"
                                max={getStockQuantity()}
                                value={quantity}
                                onChange={(e) => setQuantity(Number(e.target.value))}
                                className="quantity-input"
                            />
                            <span className="stock-info">
                                {getStockQuantity() > 0 ? `${getStockQuantity()} in stock` : 'Out of stock'}
                            </span>
                        </div>
                    </div>

                    <div className="product-actions">
                        <button
                            className="add-to-cart-btn"
                            onClick={handleAddToCart}
                            disabled={getStockQuantity() === 0}
                        >
                            {getStockQuantity() > 0 ? 'Add to Cart' : 'Out of Stock'}
                        </button>
                    </div>
                </div>
            </div>

            <div className="reviews-section" data-aos="fade-up">
                <h2>Customer Reviews</h2>

                {isAuthenticated && (
                    <form onSubmit={handleReviewSubmit} className="review-form">
                        <h3>Write a Review</h3>
                        <div className="rating-input">
                            <label>Rating:</label>
                            {[1, 2, 3, 4, 5].map(star => (
                                <button
                                    key={star}
                                    type="button"
                                    className={`star-btn ${reviewData.rating >= star ? 'active' : ''}`}
                                    onClick={() => setReviewData({ ...reviewData, rating: star })}
                                >
                                    ⭐
                                </button>
                            ))}
                        </div>
                        <textarea
                            placeholder="Share your experience..."
                            value={reviewData.comment}
                            onChange={(e) => setReviewData({ ...reviewData, comment: e.target.value })}
                            required
                        />
                        <button type="submit" className="submit-review-btn">Submit Review</button>
                    </form>
                )}

                <div className="reviews-list">
                    {reviews.length === 0 ? (
                        <p>No reviews yet. Be the first to review!</p>
                    ) : (
                        reviews.map(review => (
                            <div key={review._id} className="review-card">
                                <div className="review-header">
                                    <strong>{review.userName}</strong>
                                    <span className="review-rating">{'⭐'.repeat(review.rating)}</span>
                                </div>
                                <p className="review-comment">{review.comment}</p>
                                <span className="review-date">
                                    {new Date(review.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductPage;
