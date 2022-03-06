const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    characteristic: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    id: {
        type: Number,
    },
    img: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    memory: {
        type: String,
    },
    CPU: {
        type: String,
    },
    size: {
        type: String,
    },
    graphicsCard: {
        type: String,
    },
    weight: {
        type: String,
    },
    operation: {
        type: String,
    },
});

module.exports = new mongoose.model("Item", itemSchema);
