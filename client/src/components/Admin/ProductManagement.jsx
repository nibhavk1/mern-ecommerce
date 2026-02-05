import { useState, useEffect } from 'react';
import { productsAPI } from '../../services/api';
import '../../styles/AdminComponents.css';

const ProductManagement = () => {
    const [products, setProducts] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('All');
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        category: 'Men',
        price: '',
        images: [''],
        sizes: [],
        colors: [],
        variants: []
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingProduct) {
                await productsAPI.update(editingProduct._id, formData);
            } else {
                await productsAPI.create(formData);
            }
            resetForm();
            fetchProducts();
        } catch (error) {
            console.error('Error saving product:', error);
            alert('Error saving product');
        }
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
        setFormData(product);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await productsAPI.delete(id);
                fetchProducts();
            } catch (error) {
                console.error('Error deleting product:', error);
            }
        }
    };

    const resetForm = () => {
        setFormData({
            name: '',
            description: '',
            category: 'Men',
            price: '',
            images: [''],
            sizes: [],
            colors: [],
            variants: []
        });
        setEditingProduct(null);
        setShowForm(false);
    };

    // Filter products based on search and category
    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = filterCategory === 'All' || product.category === filterCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="product-management">
            <div className="management-header">
                <h1>Product Management</h1>
                <button className="add-btn" onClick={() => setShowForm(!showForm)}>
                    {showForm ? 'Cancel' : '+ Add Product'}
                </button>
            </div>

            {showForm && (
                <form onSubmit={handleSubmit} className="product-form">
                    <h3>{editingProduct ? 'Edit Product' : 'Add New Product'}</h3>

                    <div className="form-grid">
                        <input
                            type="text"
                            placeholder="Product Name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                            className="form-field-full"
                        />

                        <select
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        >
                            <option value="Men">Men</option>
                            <option value="Women">Women</option>
                            <option value="Kids">Kids</option>
                            <option value="Accessories">Accessories</option>
                        </select>

                        <input
                            type="number"
                            placeholder="Price"
                            step="0.01"
                            value={formData.price}
                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                            required
                        />

                        <textarea
                            placeholder="Description"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            required
                            className="form-field-full"
                        />

                        <input
                            type="text"
                            placeholder="Image URL"
                            value={formData.images[0]}
                            onChange={(e) => setFormData({ ...formData, images: [e.target.value] })}
                            className="form-field-full"
                        />

                        <input
                            type="text"
                            placeholder="Sizes (comma-separated, e.g., S,M,L,XL)"
                            value={formData.sizes.join(',')}
                            onChange={(e) => setFormData({ ...formData, sizes: e.target.value.split(',').map(s => s.trim()) })}
                        />

                        <input
                            type="text"
                            placeholder="Colors (comma-separated, e.g., Black,White,Blue)"
                            value={formData.colors.join(',')}
                            onChange={(e) => setFormData({ ...formData, colors: e.target.value.split(',').map(c => c.trim()) })}
                        />
                    </div>

                    <button type="submit" className="submit-btn">
                        {editingProduct ? 'Update Product' : 'Create Product'}
                    </button>
                </form>
            )}

            <div className="search-filter-bar">
                <input
                    type="text"
                    placeholder="🔍 Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
                <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="filter-select"
                >
                    <option value="All">All Categories</option>
                    <option value="Men">Men</option>
                    <option value="Women">Women</option>
                    <option value="Kids">Kids</option>
                    <option value="Accessories">Accessories</option>
                </select>
            </div>

            <div className="products-table">
                <table>
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map(product => (
                                <tr key={product._id}>
                                    <td><img src={product.images[0]} alt={product.name} className="table-img" /></td>
                                    <td>{product.name}</td>
                                    <td>{product.category}</td>
                                    <td>${product.price.toFixed(2)}</td>
                                    <td>
                                        <span className={`status-badge ${product.isActive ? 'active' : 'inactive'}`}>
                                            {product.isActive ? 'Active' : 'Inactive'}
                                        </span>
                                    </td>
                                    <td>
                                        <button className="edit-btn" onClick={() => handleEdit(product)}>Edit</button>
                                        <button className="delete-btn" onClick={() => handleDelete(product._id)}>Delete</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="empty-state">
                                    <h3>No products found</h3>
                                    <p>Try adjusting your search or filter criteria</p>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProductManagement;
