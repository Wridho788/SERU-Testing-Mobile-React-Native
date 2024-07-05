import { configureStore } from '@reduxjs/toolkit';
import inputReducer from './slice';

const store = configureStore({
  reducer: {
    input: inputReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;