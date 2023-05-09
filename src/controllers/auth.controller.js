require('dotenv').config();

const jwt = require('jsonwebtoken');
const usersService = require('../services/users.service');
const {
  formatCpf,
  formatPhone,
  generateRandomCode,
} = require('../utils/utils');
const { validateCPF } = require('../utils/validateCpf');
const { verifyEmail } = require('../utils/validateEmail');
const { sendMail } = require('../services/sendMail.service');
const {
  templateForgetPassword,
} = require('../templates/forgetPasswordEmail.template');

class AuthController {
  async createUser(req, res, next) {
    try {
      const {
        name,
        email,
        password,
        confirmPassword,
        phone,
        cpf,
        acceptTerms,
      } = req.body;

      if (!verifyEmail(email)) {
        return next({
          status: 400,
          message: 'Invalid email',
          error: 'Bad Request',
        });
      }

      if (!validateCPF(cpf)) {
        return next({
          status: 400,
          message: 'Invalid CPF',
          error: 'Bad Request',
        });
      }
      if (password !== confirmPassword) {
        return next({
          status: 400,
          message: 'Passwords do not match',
          error: 'Bad Request',
        });
      }
      if (!acceptTerms) {
        return next({
          status: 400,
          message: 'You must accept the terms of use',
          error: 'Bad Request',
        });
      }
      const user = await usersService.createUser({
        name,
        email,
        password,
        phone: formatPhone(phone),
        cpf: formatCpf(cpf),
        acceptTerms,
      });
      return res.status(201).json({
        message: 'User created',
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          cpf: user.cpf,
        },
      });
    } catch (error) {
      if (error.message.includes('already exists')) {
        return next({
          status: 409,
          message: error.message,
          error: 'Conflict',
        });
      } else {
        return next({
          status: 500,
          message: error.message,
          error: 'Internal server error',
        });
      }
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await usersService.login({
        email,
        password,
      });
      if (user) {
        const token = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET, {
          expiresIn: '1h',
        });
        return res.status(200).json({ token });
      }
      return res.status(200).json({
        message: 'User logged',
      });
    } catch (error) {
      if (error.message.includes('Invalid Credentials')) {
        return next({
          status: 401,
          message: error.message,
          error: 'Unauthorized',
        });
      } else {
        return next({
          status: 500,
          message: error.message,
          error: 'Internal server error',
        });
      }
    }
  }

  async forgetPassword(req, res, next) {
    try {
      const { email } = req.body;
      const code = generateRandomCode(6);
      const user = await usersService.forgetPassword({
        email,
        code,
      });
      if (user) {
        await sendMail(
          templateForgetPassword({
            email,
            name: user.name,
            code,
          })
        );
        return res.status(200).json({
          message: 'A reset code has been sent to your email',
        });
      } else {
        return next({
          status: 404,
          message: 'User not found',
          error: 'Not found',
        });
      }
    } catch (error) {
      if (error.message.includes('not found')) {
        return next({
          status: 404,
          message: error.message,
          error: 'Not found',
        });
      } else {
        return next({
          status: 500,
          message: error.message,
          error: 'Internal server error',
        });
      }
    }
  }

  async resetPassword(req, res, next) {
    try {
      const { code, password, confirmPassword } = req.body;
      if (password !== confirmPassword) {
        return next({
          status: 400,
          message: 'Passwords do not match',
          error: 'Bad Request',
        });
      }
      const user = await usersService.resetPassword({
        password,
        code,
      });
      if (user) {
        return res.status(200).json({
          message: 'Password changed successfully',
        });
      } else {
        return next({
          status: 404,
          message: 'User not found',
          error: 'Not found',
        });
      }
    } catch (error) {
      if (error.message.includes('not found')) {
        return next({
          status: 404,
          message: error.message,
          error: 'Not found',
        });
      } else if (error.message.includes('Credentials')) {
        return next({
          status: 401,
          message: error.message,
          error: 'Invalid Credentials',
        });
      } else {
        return next({
          status: 500,
          message: error.message,
          error: 'Internal server error',
        });
      }
    }
  }

  async changePassword(req, res, next) {
    try {
      const { password, newPassword, confirmPassword } = req.body;
      const user = req.user;
      if (newPassword !== confirmPassword) {
        return next({
          status: 401,
          message: 'Passwords do not match',
          error: 'Unauthorized',
        });
      }
      const changeUserPassword = await usersService.changePassword({
        userId: user.id,
        password,
        newPassword,
      });
      if (changeUserPassword) {
        return res.status(200).json({
          message: 'Password changed successfully',
        });
      } else {
        return next({
          status: 404,
          message: 'User not found',
          error: 'Not found',
        });
      }
    } catch (error) {
      if (error.message.includes('not found')) {
        return next({
          status: 404,
          message: error.message,
          error: 'Not found',
        });
      } else if (error.message.includes('Credentials')) {
        return next({
          status: 401,
          message: error.message,
          error: 'Unauthorized',
        });
      } else {
        return next({
          status: 500,
          message: error.message,
          error: 'Internal server error',
        });
      }
    }
  }
}

module.exports = new AuthController();
