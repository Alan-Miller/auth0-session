module.exports = function(req, res, next) {
  // console.log('\nSESSION', req.session);
  // console.log('\nUSER', req.session.user);
  next();
}