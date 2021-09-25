import { createSelector } from 'reselect';

const cartItemSelector = (state) => state.cart.cartItems;

export const cartItemsQuantitySelector = createSelector(cartItemSelector, (cartItems) =>
  cartItems.reduce((acc, item) => acc + item.quantity, 0)
);
export const cartItemsTotalSelector = createSelector(cartItemSelector, (cartItems) =>
  cartItems.reduce((acc, item) => acc + item.product.salePrice * item.quantity, 0)
);
