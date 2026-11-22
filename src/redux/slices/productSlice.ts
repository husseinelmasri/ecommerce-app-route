import { GetAllProducts } from '@/services/product.service';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

type Product = Awaited<ReturnType<typeof GetAllProducts>>[number];

export const productAction = createAsyncThunk<Product[]>(
  'product/getAllProducts',
  async () => {
    const response = await GetAllProducts();
    return response;
  },
);

const initialState: {
  products: Product[];
  loading: boolean;
  error: string | null;
} = {
  products: [],
  loading: false,
  error: null,
};

export const ProductSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(productAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(productAction.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(productAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Failed to load products';
      });
  },
});

export const ProductReducer = ProductSlice.reducer;
