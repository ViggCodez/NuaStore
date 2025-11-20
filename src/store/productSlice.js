import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchProducts, fetchCategories } from '../services/api';

export const getProducts = createAsyncThunk(
    'products/getProducts',
    async (_, { getState }) => {
        const { products } = getState().products;
        if (products.length > 0) {
            return products;
        }
        const response = await fetchProducts();
        const transformedProducts = response.data.map(product => ({
            ...product,
            title: `Nua ${product.title}`,
            price: Math.round(product.price * 83),
            originalTitle: product.title
        }));
        return transformedProducts;
    }
);

export const getCategories = createAsyncThunk(
    'products/getCategories',
    async (_, { getState }) => {
        const { categories } = getState().products;
        if (categories.length > 0) {
            return categories;
        }
        const response = await fetchCategories();
        return response.data;
    }
);

const productSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
        categories: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.products = action.payload;
            })
            .addCase(getProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(getCategories.fulfilled, (state, action) => {
                state.categories = action.payload;
            });
    },
});

export default productSlice.reducer;
