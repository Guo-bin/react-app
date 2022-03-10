import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AuthService from "../../service/auth.service";
const initialState = {
    loading: false,
    userData: null,
    err: null,
};

export const fetchUserData = createAsyncThunk(
    "user/fetchUserData",
    async ({ email, password }, { rejectWithValue }) => {
        try {
            let response = await AuthService.login(email, password);
            localStorage.setItem("User", JSON.stringify(response.data));
            return response.data;
        } catch (e) {
            return rejectWithValue(e.response.data);
        }
    }
);

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        getUserFromLocalStorage: (state, action) => {
            state.userData = action.payload;
        },
        userLogout: (state, action) => {
            state.userData = null;
        },
    },
    extraReducers: {
        [fetchUserData.pending]: (state, action) => {
            state.loading = true;
        },
        [fetchUserData.fulfilled]: (state, action) => {
            state.loading = false;
            state.userData = action.payload;
            state.err = null;
        },
        [fetchUserData.rejected]: (state, action) => {
            state.loading = false;
            state.err = action.payload;
        },
    },
});
