const router = require('express').Router();
const authController = require('../controllers/auth.controller');
const validateSchema = require('../middlewares/validateSchema');
const createUserSchema = require('../utils/schemas/createUser.schema');
const loginSchema = require('../utils/schemas/login.schema');
const forgetPasswordSchema = require('../utils/schemas/forgetPassword.schema');
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
// TODO: Implement forget password feature
router.post(
  '/auth/forget-password',
  /* #swagger.tags = ['Auth'] */
  validateSchema(forgetPasswordSchema),
  authController.forgetPassword
);

module.exports = router;
