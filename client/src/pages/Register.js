import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../service/auth.service";
import { useSelector } from "react-redux";
const Register = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [username, setUsername] = useState();
    const [message, setMessage] = useState();
    const currentUser = useSelector((state) => state.user.userData);
    useEffect(() => {
        if (currentUser) {
            navigate("/");
        }
    }, []);
    const usernameChangeHandler = (e) => {
        setUsername(e.target.value);
    };
    const emailChangeHandler = (e) => {
        setEmail(e.target.value);
    };

    const passwordChangeHandler = (e) => {
        setPassword(e.target.value);
    };
    const registerHandler = () => {
        console.log("HIII");
        authService
            .register(username, email, password)
            .then((res) => {
                console.log(res.data);
                window.alert("註冊成功");
                navigate("/login");
            })
            .catch((e) => {
                setMessage(e.response.data);
                console.log(e);
            });
    };

    return (
        <div className="register">
            <div className="container">
                <h1 style={{ textAlign: "center" }}>會員註冊</h1>
                <div class="mb-3">
                    <input
                        onChange={usernameChangeHandler}
                        placeholder="請輸入姓名"
                        type="username"
                        class="form-control"
                        id="exampleInputEmail1"
                    />
                    <div id="username" class="form-text"></div>
                </div>
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
                    <button type="submit" class="btn btn-success" onClick={registerHandler}>
                        註冊
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Register;
