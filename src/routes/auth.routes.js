const router = require('express').Router();
const authController = require('../controllers/auth.controller');
const validateSchema = require('../middlewares/validateSchema');
const createUserSchema = require('../utils/schemas/createUser.schema');
const loginSchema = require('../utils/schemas/login.schema');
const forgetPasswordSchema = require('../utils/schemas/forgetPassword.schema');
const resetPasswordSchema = require('../utils/schemas/resetPassword.schema');
const changePasswordSchema = require('../utils/schemas/changePassword.schema');
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
  authController.login
);

router.post(
  '/auth/signup',
  /* #swagger.tags = ['Auth'] */
  validateSchema(createUserSchema),
  authController.createUser
);

router.post(
  '/auth/change-password',
  /* #swagger.tags = ['Auth']
  #swagger.security = [{
    "bearerAuth": []
  }] */
  GetUser(),
  validateSchema(changePasswordSchema),
  authController.changePassword
);

router.post(
  '/auth/forget-password',
  /* #swagger.tags = ['Auth'] */
  validateSchema(forgetPasswordSchema),
  authController.forgetPassword
);

router.post(
  '/auth/reset-password',
  /* #swagger.tags = ['Auth'] */
  validateSchema(resetPasswordSchema),
  authController.resetPassword
);

module.exports = router;
