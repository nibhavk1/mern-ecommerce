import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ordersAPI, productsAPI } from '../../services/api';
import '../../styles/AdminDashboard.css';

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        totalOrders: 0,
        totalProducts: 0,
        totalRevenue: 0
    });
    const [recentOrders, setRecentOrders] = useState([]);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const [ordersRes, productsRes] = await Promise.all([
                ordersAPI.getAll(),
                productsAPI.getAll()
            ]);

            const orders = ordersRes.data;
            const revenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);

            setStats({
                totalOrders: orders.length,
                totalProducts: productsRes.data.length,
                totalRevenue: revenue
            });

            setRecentOrders(orders.slice(0, 5));
        } catch (error) {
            console.error('Error fetching stats:', error);
        }
    };

    return (
        <div className="admin-dashboard">
            <h1 data-aos="fade-up">Admin Dashboard</h1>

            <div className="stats-grid">
                <div className="stat-card" data-aos="zoom-in" data-aos-delay="100">
                    <h3>Total Orders</h3>
                    <p className="stat-value">{stats.totalOrders}</p>
                </div>
                <div className="stat-card" data-aos="zoom-in" data-aos-delay="200">
                    <h3>Total Products</h3>
                    <p className="stat-value">{stats.totalProducts}</p>
                </div>
                <div className="stat-card" data-aos="zoom-in" data-aos-delay="300">
                    <h3>Total Revenue</h3>
                    <p className="stat-value">${stats.totalRevenue.toFixed(2)}</p>
                </div>
            </div>

            <div className="admin-sections">
                <Link to="/admin/products" className="admin-section-card" data-aos="fade-up" data-aos-delay="100">
                    <h3>📦 Product Management</h3>
                    <p>Add, edit, and manage products</p>
                </Link>
                <Link to="/admin/inventory" className="admin-section-card" data-aos="fade-up" data-aos-delay="200">
                    <h3>📊 Inventory Management</h3>
                    <p>Track and update stock levels</p>
                </Link>
                <Link to="/admin/orders" className="admin-section-card" data-aos="fade-up" data-aos-delay="300">
                    <h3>🛍️ Order Management</h3>
                    <p>View and manage customer orders</p>
                </Link>
            </div>

            <div className="recent-orders" data-aos="fade-up" data-aos-delay="400">
                <h2>Recent Orders</h2>
                <table className="orders-table">
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Customer</th>
                            <th>Date</th>
                            <th>Total</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recentOrders.map(order => (
                            <tr key={order._id}>
                                <td>{order.orderId}</td>
                                <td>{order.userId?.name || 'N/A'}</td>
                                <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                                <td>${order.totalAmount.toFixed(2)}</td>
                                <td><span className={`status-${order.status}`}>{order.status}</span></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminDashboard;
