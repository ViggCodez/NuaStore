import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ShoppingCart } from 'lucide-react';

const Navbar = () => {
    const cartItems = useSelector((state) => state.cart.items);
    const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

    return (
        <nav className="navbar">
            <div className="container navbar-content">
                <Link to="/" className="logo">NuaStore</Link>
                <div className="nav-links">
                    <Link to="/about" style={{ fontWeight: 500, color: 'var(--text-inverse)' }}>About Us</Link>
                    <Link to="/cart" className="cart-link">
                        <ShoppingCart size={24} />
                        {itemCount > 0 && <span className="cart-badge">{itemCount}</span>}
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
