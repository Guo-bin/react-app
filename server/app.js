const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const authRoute = require("./routes").auth;
const checkOutRoute = require("./routes").checkOut;
const productsRoute = require("./routes").products;
const orderRecordRoute = require("./routes").orderRecord;
const cors = require("cors");
const passport = require("passport");
const { authenticate } = require("passport");
require("./config/passport")(passport);

mongoose
    .connect(process.env.DB_CONNECT, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Connect to MongoDB Atlas");
    })
    .catch((e) => {
        console.log(e);
    });

//middleware
//用來解析post的資料，會在req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/api/user", authRoute);
app.use("/api/checkOut", passport.authenticate("jwt", { session: false }), checkOutRoute);
app.use("/api/orderRecord", passport.authenticate("jwt", { session: false }), orderRecordRoute);
app.use("/api/products", productsRoute);
const port = process.env.PORT || 3000;
app.get("/", (req, res) => {
    res.send("HI");
});

app.listen(port, () => {
    console.log("Server is running on port 8080");
});
