import React, { useState, useEffect } from "react";
import SideMenu from "../components/SideMenu";
import { fetchDataActionCreator } from "../redux/product/productReducerActionCreator";
import { useDispatch, useSelector } from "react-redux";
import Product from "../components/Product";
import loadingIMG from "../Image/Spinner-1s-200px.svg";

const Homepage = ({ keyWord, setKeyWord }) => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.product.data);
    const loading = useSelector((state) => state.product.loading);

    useEffect(() => {
        if (keyWord == "") {
            dispatch(fetchDataActionCreator());
        }
    }, []);

    return (
        <div className="homepage">
            <div className="left-side">
                <SideMenu setKeyWord={setKeyWord} />
            </div>

            <div className="right-side">
                {loading ? (
                    <div className="loadingIMG">
                        <img src={loadingIMG} />
                    </div>
                ) : (
                    <div className="container">
                        {products &&
                            products.map((data) => {
                                return <Product data={data} key={data._id} />;
                            })}
                        <div className="placeholder"> </div>
                        <div className="placeholder"> </div>
                        <div className="placeholder"> </div>
                        <div className="placeholder"> </div>
                        <div className="placeholder"> </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Homepage;
