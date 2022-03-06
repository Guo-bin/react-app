const mongoose = require("mongoose");

const pictureSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    picture: {
        type: String,
    },
});

module.exports = new mongoose.model("Picture", pictureSchema);
