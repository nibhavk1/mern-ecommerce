import { Link } from 'react-router-dom';
import '../styles/Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-section">
                    <h3>About Us</h3>
                    <p>Your one-stop destination for trendy and affordable fashion.</p>
                </div>

                <div className="footer-section">
                    <h3>Quick Links</h3>
                    <Link to="/shop">Shop</Link>
                    <Link to="/shop?category=Men">Men's Fashion</Link>
                    <Link to="/shop?category=Women">Women's Fashion</Link>
                    <Link to="/shop?category=Kids">Kids' Wear</Link>
                </div>

                <div className="footer-section">
                    <h3>Customer Service</h3>
                    <Link to="#">Contact Us</Link>
                    <Link to="#">Shipping Info</Link>
                    <Link to="#">Returns</Link>
                    <Link to="#">FAQ</Link>
                </div>

                <div className="footer-section">
                    <h3>Follow Us</h3>
                    <div className="social-icons">
                        <a href="#" aria-label="Facebook">📘</a>
                        <a href="#" aria-label="Instagram">📷</a>
                        <a href="#" aria-label="Twitter">🐦</a>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <p>&copy; 2025 FashionStore. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
