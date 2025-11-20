import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { removeFromCart, updateQuantity } from '../store/cartSlice';
import { Trash2, ArrowRight } from 'lucide-react';

const Cart = () => {
    const { items } = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    if (items.length === 0) {
        return (
            <div className="container" style={{ textAlign: 'center', padding: '4rem 0' }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Your cart is empty</h2>
                <Link to="/" className="btn btn-primary">Start Shopping</Link>
            </div>
        );
    }

    return (
        <div className="container">
            <h1 style={{ fontSize: '1.875rem', fontWeight: 700, marginBottom: '2rem' }}>Shopping Cart</h1>

            <div className="cart-layout" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                <div className="cart-items">
                    {items.map((item) => (
                        <div key={item.id} className="card" style={{ display: 'flex', gap: '1rem', padding: '1rem', marginBottom: '1rem', alignItems: 'center' }}>
                            <img
                                src={item.image}
                                alt={item.title}
                                style={{ width: '80px', height: '80px', objectFit: 'contain' }}
                            />
                            <div style={{ flex: 1 }}>
                                <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.25rem' }}>{item.title}</h3>
                                <p style={{ color: 'var(--text-light)', fontSize: '0.875rem' }}>₹{item.price}</p>
                            </div>

                            <div className="quantity-selector" style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--border-color)', borderRadius: 'var(--radius)' }}>
                                <button
                                    onClick={() => dispatch(updateQuantity({ id: item.id, quantity: Math.max(1, item.quantity - 1) }))}
                                    style={{ padding: '0.25rem 0.5rem', border: 'none', background: 'transparent', cursor: 'pointer' }}
                                >-</button>
                                <span style={{ padding: '0 0.5rem', fontSize: '0.875rem' }}>{item.quantity}</span>
                                <button
                                    onClick={() => dispatch(updateQuantity({ id: item.id, quantity: Math.min(10, item.quantity + 1) }))}
                                    style={{ padding: '0.25rem 0.5rem', border: 'none', background: 'transparent', cursor: 'pointer' }}
                                >+</button>
                            </div>

                            <button
                                onClick={() => dispatch(removeFromCart(item.id))}
                                style={{ padding: '0.5rem', color: '#ef4444', background: 'transparent', border: 'none', cursor: 'pointer' }}
                            >
                                <Trash2 size={20} />
                            </button>
                        </div>
                    ))}
                </div>

                <div className="cart-summary" style={{ height: 'fit-content' }}>
                    <div className="card" style={{ padding: '1.5rem' }}>
                        <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem' }}>Order Summary</h2>

                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                            <span style={{ color: 'var(--text-light)' }}>Subtotal</span>
                            <span>₹{total.toFixed(2)}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                            <span style={{ color: 'var(--text-light)' }}>Shipping</span>
                            <span style={{ color: 'var(--success-color)' }}>Free</span>
                        </div>

                        <div style={{ borderTop: '1px solid var(--border-color)', margin: '1rem 0' }}></div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', fontWeight: 700, fontSize: '1.125rem' }}>
                            <span>Total</span>
                            <span>₹{total.toFixed(2)}</span>
                        </div>

                        <Link to="/checkout" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                            Proceed to Checkout <ArrowRight size={16} />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
