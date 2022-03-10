import React, { useState, useEffect } from "react";
import orderRecordService from "../service/orderRecord.service";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getOrderRecord } from "../redux/order/orderSlice";
import loadingIMG from "../Image/Spinner-1s-200px.svg";
const OrderRecordPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.user.userData);
    const orderRecord = useSelector((state) => state.order.orderRecord);
    const loading = useSelector((state) => state.order.loading);
    useEffect(() => {
        if (!currentUser) {
            return navigate("/login");
        }
        dispatch(getOrderRecord());
    }, []);
    const checkOrderDetailHandler = (e) => {
        console.log(e.target.id);
        navigate(`/orderDetail/${e.target.id}`);
    };
    return (
        <div className="orderRecordPage">
            {loading && (
                <div className="loadingIMG">
                    <img src={loadingIMG} alt="" />
                </div>
            )}
            {!loading && (
                <div className="container">
                    <table>
                        <tr>
                            <th>訂單編號</th>
                            <th>訂單日期</th>
                            <th>訂單金額</th>
                            <th>查詢</th>
                        </tr>

                        {orderRecord &&
                            orderRecord.map((data) => {
                                return (
                                    <tr key={data._id}>
                                        <td>{data._id}</td>
                                        <td>{data.date}</td>
                                        <td>{data.totalPrice}</td>
                                        <td>
                                            <button onClick={checkOrderDetailHandler} id={data._id}>
                                                查詢
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                    </table>
                    {!orderRecord && <div>訂單讀取中請稍後...</div>}
                    {orderRecord && orderRecord.length == 0 && <h1>無訂單紀錄</h1>}
                </div>
            )}
        </div>
    );
};

export default OrderRecordPage;
