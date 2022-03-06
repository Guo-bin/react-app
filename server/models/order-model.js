const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    productList: {
        type: [Object],
    },
    totalPrice: {
        type: Number,
    },
    date: {
        type: String,
    },
});

module.exports = new mongoose.model("Order", orderSchema);
