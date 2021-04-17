import { ADD_TO_CART, REMOVE_FROM_CART, CLEAR_CART } from "../constants";

// Add
export const addToCart = (payload) => {
  return {
    type: ADD_TO_CART,
    payload,
  };
};

// Remove
export const removeFromCart = (payload) => {
  return {
    type: REMOVE_FROM_CART,
    payload,
  };
};

// Clear
export const clearCart = () => {
  return {
    type: CLEAR_CART,
  };
};
