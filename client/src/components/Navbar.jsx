import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import '../styles/Navbar.css';

const Navbar = () => {
    const { isAuthenticated, user, logout, isAdmin } = useAuth();
    const { getCartCount } = useCart();
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const userMenuRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
                setShowUserMenu(false);
            }
        };

        if (showUserMenu) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showUserMenu]);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            window.location.href = `/shop?search=${encodeURIComponent(searchTerm)}`;
        }
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    <span className="logo-icon">✨</span>
                    <span className="logo-text">FashionStore</span>
                </Link>

                <div className="navbar-center">
                    <form onSubmit={handleSearch} className="search-form">
                        <input
                            type="text"
                            className="search-input"
                            placeholder="Search products..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button type="submit" className="search-btn">
                            🔍
                        </button>
                    </form>
                </div>

                <div className={`navbar-links ${showMobileMenu ? 'active' : ''}`}>
                    <Link to="/" className="nav-link">Home</Link>
                    <Link to="/shop" className="nav-link">Shop</Link>
                    <Link to="/shop?category=Men" className="nav-link">Men</Link>
                    <Link to="/shop?category=Women" className="nav-link">Women</Link>
                    <Link to="/shop?category=Kids" className="nav-link">Kids</Link>
                </div>

                <div className="navbar-actions">
                    {isAuthenticated ? (
                        <>
                            <Link to="/wishlist" className="icon-btn" title="Wishlist">
                                ❤️
                            </Link>
                            <Link to="/cart" className="icon-btn cart-btn" title="Cart">
                                🛒
                                {getCartCount() > 0 && <span className="cart-badge">{getCartCount()}</span>}
                            </Link>
                            <div className="user-menu" ref={userMenuRef}>
                                <button
                                    className="user-btn"
                                    onClick={() => setShowUserMenu(!showUserMenu)}
                                >
                                    👤 {user?.name}
                                </button>
                                {showUserMenu && (
                                    <div className="user-dropdown">
                                        <Link to="/profile" className="dropdown-item">Profile</Link>
                                        <Link to="/orders" className="dropdown-item">My Orders</Link>
                                        {isAdmin && <Link to="/admin" className="dropdown-item">Admin Dashboard</Link>}
                                        <button onClick={logout} className="dropdown-item logout-btn">
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="nav-btn">Login</Link>
                            <Link to="/register" className="nav-btn primary">Sign Up</Link>
                        </>
                    )}

                    <button
                        className="mobile-menu-btn"
                        onClick={() => setShowMobileMenu(!showMobileMenu)}
                    >
                        ☰
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
