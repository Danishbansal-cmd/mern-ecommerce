import axios from "axios";

import {createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const initialState = {
    isLoading : false,
    cartItems : []
}

export const addToCart = createAsyncThunk(
    "cart/addToCart",
    async ({ userId, productId, quantity }) => {
        console.log('slice add to cart')
      const response = await axios.post(
        "http://localhost:5000/api/shop/cart/add",
        {
          userId,
          productId,
          quantity,
        }
      );
  
      return response.data;
    }
  );
export const fetchCartItems = createAsyncThunk('cart/fetchCartItems', async(userId) => {
    const response = await axios.get(`http://localhost:5000/api/shop/cart/get/${userId}`);
    return response.data;
});
export const deleteCartItem = createAsyncThunk(
    "cart/deleteCartItem",
    async ({ userId, productId }) => {
      const response = await axios.delete(
        `http://localhost:5000/api/shop/cart/${userId}/${productId}`
      );
  
      return response.data;
    }
  );
export const updateCartQuantity = createAsyncThunk('cart/updateCartQuantity', async({userId, productId, quantity}) => {
    const response = await axios.put('http://localhost:5000/api/shop/cart/update-cart', {
        userId, productId, quantity
    });
    return response.data;
});


const shoppingCartSlice = createSlice({
    name : 'shoppingCart',
    initialState,
    reducers : {},
    extraReducers : (builder) => {
        builder
        .addCase(addToCart.pending, (state, action) => {
            state.isLoading = true
        })
        .addCase(addToCart.fulfilled, (state, action) => {
            state.isLoading = false,
            state.cartItems = action.payload.data;
        })
        .addCase(addToCart.rejected, (state, action) => {
            state.isLoading = false,
            state.cartItems = [];
        })
        .addCase(fetchCartItems.pending, (state, action) => {
            state.isLoading = true
        })
        .addCase(fetchCartItems.fulfilled, (state, action) => {
            state.isLoading = false,
            state.cartItems = action.payload.data;
        })
        .addCase(fetchCartItems.rejected, (state, action) => {
            state.isLoading = false,
            state.cartItems = [];
        })
        .addCase(updateCartQuantity.pending, (state, action) => {
            state.isLoading = true
        })
        .addCase(updateCartQuantity.fulfilled, (state, action) => {
            state.isLoading = false,
            state.cartItems = action.payload.data;
        })
        .addCase(updateCartQuantity.rejected, (state, action) => {
            state.isLoading = false,
            state.cartItems = [];
        })
        .addCase(deleteCartItem.pending, (state, action) => {
            state.isLoading = true
        })
        .addCase(deleteCartItem.fulfilled, (state, action) => {
            state.isLoading = false,
            state.cartItems = action.payload.data;
        })
        .addCase(deleteCartItem.rejected, (state, action) => {
            state.isLoading = false,
            state.cartItems = [];
            console.log(action);
        })
    }
});

export default shoppingCartSlice.reducer;