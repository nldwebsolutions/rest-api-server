module.exports = function(app) {
  const { Validate } = require('../middlewares');
  const controller = require('../controllers/auth.controller.js');

  var router = require('express').Router();

  router.post(
    "/signup",
    [Validate.isUsernameTaken], 
    controller.signup
  );

  router.post(
    "/login", 
    controller.login
  );

  app.use('/auth', router);
}