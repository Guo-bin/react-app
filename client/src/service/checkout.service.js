import axios from "axios";

const API_URL = "https://app-bin.herokuapp.com/api/checkout/";

class checkoutService {
    checkout(products, totalPrice) {
        let token;
        if (localStorage.getItem("User")) {
            token = JSON.parse(localStorage.getItem("User")).token;
        } else {
            token = "";
        }
        return axios.post(
            API_URL,
            { products, totalPrice },
            {
                headers: {
                    Authorization: token,
                },
            }
        );
    }
}

export default new checkoutService();
