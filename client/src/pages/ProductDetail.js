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
    const shoppingCart = useSelector((state) => state.shoppingCart.shoppingCart);

    //add item to shoppingCart
    console.log(shoppingCart);
    const shoppingCartHandler = () => {
        window.alert("已加入購物車");
        const quantity = document.querySelector(".quantity");
        console.log(quantity.value);
        let productinfo = { ...productDetail, quantity: quantity.value };

        if (shoppingCart.length !== 0) {
            console.log(productinfo);
            shoppingCart.forEach((product) => {
                if (product._id == productinfo._id) {
                    product.quantity = Number(product.quantity) + Number(productinfo.quantity);
                    console.log(product.quantity);
                }
            });
            localStorage.setItem("shoppingCart", JSON.stringify([...shoppingCart]));
        } else {
            console.log(productinfo);
            localStorage.setItem("shoppingCart", JSON.stringify([productinfo]));
            console.log(JSON.parse(localStorage.getItem("shoppingCart")));
        }

        // console.log(productDetail);
        dispatch(addToShoppingCartActionCreator(productinfo));
    };
    const stepDown = (e) => {
        const input = document.querySelector(".quantity");
        let quantity = e.target.parentElement.children[1].value;
        if (quantity > 1) {
            quantity--;
        }
        input.value = quantity;
    };
    const stepUp = (e) => {
        const input = document.querySelector(".quantity");
        let quantity = e.target.parentElement.children[1].value;
        if (quantity < 100) {
            quantity++;
        }
        input.value = quantity;
    };
    const inputValidation = (e) => {
        console.log(e.keyCode);
        if (e.keyCode == 109) {
            e.preventDefault();
        }
    };
    const onInputHandler = (e) => {
        if (e.target.value >= 100) {
            e.target.value = 99;
        }
        if (e.target.value == 0) {
            e.target.value = 1;
        }
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
                        <h4>
                            <strong>{productDetail.name}</strong>
                        </h4>

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
                            <div className="number-input">
                                <button onClick={stepDown}></button>
                                <input
                                    class="quantity"
                                    type="number"
                                    defaultValue="1"
                                    max="100"
                                    min="1"
                                    minLength={1}
                                    maxLength={2}
                                    onKeyDown={inputValidation}
                                    onInput={onInputHandler}
                                />
                                <button onClick={stepUp} class="plus"></button>
                            </div>

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
