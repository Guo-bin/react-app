import React, { useState, useEffect } from "react";
import AuthService from "../service/auth.service";
import { useNavigate } from "react-router-dom";
import { fetchUserData } from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";

const Loginpage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const dispatch = useDispatch();
    const message = useSelector((state) => state.user.err);
    const currentUser = useSelector((state) => state.user.userData);

    const emailChangeHandler = (e) => {
        setEmail(e.target.value);
    };
    const passwordChangeHandler = (e) => {
        setPassword(e.target.value);
    };
    const loginHandler = () => {
        dispatch(fetchUserData({ email, password }));
    };
    const signinHandler = () => {
        navigate("/register");
    };
    //to prevent someone who has already signed in ,but still get into this page from url
    //if login, it will redirect to homepage
    useEffect(() => {
        if (currentUser) {
            navigate("/");
        }
    }, [currentUser]);
    return (
        <div className="loginpage">
            <div className="container">
                <h1 style={{ textAlign: "center" }}>會員登入</h1>
                <div class="mb-3">
                    <input
                        onChange={emailChangeHandler}
                        placeholder="請輸入電子信箱"
                        type="email"
                        class="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                    />
                    <div id="emailHelp" class="form-text"></div>
                </div>
                <div class="mb-3">
                    <input
                        onChange={passwordChangeHandler}
                        placeholder="請輸入密碼"
                        type="password"
                        class="form-control"
                        id="exampleInputPassword1"
                    />
                </div>
                {message && (
                    <div className="alert alert-danger" role="alert">
                        {message}
                    </div>
                )}
                <div className="button">
                    <button onClick={loginHandler} type="submit" class="btn btn-primary">
                        登入
                    </button>
                    <button type="submit" class="btn btn-success" onClick={signinHandler}>
                        註冊
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Loginpage;
