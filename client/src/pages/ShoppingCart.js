import React, { useState, useEffect } from "react";
import checkoutService from "../service/checkout.service";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    deleteShoppingCartItemActionCreator,
    clearShoppingCartActionCreator,
} from "../redux/shoppingCart/shoppingCartActionCreator";
const ShoppingCart = () => {
    const navigate = useNavigate();
    const shoppingCart = useSelector((state) => state.shoppingCart.shoppingCart);
    const currentUser = useSelector((state) => state.user.userData);
    const dispatch = useDispatch();
    //check if user  login
    useEffect(() => {
        if (!currentUser) {
            navigate("/login");
        }
    }, []);
    //count totalPrice
    let sum = 0;
    if (shoppingCart) {
        for (let i = 0; i < shoppingCart.length; i++) {
            sum = sum + Number(shoppingCart[i].price);
        }
        console.log(sum);
    }
    //delete item
    const deleteHandler = (e) => {
        console.log(e.target.parentElement.id);
        console.log(shoppingCart);
        let arr = shoppingCart.filter((item, index) => {
            return index != e.target.parentElement.id;
        });

        console.log(arr);

        dispatch(deleteShoppingCartItemActionCreator(arr));
    };
    //checkout
    const checkoutHandler = () => {
        checkoutService
            .checkout(shoppingCart, sum)
            .then((res) => {
                window.alert(res.data);
                dispatch(clearShoppingCartActionCreator());
                // localStorage.removeItem("ShoppingCart");
                navigate("/orderRecord");
            })
            .catch((e) => {
                console.log(e);
            });
    };

    return (
        <div className="shoppingCart">
            {currentUser && (
                <div className="container">
                    {(!shoppingCart || shoppingCart.length == 0) && (
                        <div className="empty">
                            <h2>
                                購物車是空的趕快去買點東西吧 <a href="/">回首頁</a>
                            </h2>
                        </div>
                    )}
                    {shoppingCart && shoppingCart.length !== 0 && (
                        <div>
                            <table>
                                <tr>
                                    <th>商品圖片</th>
                                    <th>商品名稱</th>
                                    <th>購買數量</th>
                                    <th>價格</th>
                                </tr>
                                {shoppingCart.map((item, index) => {
                                    return (
                                        <tr>
                                            <td>
                                                <img src={item.img} alt="" />
                                            </td>
                                            <td className="name">{item.name}</td>
                                            <td>1 件</td>
                                            <td>{item.price}</td>
                                            <td id={index}>
                                                <button onClick={deleteHandler}>刪除</button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </table>
                            <br />
                            <h5 className="sum">
                                總額: <span style={{ color: "rgb(235, 57, 116)", fontSize: "1.5rem" }}>${sum}</span>
                                <h5></h5>
                            </h5>
                            <div className="checkOut">
                                <button className="checkOut" onClick={checkoutHandler}>
                                    結帳
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}
            {!currentUser && (
                <div>
                    <h3 style={{ color: "red" }}>請先登入!!!</h3>
                </div>
            )}
        </div>
    );
};

export default ShoppingCart;
