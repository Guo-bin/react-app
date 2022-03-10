import { FETCH_PRODUCT_START, FETCH_PRODUCT_SUCCESS, FETCH_PRODUCT_FAIL } from "./productReducerActionCreator";

const initialState = {
    loading: false,
    data: null,
    err: null,
};

export default (state = initialState, action) => {
    if (action.type == FETCH_PRODUCT_START) {
        let newState = {
            ...state,
            loading: true,
        };
        return newState;
    }

    if (action.type == FETCH_PRODUCT_SUCCESS) {
        let newState = {
            ...state,
            loading: false,
            data: action.payload.data,
            err: null,
        };
        return newState;
    }

    if (action.type == FETCH_PRODUCT_FAIL) {
        let newState = {
            ...state,
            loading: false,
            err: action.payload,
        };
        return newState;
    }

    return state;
};
