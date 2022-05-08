import { ADD_TO_SHOPPINGCART, DELETE_SHIPPINGCART_ITEM, CLEAR_SHOPPINGCART } from "./shoppingCartActionCreator";

const defaultState = {
    shoppingCart: localStorage.getItem("shoppingCart") ? JSON.parse([localStorage.getItem("shoppingCart")]) : [],
};

export default (state = defaultState, action) => {
    if (action.type == ADD_TO_SHOPPINGCART) {
        let newState = { shoppingCart: action.payload };
        return newState;
    }
    if (action.type == DELETE_SHIPPINGCART_ITEM) {
        let newState = { shoppingCart: action.payload };
        return newState;
    }
    if (action.type == CLEAR_SHOPPINGCART) {
        let newState = { shoppingCart: action.payload };
        return newState;
    }
    return state;
};
