import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { productsAPI } from '../services/api';
import ProductGrid from '../components/ProductGrid';
import '../styles/Shop.css';

const Shop = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        category: searchParams.get('category') || '',
        search: searchParams.get('search') || '',
        minPrice: '',
        maxPrice: '',
        size: '',
        color: ''
    });

    // Update filters when URL parameters change
    useEffect(() => {
        setFilters({
            category: searchParams.get('category') || '',
            search: searchParams.get('search') || '',
            minPrice: searchParams.get('minPrice') || '',
            maxPrice: searchParams.get('maxPrice') || '',
            size: searchParams.get('size') || '',
            color: searchParams.get('color') || ''
        });
    }, [searchParams]);

    useEffect(() => {
        fetchProducts();
    }, [filters]);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const params = {};
            if (filters.category) params.category = filters.category;
            if (filters.search) params.search = filters.search;
            if (filters.minPrice) params.minPrice = filters.minPrice;
            if (filters.maxPrice) params.maxPrice = filters.maxPrice;
            if (filters.size) params.size = filters.size;
            if (filters.color) params.color = filters.color;

            const response = await productsAPI.getAll(params);
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange = (key, value) => {
        const newFilters = { ...filters, [key]: value };
        setFilters(newFilters);

        const params = {};
        Object.keys(newFilters).forEach(k => {
            if (newFilters[k]) params[k] = newFilters[k];
        });
        setSearchParams(params);
    };

    const clearFilters = () => {
        setFilters({
            category: '',
            search: '',
            minPrice: '',
            maxPrice: '',
            size: '',
            color: ''
        });
        setSearchParams({});
    };

    return (
        <div className="shop-page">
            <div className="shop-container">
                <aside className="filters-sidebar" data-aos="fade-right">
                    <h3>Filters</h3>

                    <div className="filter-group">
                        <label>Category</label>
                        <select
                            value={filters.category}
                            onChange={(e) => handleFilterChange('category', e.target.value)}
                        >
                            <option value="">All Categories</option>
                            <option value="Men">Men</option>
                            <option value="Women">Women</option>
                            <option value="Kids">Kids</option>
                            <option value="Accessories">Accessories</option>
                        </select>
                    </div>

                    <div className="filter-group">
                        <label>Price Range</label>
                        <input
                            type="number"
                            placeholder="Min"
                            value={filters.minPrice}
                            onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                        />
                        <input
                            type="number"
                            placeholder="Max"
                            value={filters.maxPrice}
                            onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                        />
                    </div>

                    <div className="filter-group">
                        <label>Size</label>
                        <input
                            type="text"
                            placeholder="e.g., M, 32, XL"
                            value={filters.size}
                            onChange={(e) => handleFilterChange('size', e.target.value)}
                        />
                    </div>

                    <div className="filter-group">
                        <label>Color</label>
                        <input
                            type="text"
                            placeholder="e.g., Black, Blue"
                            value={filters.color}
                            onChange={(e) => handleFilterChange('color', e.target.value)}
                        />
                    </div>

                    <button className="clear-filters-btn" onClick={clearFilters}>
                        Clear Filters
                    </button>
                </aside>

                <main className="products-section">
                    <div className="shop-header" data-aos="fade-up">
                        <h1>Shop All Products</h1>
                        <p>{products.length} products found</p>
                    </div>

                    {loading ? (
                        <p>Loading products...</p>
                    ) : (
                        <div data-aos="fade-up" data-aos-delay="100">
                            <ProductGrid products={products} onWishlistToggle={fetchProducts} />
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default Shop;
