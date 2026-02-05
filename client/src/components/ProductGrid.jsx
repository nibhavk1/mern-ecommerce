import ProductCard from './ProductCard';
import '../styles/ProductGrid.css';

const ProductGrid = ({ products, onWishlistToggle }) => {
    if (!products || products.length === 0) {
        return (
            <div className="no-products">
                <p>No products found.</p>
            </div>
        );
    }

    return (
        <div className="product-grid">
            {products.map((product) => (
                <ProductCard
                    key={product._id}
                    product={product}
                    onWishlistToggle={onWishlistToggle}
                />
            ))}
        </div>
    );
};

export default ProductGrid;
