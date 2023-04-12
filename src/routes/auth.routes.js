const router = require('express').Router();
const usersController = require('../controllers/userController.controller');
const validateSchema = require('../middlewares/validateSchema');
const createUserSchema = require('../utils/schemas/createUser.schema');
const loginSchema = require('../utils/schemas/login.schema');
const GetUser = require('../decorators/get-user.decorator');

router.get(
  '/auth/me',
  /* #swagger.tags = ['Auth']
  #swagger.security = [{
    "bearerAuth": []
  }] */
  GetUser(),
  (req, res) => {
    return res.status(200).json(req.user);
  }
);

router.post(
  '/auth/signin',
  /* #swagger.tags = ['Auth'] */
  validateSchema(loginSchema),
  usersController.login
);

router.post(
  '/auth/signup',
  /* #swagger.tags = ['Auth'] */
  validateSchema(createUserSchema),
  usersController.createUser
);

module.exports = router;
