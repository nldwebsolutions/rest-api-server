module.exports = function(app) {
  const { Auth } = require('../middlewares');
  const controller = require('../controllers/user.controller.js');

  var router = require('express').Router();

  router.get(
    "/",
    controller.findAll
  );

  app.use('/users', router);
}