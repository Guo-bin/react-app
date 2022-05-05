import React, { useState, useEffect } from "react";
import authService from "../service/auth.service";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import SideMenu from "./SideMenu";
import { clearShoppingCartActionCreator } from "../redux/shoppingCart/shoppingCartActionCreator";
import { fetchDataActionCreator, searchProductActionCreator } from "../redux/product/productReducerActionCreator";
import { userSlice } from "../redux/user/userSlice";
const Nav = ({ keyWord, setKeyWord, redirectUrl, setRedirectUrl }) => {
    const [showSearch, setShowSearch] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const shoppingCart = useSelector((state) => state.shoppingCart.shoppingCart);
    const currentUser = useSelector((state) => state.user.userData);
    // const products = useSelector((state) => state.product.data);
    const menuSwitchHandler = (e) => {
        let sideMenu = e.target.parentElement.children[1];
        sideMenu.style.transform = "translateX(0%)";
    };
    const searchChangeHandler = (e) => {
        setKeyWord(e.target.value);
    };
    const searchHandler = () => {
        if (keyWord == "") {
            dispatch(fetchDataActionCreator());
        } else {
            dispatch(searchProductActionCreator(keyWord));
        }
    };
    const showSearchClickHandler = () => {
        setShowSearch(!showSearch);
    };
    const keyHandler = (e) => {
        console.log(e.key);
        if (e.key === "Enter") {
            searchHandler();
        }
    };
    //login
    const loginHandler = () => {
        setRedirectUrl(null);
    };
    //logout
    const logoutHandler = () => {
        setKeyWord("");
        dispatch(clearShoppingCartActionCreator());
        dispatch(userSlice.actions.userLogout());
        localStorage.removeItem("User");
        localStorage.removeItem("shoppingCart");
        navigate("/");
    };
    //if login then direct to shoppingCartPage otherwise go to loginPage
    const shoppingCartHandler = (e) => {
        if (!currentUser) {
            setRedirectUrl("/shoppingCart");
            navigate("/login");
        } else {
            navigate("/shoppingCart");
        }
    };
    const logoClickHandler = () => {
        dispatch(fetchDataActionCreator());

        navigate("/");
    };

    return (
        <div className="nav">
            {/* large size screen */}
            <div className="nav-container-large">
                <div className="logo">
                    <Link onClick={logoClickHandler} to="/">
                        <i class="fas fa-tv"> BinShop </i>
                    </Link>
                </div>
                <div className="search" onKeyPress={keyHandler}>
                    <input onChange={searchChangeHandler} type="text" placeholder="請輸入商品" />
                    <Link to="/">
                        <button onClick={searchHandler}>
                            <i class="fas fa-search"></i>
                        </button>
                    </Link>
                </div>
                <div className="nav-list">
                    <Link onClick={shoppingCartHandler} to="/shoppingCart">
                        購物車{shoppingCart && <>({shoppingCart.length})件</>}
                    </Link>

                    {!currentUser && (
                        <Link to="/login" onClick={loginHandler}>
                            註冊/登入
                        </Link>
                    )}

                    {currentUser && <Link to="/orderRecord">訂單紀錄</Link>}
                    {currentUser && (
                        <Link to="" onClick={logoutHandler}>
                            登出
                        </Link>
                    )}
                </div>
            </div>
            {/* small-size screen */}
            <div className="nav-container-small">
                {showSearch && (
                    <div className="showSearch" onKeyPress={keyHandler}>
                        <button className="arrow-left" onClick={showSearchClickHandler}>
                            <i class="fa-solid fa-arrow-left"></i>
                        </button>
                        <div className="search-bar">
                            <input onChange={searchChangeHandler} type="text" placeholder="請輸入商品" />
                            <Link to="/">
                                <button className="search" onClick={searchHandler}>
                                    <i class="fas fa-search"></i>
                                </button>
                            </Link>
                        </div>
                    </div>
                )}
                {!showSearch && (
                    <div className="closeSearch">
                        <div className="hamburger icon">
                            <i class="fa-solid fa-align-justify" for="side-menu-switch" onClick={menuSwitchHandler}></i>

                            <SideMenu keyWord={keyWord} setKeyWord={setKeyWord} />
                        </div>
                        <div className="logo icon">
                            <Link onClick={logoClickHandler} to="/">
                                <h2>BinShop</h2>
                            </Link>
                        </div>

                        <div className="nav-list icon">
                            <a className="searchIcon" onClick={showSearchClickHandler}>
                                <i class="fas fa-search"></i>
                            </a>

                            <a onClick={shoppingCartHandler} className="shoppingCart">
                                <i class="fa-solid fa-cart-shopping"></i>
                                {shoppingCart && shoppingCart.length != 0 && <div>{shoppingCart.length}</div>}
                            </a>

                            {!currentUser && (
                                <Link to="/login" onClick={loginHandler}>
                                    <i class="fa-solid fa-user"></i>
                                </Link>
                            )}

                            {currentUser && (
                                <Link to="/orderRecord">
                                    <i class="fa-solid fa-file-lines"></i>
                                </Link>
                            )}
                            {currentUser && (
                                <Link to onClick={logoutHandler}>
                                    <i class="fa-solid fa-arrow-right-from-bracket"></i>
                                </Link>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Nav;
