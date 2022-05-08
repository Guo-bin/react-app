import productService from "../../service/product.service";

export const FETCH_PRODUCT_START = "fetch_product_start";
export const FETCH_PRODUCT_SUCCESS = "fetch_product_success";
export const FETCH_PRODUCT_FAIL = "fetch_product_success";

export const fetchProductStartActionCreator = () => {
    return {
        type: FETCH_PRODUCT_START,
        payload: true,
    };
};

export const fetchProductSuccessActionCreator = (data) => {
    return {
        type: FETCH_PRODUCT_SUCCESS,
        payload: {
            data,
            loading: false,
        },
    };
};

export const fetchProductFailActionCreator = (err) => {
    return {
        type: FETCH_PRODUCT_FAIL,
        payload: err,
    };
};
//thunk action
export const fetchDataActionCreator = () => async (dispatch, getState) => {
    dispatch(fetchProductStartActionCreator());
    try {
        const products = await productService.getProduct();

        dispatch(fetchProductSuccessActionCreator(products.data));
    } catch (e) {
        dispatch(fetchProductFailActionCreator(e));
    }
};
// thunk的功能在於能讓我們dispatch函式類型的action，這個action必須傳入dispatch以及getState，
// 之後dispatch這個函式action後，會被thunk middleware截獲處理，處理時會遵守
// 1."如果action類型為函式"，則
// 呼叫action函式，呼叫後就會進入該action的執行環境處理裡面的程式碼，而我們的side effect如非同步處理(fetch-data)，
// 也是在這邊處理，等處理好後再呼叫傳入action的dispatch函式來將fetch得到的data dispatch出去。
// 2."如果action類型不是函式"，則會藉由next()函式將這個action繼續傳遞下去給reducer處理。
export const searchProductActionCreator = (keyword) => async (dispatch, getState) => {
    dispatch(fetchProductStartActionCreator());
    try {
        const product = await productService.searchProduct(keyword);
        console.log("product:", product);
        dispatch(fetchProductSuccessActionCreator(product.data));
    } catch (e) {
        dispatch(fetchProductFailActionCreator(e));
        console.log(e);
    }
};
