import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import orderRecordService from "../service/orderRecord.service";
import { getOrderDetail } from "../redux/order/orderSlice";
import { useDispatch, useSelector } from "react-redux";
import loadingIMG from "../Image/Spinner-1s-200px.svg";
const OrderDetailPage = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const location = useLocation();
    const loading = useSelector((state) => state.order.loading);
    const orderDetail = useSelector((state) => state.order.orderDetail);
    useEffect(() => {
        dispatch(getOrderDetail(params._id));
        console.log(location);
    }, []);
    return (
        <div className="orderDetailPage">
            {loading && (
                <div className="loadingIMG">
                    <img src={loadingIMG} alt="" />
                </div>
            )}
            {!loading && orderDetail && (
                <div className="orderDetailPage-containers">
                    <h3>訂單紀錄</h3>
                    <table>
                        <tr>
                            <th>商品圖片</th>
                            <th>商品名稱</th>
                            <th>商品數量</th>
                            <th>價格</th>
                        </tr>
                        {orderDetail &&
                            orderDetail.productList.map((item) => {
                                return (
                                    <tr>
                                        <td>
                                            <img src={item.img} alt="" />
                                        </td>
                                        <td className="name">{item.name}</td>
                                        <td>{item.quantity}件</td>
                                        <td>{item.price * item.quantity}</td>
                                    </tr>
                                );
                            })}
                    </table>
                    <br />
                    <h5 style={{ color: "rgb(235, 57, 116)", fontSize: "1.5rem" }}>總額:{orderDetail.totalPrice}元</h5>
                </div>
            )}
        </div>
    );
};

export default OrderDetailPage;
