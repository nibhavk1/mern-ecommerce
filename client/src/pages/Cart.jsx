import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import OrderSummary from '../components/OrderSummary';
import '../styles/Cart.css';

const Cart = () => {
    const { cart, updateQuantity, removeFromCart, getCartTotal } = useCart();

    if (cart.length === 0) {
        return (
            <div className="empty-cart" data-aos="fade-up">
                <h2>Your cart is empty</h2>
                <p>Add some amazing products to your cart!</p>
                <Link to="/shop" className="shop-btn">Continue Shopping</Link>
            </div>
        );
    }

    return (
        <div className="cart-page">
            <h1 data-aos="fade-up">Shopping Cart</h1>

            <div className="cart-container">
                <div className="cart-items">
                    {cart.map((item, index) => (
                        <div key={index} className="cart-item" data-aos="fade-up" data-aos-delay={index * 50}>
                            <img src={item.image} alt={item.name} className="item-image" />

                            <div className="item-details">
                                <h3>{item.name}</h3>
                                <p>Size: {item.size} | Color: {item.color}</p>
                                <p className="item-price">${item.price.toFixed(2)}</p>
                            </div>

                            <div className="item-quantity">
                                <button
                                    className="qty-btn"
                                    onClick={() => updateQuantity(item.productId, item.size, item.color, item.quantity - 1)}
                                >
                                    −
                                </button>
                                <span>{item.quantity}</span>
                                <button
                                    className="qty-btn"
                                    onClick={() => updateQuantity(item.productId, item.size, item.color, item.quantity + 1)}
                                >
                                    +
                                </button>
                            </div>

                            <div className="item-total">
                                <p>${(item.price * item.quantity).toFixed(2)}</p>
                                <button
                                    className="remove-btn"
                                    onClick={() => removeFromCart(item.productId, item.size, item.color)}
                                >
                                    🗑️ Remove
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="cart-summary" data-aos="fade-left" data-aos-delay="200">
                    <OrderSummary items={cart} total={getCartTotal()} />
                    <Link to="/checkout" className="checkout-btn">
                        Proceed to Checkout
                    </Link>
                    <Link to="/shop" className="continue-shopping">
                        ← Continue Shopping
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Cart;
