import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = { counter: 0 };

export const CounterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.counter++;
    },
    decrement: (state) => {
      state.counter--;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.counter += action.payload;
    },
  },
});

export const CounterReducer = CounterSlice.reducer;

export const { increment, decrement, incrementByAmount } = CounterSlice.actions;
