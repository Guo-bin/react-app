import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import authService from "./service/auth.service";
import Homepage from "./pages/Homepage";
import ProductDetail from "./pages/ProductDetail";
import Loginpage from "./pages/Loginpage";
import ShoppingCart from "./pages/ShoppingCart";
import OrderRecordPage from "./pages/OrderRecordPage";
import OrderDetailPage from "./pages/OrderDetailPage";
import Register from "./pages/Register";
import { useDispatch } from "react-redux";
import { userSlice } from "./redux/user/userSlice";
import "./style/style.css";
const App = () => {
    const [currentUser, setCurrentUser] = useState();
    const [redirectUrl, setRedirectUrl] = useState(null);
    const [keyWord, setKeyWord] = useState("");
    const dispatch = useDispatch();

    //to check if localStorage exist user data,if exist then dispatch it to update the user state in the store
    useEffect(() => {
        if (localStorage.getItem("User")) {
            const userData = JSON.parse(localStorage.getItem("User"));
            dispatch(userSlice.actions.getUserFromLocalStorage(userData));
        }
    }, []);
    return (
        <div>
            <Nav keyWord={keyWord} setKeyWord={setKeyWord} redirectUrl={redirectUrl} setRedirectUrl={setRedirectUrl} />
            <Routes>
                <Route path="/" element={<Homepage keyWord={keyWord} setKeyWord={setKeyWord} />} />
                <Route path="/product/:productID" element={<ProductDetail />} />
                <Route
                    path="/login"
                    element={<Loginpage redirectUrl={redirectUrl} setRedirectUrl={setRedirectUrl} />}
                />
                <Route path="/shoppingCart" element={<ShoppingCart />} />
                <Route path="/orderRecord" element={<OrderRecordPage />} />
                <Route path="/orderDetail/:_id" element={<OrderDetailPage />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </div>
    );
};

export default App;
