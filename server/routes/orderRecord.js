const router = require("express").Router();
const Order = require("../models").orderModel;

router.use((req, res, next) => {
    console.log("a request is comming to the orderRecord route");
    next();
});

router.get("/", async (req, res) => {
    try {
        const OrderRecord = await Order.find({ user: req.user._id });

        res.send(OrderRecord);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.get("/orderDetail/:_id", async (req, res) => {
    const { _id } = req.params;
    console.log(_id);
    try {
        const orderDetail = await Order.findOne({ _id });
        res.send(orderDetail);
    } catch (e) {
        res.status(400).send(e);
    }
});

module.exports = router;
