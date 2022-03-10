import axios from "axios";

const API_URL = "https://app-bin.herokuapp.com/api/user";

class AuthService {
    login(email, password) {
        return axios.post(API_URL + "/login", { email, password });
    }
    register(username, email, password) {
        return axios.post(API_URL + "/register", { username, email, password });
    }
    logout() {
        localStorage.removeItem("User");
    }
    getcurrentUser() {
        return JSON.parse(localStorage.getItem("User"));
    }
}

export default new AuthService();
