const router = require("express").Router();
const Picture = require("../models/picture-model");
const multer = require("multer");
const axios = require("axios");
const Items = require("../models/items-model");

const upload = multer({
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            cb(new Error("please upload an image"));
        }
        cb(null, true);
    },
});

router.post("/products", upload.single("picture"), async (req, res) => {
    const { name, characteristic, price, description, memory, size, graphicsCard, weight, operation, CPU } = req.body;
    const encode_image = req.file.buffer.toString("base64");
    try {
        const url = "https://api.imgur.com/3/image";
        await axios
            .post(
                url,
                { image: encode_image },
                {
                    headers: {
                        Authorization: "Client-ID 29f07c37f7f3500",
                    },
                }
            )
            .then(async (response) => {
                console.log(response.data.data.link);
                let newItems = new Items({
                    name,
                    characteristic,
                    img: response.data.data.link,
                    price,
                    description,
                    memory,
                    size,
                    graphicsCard,
                    weight,
                    operation,
                    CPU,
                });
                await newItems.save();
                res.send("data has been saved");
            });
    } catch (e) {
        console.log(e);
    }
});

router.get("/", async (req, res) => {
    try {
        const data = await Items.find({});

        // res.set("Content-Type", "image/png");
        res.send(data);
    } catch (err) {
        console.log(err);
    }
});

router.get("/:productID", async (req, res) => {
    const { productID } = req.params;
    try {
        const data = await Items.findOne({ _id: productID });
        res.send(data);
    } catch (err) {
        console.log(err);
    }
});

//search product
router.get("/search/:content", async (req, res) => {
    const { content } = req.params;
    try {
        //remove front and end space of the sentance.
        let trimContent = content.trim();
        console.log(trimContent);
        //remove surplus space between word and word in the sentance.
        for (let i = 0; i < trimContent.length; i++) {
            if (trimContent[i] == " ") {
                if (trimContent[i + 1] == " ") {
                    let buffer1 = trimContent.substring(0, i);
                    let buffer2 = trimContent.substring(i + 1, trimContent.length);
                    trimContent = buffer1 + buffer2;
                    // console.log(i);
                    i--;
                }
            }
        }
        //為了實現模糊搜尋，將字串轉成正則表達式,後面的"i"表示不分英文大小寫
        const query = new RegExp(trimContent, "i");
        // $or 表示搜尋多種可能，為一個陣列
        const data = await Items.find({
            $or: [{ name: query }, { CPU: query }, { memory: query }, { graphicsCard: query }, { operation: query }],
        });
        res.send(data);
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;
