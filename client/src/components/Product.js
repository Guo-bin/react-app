import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchData } from "../redux/productDetail/productDetailSlice";
import { useDispatch } from "react-redux";
const Product = ({ data }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const productClickHandler = (e) => {
        // dispatch(fetchData(data._id));
        navigate(`/product/${data._id}`);
    };

    return (
        <div onClick={productClickHandler} className="product">
            <Link to className="container">
                <img src={data.img} alt="" />
                <p>{data.name}</p>
                <h4>$ {data.price}</h4>
            </Link>
        </div>
    );
};

export default Product;
