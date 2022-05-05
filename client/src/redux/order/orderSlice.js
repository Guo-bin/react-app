import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import orderRecordService from "../../service/orderRecord.service";
const initialState = {
    loading: false,
    orderRecord: null,
    orderDetail: null,
    err: null,
};

export const getOrderRecord = createAsyncThunk("order/getOrderRecord", async (userID, { rejectWithValue }) => {
    try {
        let response = await orderRecordService.getOrderRecord();

        return response.data.reverse();
    } catch (e) {
        return rejectWithValue(e.response.data);
    }
});

export const getOrderDetail = createAsyncThunk("order/getOrderDetail", async (orderID, { rejectWithValue }) => {
    try {
        let response = await orderRecordService.getOrderDetail(orderID);
        return response.data;
    } catch (e) {
        return rejectWithValue(e.response.data);
    }
});

export const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {},
    extraReducers: {
        [getOrderRecord.pending]: (state, action) => {
            state.loading = true;
            state.orderDetail = null;
        },
        [getOrderRecord.fulfilled]: (state, action) => {
            state.loading = false;
            state.orderRecord = action.payload;
            state.err = null;
        },
        [getOrderRecord.rejected]: (state, action) => {
            state.loading = false;
            state.err = action.payload;
        },
        [getOrderDetail.pending]: (state, action) => {
            state.loading = true;
        },
        [getOrderDetail.fulfilled]: (state, action) => {
            state.loading = false;
            state.orderDetail = action.payload;
            state.err = null;
        },
        [getOrderDetail.rejected]: (state, action) => {
            state.loading = false;
            state.err = action.payload;
        },
    },
});
