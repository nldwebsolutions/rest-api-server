module.exports = function(app) {
  const { Auth } = require('../middlewares');
  const controller = require('../controllers/user.controller.js');

  var router = require('express').Router();

  router.get(
    "/",
    controller.findAll
  );

  router.get(
    "/:id",
    controller.findOne
  );

  router.put(
    "/:id",
    controller.update
  );

  router.delete(
    "/:id",
    controller.delete
  );

  app.use('/users', router);
}