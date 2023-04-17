const router = require('express').Router();
const usersController = require('../controllers/user.controller');
const GetUser = require('../decorators/get-user.decorator');
const validateSchema = require('../middlewares/validateSchema');
const editUserSchema = require('../utils/schemas/editUser.schema');

router.get(
  '/users',
  /* #swagger.tags = ['Users'] */
  usersController.listAllUsers
);

router.put(
  '/users/:id',
  GetUser(),
  /* #swagger.tags = ['Users']
  #swagger.security = [{
    "bearerAuth": []
  }] */
  validateSchema(editUserSchema),
  usersController.editUser
);

router.delete(
  '/users/:id',
  GetUser(),
  /* #swagger.tags = ['Users']
  #swagger.security = [{
    "bearerAuth": []
  }] */
  usersController.deleteUser
);

module.exports = router;
