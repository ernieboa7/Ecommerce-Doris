import axiosInstance from "../utils/api"; //  use centralized axios
import Cookies from "js-cookie";
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING,
  CART_SAVE_PAYMENT,
} from "../constants/cartConstants";

// Add item to cart
const addToCart = (productId, qty) => async (dispatch, getState) => {
  try {
    // Fetch product details from your backend API (Render)
    const { data } = await axiosInstance.get(`/products/${productId}`);

    dispatch({
      type: CART_ADD_ITEM,
      payload: {
        product: data._id,
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        qty,
      },
    });

    const {
      cart: { cartItems },
    } = getState();
    Cookies.set("cartItems", JSON.stringify(cartItems));
  } catch (error) {
    console.error("Error adding to cart:", error.message);
  }
};

// Remove item from cart
const removeFromCart = (productId) => (dispatch, getState) => {
  dispatch({ type: CART_REMOVE_ITEM, payload: productId });

  const {
    cart: { cartItems },
  } = getState();
  Cookies.set("cartItems", JSON.stringify(cartItems));
};

// Save shipping address
const saveShipping = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_SHIPPING, payload: data });
  Cookies.set("shippingAddress", JSON.stringify(data));
};

// Save payment method
const savePayment = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_PAYMENT, payload: data });
  Cookies.set("paymentMethod", JSON.stringify(data));
};





export { addToCart, removeFromCart, saveShipping, savePayment }