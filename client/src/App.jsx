import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductPage from './pages/ProductPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Cart from './pages/Cart';
import WishlistPage from './pages/WishlistPage';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import AdminDashboard from './pages/Admin/AdminDashboard';
import ProductManagement from './components/Admin/ProductManagement';
import InventoryManagement from './components/Admin/InventoryManagement';
import OrderManagement from './components/Admin/OrderManagement';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './index.css';

function App() {
    // Initialize AOS globally
    useEffect(() => {
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: false,
            offset: 100
        });
    }, []);

    return (
        <AuthProvider>
            <CartProvider>
                <Router>
                    <div className="app">
                        <Navbar />
                        <main className="main-content">
                            <Routes>
                                {/* Public Routes */}
                                <Route path="/" element={<Home />} />
                                <Route path="/shop" element={<Shop />} />
                                <Route path="/product/:id" element={<ProductPage />} />
                                <Route path="/login" element={<Login />} />
                                <Route path="/register" element={<Register />} />

                                {/* Protected Customer Routes */}
                                <Route
                                    path="/profile"
                                    element={
                                        <ProtectedRoute>
                                            <Profile />
                                        </ProtectedRoute>
                                    }
                                />
                                <Route
                                    path="/cart"
                                    element={<Cart />}
                                />
                                <Route
                                    path="/wishlist"
                                    element={
                                        <ProtectedRoute>
                                            <WishlistPage />
                                        </ProtectedRoute>
                                    }
                                />
                                <Route
                                    path="/checkout"
                                    element={
                                        <ProtectedRoute>
                                            <Checkout />
                                        </ProtectedRoute>
                                    }
                                />
                                <Route
                                    path="/orders"
                                    element={
                                        <ProtectedRoute>
                                            <Orders />
                                        </ProtectedRoute>
                                    }
                                />

                                {/* Protected Admin Routes */}
                                <Route
                                    path="/admin"
                                    element={
                                        <ProtectedRoute adminOnly>
                                            <AdminDashboard />
                                        </ProtectedRoute>
                                    }
                                />
                                <Route
                                    path="/admin/products"
                                    element={
                                        <ProtectedRoute adminOnly>
                                            <ProductManagement />
                                        </ProtectedRoute>
                                    }
                                />
                                <Route
                                    path="/admin/inventory"
                                    element={
                                        <ProtectedRoute adminOnly>
                                            <InventoryManagement />
                                        </ProtectedRoute>
                                    }
                                />
                                <Route
                                    path="/admin/orders"
                                    element={
                                        <ProtectedRoute adminOnly>
                                            <OrderManagement />
                                        </ProtectedRoute>
                                    }
                                />
                            </Routes>
                        </main>
                        <Footer />
                    </div>
                </Router>
            </CartProvider>
        </AuthProvider>
    );
}

export default App;
