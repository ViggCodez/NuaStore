import axios from 'axios';

const api = axios.create({
  baseURL: 'https://fakestoreapi.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchProducts = () => api.get('/products');
export const fetchProductById = (id) => api.get(`/products/${id}`);
export const fetchCategories = () => api.get('/products/categories');
export const fetchProductsByCategory = (category) => api.get(`/products/category/${category}`);

export default api;
