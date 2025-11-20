import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchProductById } from '../services/api';
import { addToCart } from '../store/cartSlice';
import { ArrowLeft, ShoppingCart, Star } from 'lucide-react';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const getProduct = async () => {
            try {
                setLoading(true);
                const response = await fetchProductById(id);
                const data = response.data;
                const transformedProduct = {
                    ...data,
                    title: `Nua ${data.title}`,
                    price: Math.round(data.price * 83),
                    originalTitle: data.title
                };
                setProduct(transformedProduct);
            } catch (err) {
                setError('Failed to load product details.');
            } finally {
                setLoading(false);
            }
        };
        getProduct();
    }, [id]);

    const handleAddToCart = () => {
        if (product) {
            dispatch(addToCart({ ...product, quantity }));
            alert('Added to cart!');
        }
    };

    if (loading) return <div className="loading-spinner"></div>;
    if (error) return <div className="error-message">{error}</div>;
    if (!product) return <div className="error-message">Product not found</div>;

    return (
        <div className="container">
            <button onClick={() => navigate(-1)} className="btn btn-outline" style={{ marginBottom: '2rem' }}>
                <ArrowLeft size={16} /> Back
            </button>

            <div className="product-detail" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
                <div className="image-container" style={{ backgroundColor: 'white', padding: '2rem', borderRadius: 'var(--radius)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img
                        src={product.image}
                        alt={product.title}
                        style={{ maxWidth: '100%', maxHeight: '400px', objectFit: 'contain' }}
                    />
                </div>

                <div className="info-container">
                    <span style={{ color: 'var(--primary-color)', fontWeight: 600, fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        {product.category}
                    </span>
                    <h1 style={{ fontSize: '2rem', fontWeight: 700, margin: '0.5rem 0 1rem' }}>{product.title}</h1>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', color: '#fbbf24' }}>
                            <Star fill="#fbbf24" size={20} />
                            <span style={{ fontWeight: 600, marginLeft: '0.25rem' }}>{product.rating.rate}</span>
                            <span style={{ color: 'var(--text-light)', marginLeft: '0.25rem' }}>({product.rating.count} reviews)</span>
                        </div>
                    </div>

                    <p style={{ fontSize: '1.125rem', lineHeight: '1.6', color: 'var(--text-light)', marginBottom: '2rem' }}>
                        {product.description}
                    </p>

                    <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-color)', marginBottom: '2rem' }}>
                        ₹{product.price}
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <div className="quantity-selector" style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--border-color)', borderRadius: 'var(--radius)' }}>
                            <button
                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                style={{ padding: '0.5rem 1rem', border: 'none', background: 'transparent', cursor: 'pointer' }}
                            >-</button>
                            <span style={{ padding: '0.5rem 1rem', fontWeight: 600 }}>{quantity}</span>
                            <button
                                onClick={() => setQuantity(Math.min(5, quantity + 1))}
                                style={{ padding: '0.5rem 1rem', border: 'none', background: 'transparent', cursor: 'pointer' }}
                            >+</button>
                        </div>

                        <button onClick={handleAddToCart} className="btn btn-primary" style={{ flex: 1, padding: '0.75rem' }}>
                            <ShoppingCart size={20} /> Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
