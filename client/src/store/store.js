//It will create on global reducer
//Tt is created to hold all the application state
//as we will use redux than everything will be in slices

import  { configureStore } from "@reduxjs/toolkit";
import authReducer from './auth-slice'
import adminProductsSlice from './admin/products-slice';
import shopProductsSlice from './shop/products-slice'
import shopCartSlice from './shop/cart-slice'

const store = configureStore({
    reducer: {
        auth: authReducer,
        adminProducts : adminProductsSlice,
        shopProducts : shopProductsSlice,
        shopCart : shopCartSlice
    }
});

export default store;
