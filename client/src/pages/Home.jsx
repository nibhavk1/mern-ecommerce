import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { productsAPI } from '../services/api';
import ProductGrid from '../components/ProductGrid';
import '../styles/Home.css';

const Home = () => {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchFeaturedProducts();
    }, []);

    const fetchFeaturedProducts = async () => {
        try {
            const response = await productsAPI.getAll();
            setFeaturedProducts(response.data.slice(0, 6));
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="home">
            <section className="hero">
                <div className="hero-content" data-aos="fade-up">
                    <h1 className="hero-title" data-aos="fade-up" data-aos-delay="100">
                        Discover Your Style
                    </h1>
                    <p className="hero-subtitle" data-aos="fade-up" data-aos-delay="200">
                        Trendy fashion for everyone. Explore our latest collection.
                    </p>
                    <div className="hero-actions" data-aos="fade-up" data-aos-delay="300">
                        <Link to="/shop" className="btn btn-primary">
                            Shop Now
                        </Link>
                        <Link to="/shop?category=Women" className="btn btn-secondary">
                            Women's Collection
                        </Link>
                    </div>
                </div>
            </section>

            <section className="categories">
                <h2 data-aos="fade-up">Shop by Category</h2>
                <div className="category-grid">
                    <Link to="/shop?category=Men" className="category-card" data-aos="zoom-in" data-aos-delay="100">
                        <div className="category-image">👔</div>
                        <h3>Men</h3>
                    </Link>
                    <Link to="/shop?category=Women" className="category-card" data-aos="zoom-in" data-aos-delay="200">
                        <div className="category-image">👗</div>
                        <h3>Women</h3>
                    </Link>
                    <Link to="/shop?category=Kids" className="category-card" data-aos="zoom-in" data-aos-delay="300">
                        <div className="category-image">👶</div>
                        <h3>Kids</h3>
                    </Link>
                    <Link to="/shop?category=Accessories" className="category-card" data-aos="zoom-in" data-aos-delay="400">
                        <div className="category-image">👜</div>
                        <h3>Accessories</h3>
                    </Link>
                </div>
            </section>

            <section className="featured-products">
                <h2 data-aos="fade-up">Featured Products</h2>
                {loading ? (
                    <p>Loading products...</p>
                ) : (
                    <div data-aos="fade-up" data-aos-delay="100">
                        <ProductGrid products={featuredProducts} />
                    </div>
                )}
                <div className="section-footer" data-aos="fade-up" data-aos-delay="200">
                    <Link to="/shop" className="view-all-btn">
                        View All Products →
                    </Link>
                </div>
            </section>

            <section className="cta" data-aos="fade-up">
                <h2 data-aos="fade-up" data-aos-delay="100">
                    Join Our Fashion Community
                </h2>
                <p data-aos="fade-up" data-aos-delay="200">
                    Subscribe to get special offers, free giveaways, and exclusive deals.
                </p>
                <div className="cta-actions" data-aos="fade-up" data-aos-delay="300">
                    <input type="email" placeholder="Enter your email" className="cta-input" />
                    <button className="cta-btn">Subscribe</button>
                </div>
            </section>
        </div>
    );
};

export default Home;
