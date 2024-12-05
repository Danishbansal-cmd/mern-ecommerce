import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    isLoading : false,
    productList : [],
    productDetails : null,
}

export const fetchAllFilteredProducts = createAsyncThunk('/products/fetchAllFilteredProducts', async ({filterParams, sortParams}) => {
    const query = new URLSearchParams({...filterParams, sortBy : sortParams})
    const result = await axios.get(`http://localhost:5000/api/shop/products/get?${query}`
    );
    return result?.data;
});

export const fetchProductDetails = createAsyncThunk('/product/fetchProductDetails', async(id) => {
    const result = await axios.get(`http://localhost:5000/api/shop/products/get/${id}`);
    return result?.data;
})

const shoppingProductSlice = createSlice({
    name : 'shoppingProducts',
    initialState,
    reducers : {
        setProductDetails : (state, action) => {
            state.productDetails = null
        }
    },
    extraReducers : (builder) => {
        builder.addCase(fetchAllFilteredProducts.pending, (state) => {
            state.isLoading = true
        }).addCase(fetchAllFilteredProducts.fulfilled, (state, action) => {
            console.log(action.payload);
            state.isLoading = false;
            state.productList = action.payload.data;
        }).addCase(fetchAllFilteredProducts.rejected, (state, action) => {
            console.log(action.payload, "action.payload of");
            state.isLoading = false;
            state.productList = [];
        }).addCase(fetchProductDetails.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(fetchProductDetails.fulfilled, (state, action) => {
            state.isLoading = false;
            state.productDetails = action.payload.data;
        }).addCase(fetchProductDetails.rejected, (state, action) => {
            state.isLoading = false;
            state.productDetails = null;
        })
    }
})

export const { setProductDetails} = shoppingProductSlice.actions;

export default shoppingProductSlice.reducer;