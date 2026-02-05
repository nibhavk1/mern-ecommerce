import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authAPI } from '../services/api';
import '../styles/Profile.css';

const Profile = () => {
    const { user, updateProfile } = useAuth();
    const [profileData, setProfileData] = useState({
        name: '',
        phone: '',
        addresses: []
    });
    const [editing, setEditing] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            fetchProfile();
        }
    }, [user]);

    const fetchProfile = async () => {
        try {
            const response = await authAPI.getProfile();
            setProfileData({
                name: response.data.name || '',
                phone: response.data.phone || '',
                addresses: response.data.addresses || []
            });
        } catch (error) {
            console.error('Error fetching profile:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const result = await updateProfile(profileData);
        if (result.success) {
            setEditing(false);
        }
        setLoading(false);
    };

    const handleDeleteAddress = async (index) => {
        const updatedAddresses = profileData.addresses.filter((_, i) => i !== index);
        setProfileData({ ...profileData, addresses: updatedAddresses });
        await updateProfile({ addresses: updatedAddresses });
    };

    return (
        <div className="profile-page">
            <h1>My Profile</h1>

            <div className="profile-container">
                <section className="profile-info">
                    <div className="section-header">
                        <h2>Personal Information</h2>
                        <button className="edit-btn" onClick={() => setEditing(!editing)}>
                            {editing ? 'Cancel' : 'Edit'}
                        </button>
                    </div>

                    {editing ? (
                        <form onSubmit={handleSubmit} className="profile-form">
                            <div className="form-group">
                                <label>Name</label>
                                <input
                                    type="text"
                                    value={profileData.name}
                                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Email</label>
                                <input type="email" value={user?.email} disabled />
                                <small>Email cannot be changed</small>
                            </div>

                            <div className="form-group">
                                <label>Phone</label>
                                <input
                                    type="tel"
                                    value={profileData.phone}
                                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                                />
                            </div>

                            <button type="submit" className="save-btn" disabled={loading}>
                                {loading ? 'Saving...' : 'Save Changes'}
                            </button>
                        </form>
                    ) : (
                        <div className="profile-details">
                            <p><strong>Name:</strong> {profileData.name}</p>
                            <p><strong>Email:</strong> {user?.email}</p>
                            <p><strong>Phone:</strong> {profileData.phone || 'Not provided'}</p>
                            <p><strong>Role:</strong> {user?.role}</p>
                        </div>
                    )}
                </section>

                <section className="addresses-section">
                    <h2>Saved Addresses</h2>

                    {profileData.addresses.length === 0 ? (
                        <p>No saved addresses</p>
                    ) : (
                        <div className="addresses-list">
                            {profileData.addresses.map((addr, index) => (
                                <div key={index} className="address-card">
                                    <p>{addr.addressLine1}</p>
                                    {addr.addressLine2 && <p>{addr.addressLine2}</p>}
                                    <p>{addr.city}, {addr.state} {addr.zipCode}</p>
                                    <p>{addr.country}</p>
                                    {addr.isDefault && <span className="default-badge">Default</span>}
                                    <button className="delete-address-btn" onClick={() => handleDeleteAddress(index)}>
                                        Delete
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </section>

                <section className="quick-links">
                    <h2>Quick Links</h2>
                    <Link to="/orders" className="quick-link">View My Orders</Link>
                    <Link to="/wishlist" className="quick-link">View Wishlist</Link>
                    {user?.role === 'admin' && <Link to="/admin" className="quick-link">Admin Dashboard</Link>}
                </section>
            </div>
        </div>
    );
};

export default Profile;
