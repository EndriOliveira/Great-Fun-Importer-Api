require('dotenv').config();

const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');

module.exports = function () {
  const { user } = require('../database/models');
  const opts = {};
  opts.secretOrKey = process.env.TOKEN_SECRET;
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  const strategy = new Strategy(opts, (payload, done) => {
    user
      .findOne({ where: { id: payload.id } })
      .then((user) => {
        if (user) {
          return done(null, {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            acceptTerms: user.acceptTerms,
          });
        } else {
          return done(null, false);
        }
      })
      .catch((error) => done(error, null));
  });
  passport.use(strategy);
  return {
    initialize: () => passport.initialize(),
    authenticate: () => passport.authenticate('jwt', process.env.TOKEN_SECRET),
  };
};
