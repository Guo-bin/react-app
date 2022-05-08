export const ADD_TO_SHOPPINGCART = "add_shoppingCart";

export const DELETE_SHIPPINGCART_ITEM = "delete_shoppingCart_item";

export const CLEAR_SHOPPINGCART = "clear_shoppingCart";

export const addToShoppingCartActionCreator = (shoppingCartList) => {
    return {
        type: ADD_TO_SHOPPINGCART,
        payload: shoppingCartList,
    };
};

export const deleteShoppingCartItemActionCreator = (newArr) => {
    return {
        type: DELETE_SHIPPINGCART_ITEM,
        payload: newArr,
    };
};

export const clearShoppingCartActionCreator = () => {
    return {
        type: CLEAR_SHOPPINGCART,
        payload: [],
    };
};
