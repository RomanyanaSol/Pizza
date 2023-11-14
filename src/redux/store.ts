import { configureStore } from '@reduxjs/toolkit';
import filter from './filter/slice.ts';
import pizza from './pizza/slice.ts';
import { useDispatch } from 'react-redux';
import cart from './cart/slice.ts'

export const store = configureStore({
  reducer: {
    filter,
    cart,
    pizza
  }
})

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();