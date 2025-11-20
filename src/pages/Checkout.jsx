import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../store/cartSlice';

const Checkout = () => {
    const { items } = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: '',
        city: '',
        zip: ''
    });

    const [errors, setErrors] = useState({});

    if (items.length === 0) {
        navigate('/');
        return null;
    }

    const validate = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = 'Name is required';
        if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Valid email is required';
        if (!formData.address) newErrors.address = 'Address is required';
        if (!formData.city) newErrors.city = 'City is required';
        if (!formData.zip) newErrors.zip = 'ZIP code is required';
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = validate();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setTimeout(() => {
            dispatch(clearCart());
            alert('Order placed successfully!');
            navigate('/');
        }, 1000);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: null });
        }
    };

    return (
        <div className="container">
            <h1 style={{ fontSize: '1.875rem', fontWeight: 700, marginBottom: '2rem' }}>Checkout</h1>

            <div className="checkout-layout" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                <div className="checkout-form card" style={{ padding: '2rem' }}>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1.5rem' }}>Shipping Information</h2>

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="form-label">Full Name</label>
                            <input
                                type="text"
                                name="name"
                                className="form-input"
                                value={formData.name}
                                onChange={handleChange}
                                style={{ borderColor: errors.name ? 'var(--danger-color)' : '' }}
                            />
                            {errors.name && <span style={{ color: 'var(--danger-color)', fontSize: '0.875rem' }}>{errors.name}</span>}
                        </div>

                        <div className="form-group">
                            <label className="form-label">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                className="form-input"
                                value={formData.email}
                                onChange={handleChange}
                                style={{ borderColor: errors.email ? 'var(--danger-color)' : '' }}
                            />
                            {errors.email && <span style={{ color: 'var(--danger-color)', fontSize: '0.875rem' }}>{errors.email}</span>}
                        </div>

                        <div className="form-group">
                            <label className="form-label">Address</label>
                            <input
                                type="text"
                                name="address"
                                className="form-input"
                                value={formData.address}
                                onChange={handleChange}
                                style={{ borderColor: errors.address ? 'var(--danger-color)' : '' }}
                            />
                            {errors.address && <span style={{ color: 'var(--danger-color)', fontSize: '0.875rem' }}>{errors.address}</span>}
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div className="form-group">
                                <label className="form-label">City</label>
                                <input
                                    type="text"
                                    name="city"
                                    className="form-input"
                                    value={formData.city}
                                    onChange={handleChange}
                                    style={{ borderColor: errors.city ? 'var(--danger-color)' : '' }}
                                />
                                {errors.city && <span style={{ color: 'var(--danger-color)', fontSize: '0.875rem' }}>{errors.city}</span>}
                            </div>

                            <div className="form-group">
                                <label className="form-label">ZIP Code</label>
                                <input
                                    type="text"
                                    name="zip"
                                    className="form-input"
                                    value={formData.zip}
                                    onChange={handleChange}
                                    style={{ borderColor: errors.zip ? 'var(--danger-color)' : '' }}
                                />
                                {errors.zip && <span style={{ color: 'var(--danger-color)', fontSize: '0.875rem' }}>{errors.zip}</span>}
                            </div>
                        </div>

                        <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem', justifyContent: 'center' }}>
                            Place Order
                        </button>
                    </form>
                </div>

                <div className="order-summary">
                    <div className="card" style={{ padding: '1.5rem' }}>
                        <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem' }}>Order Summary</h2>

                        <div style={{ marginBottom: '1rem' }}>
                            {items.map((item) => (
                                <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
                                    <span style={{ color: 'var(--text-light)' }}>{item.title} (x{item.quantity})</span>
                                    <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                                </div>
                            ))}
                        </div>

                        <div style={{ borderTop: '1px solid var(--border-color)', margin: '1rem 0' }}></div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                            <span style={{ color: 'var(--text-light)' }}>Subtotal</span>
                            <span>₹{total.toFixed(2)}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                            <span style={{ color: 'var(--text-light)' }}>Shipping</span>
                            <span style={{ color: 'var(--success-color)' }}>Free</span>
                        </div>

                        <div style={{ borderTop: '1px solid var(--border-color)', margin: '1rem 0' }}></div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '1.125rem' }}>
                            <span>Total</span>
                            <span>₹{total.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
