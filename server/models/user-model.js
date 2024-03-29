const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minLength: 2,
    },
    email: {
        type: String,
        required: true,
        minLength: 6,
        maxLength: 100,
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
        maxLength: 1024,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

userSchema.pre("save", async function (next) {
    if (this.isModified("password") || this.isNew) {
        const hash = await bcrypt.hash(this.password, 10);
        this.password = hash;
        next();
    } else {
        return next();
    }
});

userSchema.methods.comparePassword = function (password, cb) {
    bcrypt.compare(password, this.password, (err, isMatch) => {
        if (err) {
            return cb(err, isMatch);
        }
        return cb(null, isMatch);
    });
};

module.exports = mongoose.model("User", userSchema);
