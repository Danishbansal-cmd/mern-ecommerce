import axios from "axios";
import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading : false,
    addressList : []
};

export const addNewAddress = createAsyncThunk('/address/addNewAddress', async(fromData) => {
    const response = await axios.post('http://localhost:5000/api/shop/address/add', fromData);
    return response.data;
})

export const fetchAllAddresses = createAsyncThunk('/address/fetchAllAddresses', async(userId) => {
    const response = await axios.get(`http://localhost:5000/api/shop/address/get/${userId}`);
    return response.data;
})

export const editAddress = createAsyncThunk('/address/editAddress', async({userId, addressId, formData}) => {
    const response = await axios.put(`http://localhost:5000/api/shop/address/update/${userId}/${addressId}`, formData);
    return response.data;
})

export const deleteAddress = createAsyncThunk('/address/deleteAddress', async({userId, addressId}) => {
    const response = await axios.post(`http://localhost:5000/api/shop/address/delete/${userId}/${addressId}`);
    return response.data;
})

const addressSlice = createSlice({
    name : 'address',
    initialState,
    reducers : {},
    extraReducers : (builder) => {
        builder.addCase(addNewAddress.pending, (state)=> {
            state.isLoading = true;
        }).addCase(addNewAddress.fulfilled, (state,action)=> {
            state.isLoading = false;
            // state.addressList = action.payload.data; // removed it because after every add i will run fetchAllAdress 
        }).addCase(addNewAddress.rejected, (state,action)=> {
            state.isLoading = true;
            // state.addressList = [] // removed it because after every add i will run fetchAllAdress
        })
        .addCase(fetchAllAddresses.pending, (state)=> {
            state.isLoading = true;
        }).addCase(fetchAllAddresses.fulfilled, (state,action)=> {
            state.isLoading = false;
            state.addressList = action.payload.data;
        }).addCase(fetchAllAddresses.rejected, (state,action)=> {
            state.isLoading = true;
            state.addressList = []
        })
    }
})

export default addressSlice.reducer;