const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require("../models").userModel;

module.exports = (passport) => {
    //先創造一個空物件
    let opts = {};
    //從Request中提取jwt
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
    //read secret from dotenv
    opts.secretOrKey = process.env.PASSPORT_SECRET;
    //use passport.use to authenticate the user
    passport.use(
        new JwtStrategy(opts, function (jwt_payload, done) {
            User.findOne({ _id: jwt_payload._id }, function (err, user) {
                if (err) {
                    return done(err, false);
                }
                if (user) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            });
        })
    );
};
