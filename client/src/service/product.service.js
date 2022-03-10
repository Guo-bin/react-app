import axios from "axios";

const Product_API = "https://app-bin.herokuapp.com/api/products";

class ProductService {
    getProduct() {
        return axios.get(Product_API);
    }
    getProductDetail(productID) {
        return axios.get(Product_API + `/${productID}`);
    }
    searchProduct(keyword) {
        return axios.get(Product_API + `/search/${keyword}`);
    }
}

export default new ProductService();
