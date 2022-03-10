import axios from "axios";

const API_URL = "https://app-bin.herokuapp.com/api/orderRecord/";

class orderRecord {
    getOrderRecord() {
        let token;
        if (localStorage.getItem("User")) {
            token = JSON.parse(localStorage.getItem("User")).token;
        } else {
            token = "";
        }
        return axios.get(
            API_URL,

            {
                headers: {
                    Authorization: token,
                },
            }
        );
    }
    getOrderDetail(_id) {
        let token;
        if (localStorage.getItem("User")) {
            token = JSON.parse(localStorage.getItem("User")).token;
        } else {
            token = "";
        }
        console.log(token);
        return axios.get(
            API_URL + `orderDetail/${_id}`,

            {
                headers: {
                    Authorization: token,
                },
            }
        );
    }
}

export default new orderRecord();
