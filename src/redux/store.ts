import { configureStore } from '@reduxjs/toolkit';
import { CounterReducer } from './slices/counterSlice';
import { ProductReducer } from './slices/productSlice';

export const store = configureStore({
  reducer: {
    counter: CounterReducer,
    product: ProductReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
