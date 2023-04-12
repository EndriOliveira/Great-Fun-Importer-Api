const passport = require('passport');
function GetUser() {
  return passport.authenticate('jwt', { session: false });
}
module.exports = GetUser;
