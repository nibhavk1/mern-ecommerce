import { useState, useEffect } from 'react';
import { productsAPI } from '../../services/api';
import '../../styles/AdminComponents.css';

const InventoryManagement = () => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [stockUpdate, setStockUpdate] = useState({
        size: '',
        color: '',
        stockQuantity: 0
    });

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await productsAPI.getAll();
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleUpdateStock = async (e) => {
        e.preventDefault();
        if (!selectedProduct) return;

        try {
            await productsAPI.updateStock(selectedProduct._id, stockUpdate);
            fetchProducts();
            setStockUpdate({ size: '', color: '', stockQuantity: 0 });
            alert('Stock updated successfully');
        } catch (error) {
            console.error('Error updating stock:', error);
            alert('Error updating stock');
        }
    };

    return (
        <div className="inventory-management">
            <h1>Inventory Management</h1>

            <div className="inventory-grid">
                {products.map(product => (
                    <div key={product._id} className="inventory-card">
                        <img src={product.images[0]} alt={product.name} />
                        <h3>{product.name}</h3>

                        <div className="variants-list">
                            {product.variants && product.variants.map((variant, index) => (
                                <div key={index} className={`variant-item ${variant.stockQuantity < 10 ? 'low-stock' : ''}`}>
                                    <span>{variant.size} - {variant.color}</span>
                                    <span className="stock-qty">Stock: {variant.stockQuantity}</span>
                                    {variant.stockQuantity < 10 && <span className="low-stock-warning">⚠️ Low</span>}
                                </div>
                            ))}
                        </div>

                        <button className="update-stock-btn" onClick={() => setSelectedProduct(product)}>
                            Update Stock
                        </button>
                    </div>
                ))}
            </div>

            {selectedProduct && (
                <div className="stock-modal">
                    <div className="modal-content">
                        <h2>Update Stock for {selectedProduct.name}</h2>

                        <form onSubmit={handleUpdateStock}>
                            <select
                                value={stockUpdate.size}
                                onChange={(e) => setStockUpdate({ ...stockUpdate, size: e.target.value })}
                                required
                            >
                                <option value="">Select Size</option>
                                {selectedProduct.sizes.map(size => (
                                    <option key={size} value={size}>{size}</option>
                                ))}
                            </select>

                            <select
                                value={stockUpdate.color}
                                onChange={(e) => setStockUpdate({ ...stockUpdate, color: e.target.value })}
                                required
                            >
                                <option value="">Select Color</option>
                                {selectedProduct.colors.map(color => (
                                    <option key={color} value={color}>{color}</option>
                                ))}
                            </select>

                            <input
                                type="number"
                                placeholder="New Stock Quantity"
                                value={stockUpdate.stockQuantity}
                                onChange={(e) => setStockUpdate({ ...stockUpdate, stockQuantity: Number(e.target.value) })}
                                required
                                min="0"
                            />

                            <div className="modal-actions">
                                <button type="submit" className="submit-btn">Update</button>
                                <button type="button" className="cancel-btn" onClick={() => setSelectedProduct(null)}>
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default InventoryManagement;
