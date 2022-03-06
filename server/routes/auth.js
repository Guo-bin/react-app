const router = require("express").Router();
const registerValidation = require("../validation").registerValidation;
const loginValidation = require("../validation").loginValidation;
const User = require("../models").userModel;
const jwt = require("jsonwebtoken");
router.use((req, res, next) => {
    console.log("A request is comming to auth.js");
    next();
});

//做一個測試的API
router.get("/testAPI", (req, res) => {
    //創造一個 message obj
    const msgObj = {
        message: "Test api is working",
    };
    //將msgObj做成json的形式回傳。
    return res.json(msgObj);
});

router.post("/register", async (req, res) => {
    const { error } = registerValidation(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const { username, password, email } = req.body;
    const existEmail = await User.findOne({ email });
    if (existEmail) {
        return res.status(400).send("Email has been registered");
    }

    const newUser = new User({ username, password, email });

    try {
        const saveUser = await newUser.save();
        res.status(200).send({
            msg: "success",
            saveObject: saveUser,
        });
    } catch (e) {
        res.status(400).send("User not saved");
    }
});

router.post("/login", (req, res) => {
    console.log("Hi");
    const { error } = loginValidation(req.body);
    if (error) {
        console.log(error);
        return res.status(400).send(error.details[0].message);
    }

    const { password, email } = req.body;

    User.findOne({ email }, function (err, user) {
        if (err) {
            return res.status(400).send(err);
        }
        if (!user) {
            return res.status(401).send("電子信箱錯誤");
        } else {
            user.comparePassword(password, function (err, isMatch) {
                if (err) {
                    return res.status(400).send(err);
                }
                //如果密碼正確就做一個jwt回傳
                if (isMatch) {
                    const tokenObject = { _id: user._id, email: user.email };
                    const token = jwt.sign(tokenObject, process.env.PASSPORT_SECRET);
                    res.send({
                        success: true,
                        token: "JWT " + token,
                        user,
                    });
                } else {
                    res.status(401).send("密碼錯誤");
                }
            });
        }
    });
});

module.exports = router;
