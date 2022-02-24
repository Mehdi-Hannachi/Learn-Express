const passport = require("passport");
const User = require("../models/User");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.secretOrPrivateKey,
};

passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    const user = await User.findOne({ id: jwt_payload.id });

    user ? done(null, user) : done(null, false);
  })
);

module.exports = isAuth = () =>
  passport.authenticate("jwt", { session: false });
