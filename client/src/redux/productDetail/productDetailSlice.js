import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ProductService from "../../service/product.service";

const initialState = {
    loading: false,
    data: null,
    err: null,
};
//createAsyncThunk會產生promise lifecycle types最後回傳一個thunk action creaotr
//第一個參數是用來當作promise lifecycle type的名稱，第二個參數是payload creator
//dispatch createAsyncThunk產生出來的 thunk action creator時，這個action creator會先dispatch pending action type，
//接著開始執行promise callback(也就是payload  creator)這個promise callback會回傳一個promise,
//接著RTK會再根據resolve的結果去dispatch fullfill action或者根據reject去dispatch reject action
export const fetchData = createAsyncThunk("productDetail/fetData", async (productID, { rejectWithValue }) => {
    try {
        const productDetail = await ProductService.getProductDetail(productID);
        return productDetail.data;
    } catch (e) {
        return rejectWithValue(e);
    }
});

export const productDetailSlice = createSlice({
    name: "productDetail",
    initialState,
    reducers: {},
    extraReducers: {
        [fetchData.pending]: (state, action) => {
            state.loading = true;
            state.data = null;
        },
        [fetchData.fulfilled]: (state, action) => {
            state.loading = false;
            state.data = action.payload;
            state.err = null;
        },
        [fetchData.rejected]: (state, action) => {
            state.loading = false;
            state.err = action.payload;
        },
    },
});
