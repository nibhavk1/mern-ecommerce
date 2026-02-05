import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { ordersAPI, authAPI } from '../services/api';
import OrderSummary from '../components/OrderSummary';
import '../styles/Checkout.css';

const Checkout = () => {
    const { cart, getCartTotal, clearCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [addresses, setAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [showAddressForm, setShowAddressForm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [newAddress, setNewAddress] = useState({
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'USA'
    });

    useEffect(() => {
        if (cart.length === 0) {
            navigate('/cart');
        }
        fetchUserProfile();
    }, []);

    const fetchUserProfile = async () => {
        try {
            const response = await authAPI.getProfile();
            setAddresses(response.data.addresses || []);
            const defaultAddr = response.data.addresses?.find(a => a.isDefault);
            if (defaultAddr) setSelectedAddress(defaultAddr);
        } catch (error) {
            console.error('Error fetching profile:', error);
        }
    };

    const handleAddAddress = async (e) => {
        e.preventDefault();
        try {
            const response = await authAPI.getProfile();
            const updatedAddresses = [...(response.data.addresses || []), newAddress];
            await authAPI.updateProfile({ addresses: updatedAddresses });
            setAddresses(updatedAddresses);
            setSelectedAddress(newAddress);
            setShowAddressForm(false);
            setNewAddress({
                addressLine1: '',
                addressLine2: '',
                city: '',
                state: '',
                zipCode: '',
                country: 'USA'
            });
        } catch (error) {
            console.error('Error adding address:', error);
        }
    };

    const handlePlaceOrder = async () => {
        if (!selectedAddress) {
            alert('Please select a shipping address');
            return;
        }

        setLoading(true);
        try {
            const shipping = 10.00;
            const tax = getCartTotal() * 0.08;
            const totalAmount = getCartTotal() + shipping + tax;

            await ordersAPI.create({
                items: cart,
                shippingAddress: selectedAddress,
                totalAmount
            });

            clearCart();
            navigate('/orders');
        } catch (error) {
            console.error('Error placing order:', error);
            alert('Error placing order. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="checkout-page">
            <h1>Checkout</h1>

            <div className="checkout-container">
                <div className="checkout-main">
                    <section className="shipping-section">
                        <h2>Shipping Address</h2>

                        {addresses.length > 0 && (
                            <div className="saved-addresses">
                                {addresses.map((addr, index) => (
                                    <label key={index} className="address-option">
                                        <input
                                            type="radio"
                                            name="address"
                                            checked={selectedAddress === addr}
                                            onChange={() => setSelectedAddress(addr)}
                                        />
                                        <div className="address-content">
                                            <p>{addr.addressLine1}</p>
                                            {addr.addressLine2 && <p>{addr.addressLine2}</p>}
                                            <p>{addr.city}, {addr.state} {addr.zipCode}</p>
                                            <p>{addr.country}</p>
                                        </div>
                                    </label>
                                ))}
                            </div>
                        )}

                        {!showAddressForm ? (
                            <button className="add-address-btn" onClick={() => setShowAddressForm(true)}>
                                + Add New Address
                            </button>
                        ) : (
                            <form onSubmit={handleAddAddress} className="address-form">
                                <input
                                    type="text"
                                    placeholder="Address Line 1"
                                    value={newAddress.addressLine1}
                                    onChange={(e) => setNewAddress({ ...newAddress, addressLine1: e.target.value })}
                                    required
                                />
                                <input
                                    type="text"
                                    placeholder="Address Line 2 (Optional)"
                                    value={newAddress.addressLine2}
                                    onChange={(e) => setNewAddress({ ...newAddress, addressLine2: e.target.value })}
                                />
                                <input
                                    type="text"
                                    placeholder="City"
                                    value={newAddress.city}
                                    onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                                    required
                                />
                                <input
                                    type="text"
                                    placeholder="State"
                                    value={newAddress.state}
                                    onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                                    required
                                />
                                <input
                                    type="text"
                                    placeholder="ZIP Code"
                                    value={newAddress.zipCode}
                                    onChange={(e) => setNewAddress({ ...newAddress, zipCode: e.target.value })}
                                    required
                                />
                                <div className="form-actions">
                                    <button type="submit" className="save-address-btn">Save Address</button>
                                    <button type="button" className="cancel-btn" onClick={() => setShowAddressForm(false)}>
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        )}
                    </section>
                </div>

                <div className="checkout-sidebar">
                    <OrderSummary items={cart} total={getCartTotal()} />
                    <button
                        className="place-order-btn"
                        onClick={handlePlaceOrder}
                        disabled={loading || !selectedAddress}
                    >
                        {loading ? 'Placing Order...' : 'Place Order'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
