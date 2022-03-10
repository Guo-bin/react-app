import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToShoppingCartActionCreator } from "../redux/shoppingCart/shoppingCartActionCreator";
import { fetchData } from "../redux/productDetail/productDetailSlice";
import loadingIMG from "../Image/Spinner-1s-200px.svg";
const ProductDetail = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.productDetail.loading);
    const productDetail = useSelector((state) => state.productDetail.data);
    //add item to shoppingCart
    const shoppingCartHandler = () => {
        dispatch(addToShoppingCartActionCreator(productDetail));
    };
    //  get product detail when user click product in the homepage
    useEffect(() => {
        dispatch(fetchData(params.productID));
    }, []);
    return (
        <div className="productDetail">
            {loading && !productDetail && (
                <div className="loadingIMG">
                    <img src={loadingIMG} alt="" />
                </div>
            )}
            {productDetail && (
                <div className="productDetail-container">
                    <div className="image">
                        <img src={productDetail.img} alt="" />
                    </div>
                    <div className="detail">
                        <h2>
                            <strong>{productDetail.name}</strong>
                        </h2>

                        <ul>
                            <li>★ 特性:{productDetail.characteristic}</li>

                            <li>★ 描述:{productDetail.description}</li>

                            <li>★ 記憶體:{productDetail.memory}</li>

                            <li>★ CPU:{productDetail.CPU}</li>

                            <li>★ 顯示卡:{productDetail.graphicsCard}</li>

                            <li>★ 螢幕大小:{productDetail.size}</li>

                            <li>★ 重量:{productDetail.weight}</li>

                            <li>★ 作業系統:{productDetail.operation}</li>
                        </ul>
                        <h2 style={{ color: "rgb(235, 57, 116)" }}>
                            <strong>${productDetail.price}</strong>
                        </h2>
                        <div className="button">
                            <a href="#" onClick={shoppingCartHandler}>
                                加入購物車
                            </a>
                        </div>
                    </div>
                </div>
            )}
            <br />
            <br />
        </div>
    );
};

export default ProductDetail;
