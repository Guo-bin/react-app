import { createStore, applyMiddleware } from "redux";
import shoppingCartReducer from "./shoppingCart/shoppingCartReducer";
import productReducer from "./product/productReducer";
import { productDetailSlice } from "./productDetail/productDetailSlice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { actionLog } from "./middleware/actionLog";
import { userSlice } from "./user/userSlice";
import { orderSlice } from "./order/orderSlice";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
    shoppingCart: shoppingCartReducer,
    product: productReducer,
    productDetail: productDetailSlice.reducer,
    user: userSlice.reducer,
    order: orderSlice.reducer,
});

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), actionLog],
    devTools: true,
});

export default store;
