import { useState, useEffect } from 'react';
import { ordersAPI } from '../../services/api';
import '../../styles/AdminComponents.css';

const OrderManagement = () => {
    const [orders, setOrders] = useState([]);
    const [filterStatus, setFilterStatus] = useState('');

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await ordersAPI.getAll();
            setOrders(response.data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    const handleStatusUpdate = async (orderId, newStatus) => {
        try {
            await ordersAPI.updateStatus(orderId, newStatus);
            fetchOrders();
        } catch (error) {
            console.error('Error updating order status:', error);
        }
    };

    const filteredOrders = filterStatus
        ? orders.filter(order => order.status === filterStatus)
        : orders;

    return (
        <div className="order-management">
            <div className="management-header">
                <h1>Order Management</h1>

                <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="filter-select">
                    <option value="">All Orders</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                </select>
            </div>

            <div className="orders-list">
                {filteredOrders.map(order => (
                    <div key={order._id} className="order-management-card">
                        <div className="order-header">
                            <h3>Order #{order.orderId}</h3>
                            <span className={`status-badge status-${order.status}`}>{order.status}</span>
                        </div>

                        <div className="order-info">
                            <p><strong>Customer:</strong> {order.userId?.name || 'N/A'}</p>
                            <p><strong>Email:</strong> {order.userId?.email || 'N/A'}</p>
                            <p><strong>Date:</strong> {new Date(order.orderDate).toLocaleDateString()}</p>
                            <p><strong>Total:</strong> ${order.totalAmount.toFixed(2)}</p>
                        </div>

                        <div className="order-items">
                            <h4>Items:</h4>
                            {order.items.map((item, index) => (
                                <div key={index} className="item-row">
                                    <span>{item.name} ({item.size}, {item.color})</span>
                                    <span>× {item.quantity}</span>
                                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                                </div>
                            ))}
                        </div>

                        <div className="shipping-address">
                            <h4>Shipping Address:</h4>
                            <p>{order.shippingAddress.addressLine1}</p>
                            {order.shippingAddress.addressLine2 && <p>{order.shippingAddress.addressLine2}</p>}
                            <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}</p>
                        </div>

                        <div className="order-actions">
                            <label>Update Status:</label>
                            <select
                                value={order.status}
                                onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                            >
                                <option value="processing">Processing</option>
                                <option value="shipped">Shipped</option>
                                <option value="delivered">Delivered</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                        </div>
                    </div>
                ))}
            </div>

            {filteredOrders.length === 0 && (
                <p className="no-orders">No orders found</p>
            )}
        </div>
    );
};

export default OrderManagement;
