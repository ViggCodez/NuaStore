import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getProducts, getCategories } from '../store/productSlice';
import { Search, ChevronDown } from 'lucide-react';

const ProductList = () => {
    const dispatch = useDispatch();
    const { products, categories, status, error } = useSelector((state) => state.products);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(getProducts());
            dispatch(getCategories());
        }
    }, [status, dispatch]);

    const filteredProducts = products.filter((product) => {
        const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
        return matchesSearch && matchesCategory;
    });

    if (status === 'loading') {
        return <div className="loading-spinner"></div>;
    }

    if (status === 'failed') {
        return <div className="error-message">Error: {error}</div>;
    }

    return (
        <div className="container">
            <div className="filters-container">
                <div className="search-wrapper">
                    <Search className="search-icon" size={20} />
                    <input
                        type="text"
                        placeholder="Search products..."
                        className="search-input"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="filter-wrapper custom-dropdown-container">
                    <button
                        className={`dropdown-trigger ${isDropdownOpen ? 'active' : ''}`}
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                        <span>
                            {selectedCategory
                                ? selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)
                                : 'All Categories'}
                        </span>
                        <ChevronDown size={16} className={`dropdown-icon ${isDropdownOpen ? 'rotate' : ''}`} />
                    </button>

                    {isDropdownOpen && (
                        <div className="dropdown-menu">
                            <div
                                className={`dropdown-item ${selectedCategory === '' ? 'selected' : ''}`}
                                onClick={() => {
                                    setSelectedCategory('');
                                    setIsDropdownOpen(false);
                                }}
                            >
                                All Categories
                            </div>
                            {categories.map((category) => (
                                <div
                                    key={category}
                                    className={`dropdown-item ${selectedCategory === category ? 'selected' : ''}`}
                                    onClick={() => {
                                        setSelectedCategory(category);
                                        setIsDropdownOpen(false);
                                    }}
                                >
                                    {category.charAt(0).toUpperCase() + category.slice(1)}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 grid-cols-2 grid-cols-3 grid-cols-4">
                {filteredProducts.map((product) => (
                    <Link to={`/product/${product.id}`} key={product.id} className="card">
                        <div className="product-image-container" style={{ height: '200px', padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}>
                            <img
                                src={product.image}
                                alt={product.title}
                                style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
                            />
                        </div>
                        <div className="product-info" style={{ padding: '1rem' }}>
                            <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.5rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                {product.title}
                            </h3>
                            <p style={{ color: 'var(--text-light)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                                {product.category}
                            </p>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontWeight: 700, fontSize: '1.125rem' }}>₹{product.price}</span>
                                <span style={{ fontSize: '0.875rem', color: '#fbbf24' }}>★ {product.rating.rate}</span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {filteredProducts.length === 0 && (
                <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-light)' }}>
                    No products found.
                </div>
            )}
        </div>
    );
};

export default ProductList;
