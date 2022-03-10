import React from "react";
import productService from "../service/product.service";
import { searchProductActionCreator } from "../redux/product/productReducerActionCreator";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
const SideMenu = ({ setKeyWord }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const menuSwitchHandler = (e) => {
        let sideMenu = document.querySelector("div.sideMenu");
        sideMenu.style.transform = "translateX(-100%)";
    };
    const clickHandler = (e) => {
        setKeyWord(e.target.innerText);
        dispatch(searchProductActionCreator(e.target.innerText));
        let sideMenu = document.querySelector(".sideMenu");
        sideMenu.style.transform = "translateX(-100%)";
        navigate("/");
        //這整個project中共使用了兩個SideMenu component
        //第一個是在螢幕縮小後左上方按下hamburger按鈕後跑出來的SideMenu，另一個是在大螢幕觀看時，直接顯示在螢幕左側的SideMenu。
        //而這邊有個重點，querySelector會將第一個符合條件的Element回傳，所以這邊設定的sideMenu，指的是設定在螢幕縮小時
        //點下左上方hamburger圖示後從左側跑出來的SideMenu component，所以這邊的效果不會作用於大螢幕時homepage左側的SideMenu
    };

    return (
        <div className="sideMenu ">
            <button className="close">
                <i class="fa-solid fa-arrow-left" onClick={menuSwitchHandler}></i>
            </button>
            <h3>品牌</h3>
            <div>
                <a onClick={clickHandler}>Asus 華碩</a>
                <a onClick={clickHandler}>Acer 宏碁</a>
                <a onClick={clickHandler}>Lenovo 聯想</a>
                <a onClick={clickHandler}>GIGABYTE 技嘉</a>
            </div>
            <h3>處理器</h3>
            <div>
                <a onClick={clickHandler}>intel CORE i5</a>
                <a onClick={clickHandler}>intel CORE i7</a>
                <a onClick={clickHandler}>intel CORE i9</a>
                <a onClick={clickHandler}>AMD Ryzen 5</a>
                <a onClick={clickHandler}>AMD Ryzen 7</a>
                <a onClick={clickHandler}>AMD Ryzen 9</a>
            </div>
            <h3>顯示卡</h3>
            <div>
                <a onClick={clickHandler}>Nvidia GeForce GTX</a>
                <a onClick={clickHandler}>Nvidia GeForce RTX</a>
            </div>
        </div>
    );
};

export default SideMenu;
