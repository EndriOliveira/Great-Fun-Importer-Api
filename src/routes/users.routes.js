const usersController = require('../controllers/userController.controller');
const router = require('express').Router();

router.get(
  '/users',
  /* #swagger.tags = ['Users'] */
  usersController.listAllUsers
);

module.exports = router;
