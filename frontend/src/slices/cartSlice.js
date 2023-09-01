import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils";

// get cart data from local storage
const initialState = localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : {cartItems: [], shippingAddress: {}, paymentMethod: 'PayPal'};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;
            const existItem = state.cartItems.find((x) => x._id === item._id);

            if (existItem) {
                state.cartItems = state.cartItems.map((x) => x._id === existItem._id ? item : x);
            } else {
                state.cartItems = [...state.cartItems, item]; // add an item
            }

            return updateCart(state); // update cart state and local storage
        },
        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter((x) => x._id !== action.payload); // delete an item

            return updateCart(state); // update cart state and local storage
        },
        saveShippingAddress: (state, action) => {
            state.shippingAddress = action.payload;
            return updateCart(state); // update cart state and local storage
        },
        savePaymentMethod: (state, action) => {
            state.paymentMethod = action.payload;
            return updateCart(state); // update cart state and local storage
        },
        clearCartItems: (state, action) => {
            state.cartItems = [];
            return updateCart(state); // update cart state and local storage
        }
    },
});

export const { addToCart, removeFromCart, saveShippingAddress, savePaymentMethod, clearCartItems } = cartSlice.actions;

export default cartSlice.reducer;