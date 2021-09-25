import counterReducer from '../listFeatures/Counter/counterSlice';
import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../listFeatures/Auth/userSlice';
import cartReducer from '../listFeatures/Cart/cartSlice';
const rootReducer = {
  count: counterReducer,
  user: userReducer,
  cart: cartReducer,
};
const store = configureStore({
  reducer: rootReducer,
});

export default store;
