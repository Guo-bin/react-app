const router = require("express").Router();
const Order = require("../models").orderModel;

router.use((req, res, next) => {
    console.log("A request is comming to the checkOut route");
    next();
});

router.get("/", (req, res) => {
    console.log(req.user);
    res.json(req.user);
});

router.post("/", async (req, res) => {
    const { products, totalPrice } = req.body;
    console.log(totalPrice);
    const newDate = new Date();
    console.log(newDate.toLocaleString());
    newDate2 = newDate.toLocaleString();
    let newOrder = new Order({ user: req.user._id, productList: products, totalPrice, date: newDate2 });

    try {
        await newOrder.save();
        res.status(200).send("已送出訂單");
    } catch (e) {
        res.status(400).send("Error");
    }
});

module.exports = router;
