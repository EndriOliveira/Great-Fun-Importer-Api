require('dotenv').config();

const jwt = require('jsonwebtoken');
const usersService = require('../services/users.service');
const { formatCpf, formatPhone } = require('../utils/utils');

class UsersController {
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
      if (password !== confirmPassword) {
        next({
          status: 401,
          message: 'Passwords do not match',
          error: 'Unauthorized',
        });
      }
      if (!acceptTerms) {
        next({
          status: 401,
          message: 'You must accept the terms of use',
          error: 'Unauthorized',
        });
      }
      await usersService.createUser({
        name,
        email,
        password,
        phone: formatPhone(phone),
        cpf: formatCpf(cpf),
        acceptTerms,
      });
      return res.status(200).json({
        message: 'User created',
      });
    } catch (error) {
      if (error.message.includes('already exists')) {
        next({
          status: 409,
          message: error.message,
          error: 'Conflict',
        });
      } else {
        next({
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
        next({
          status: 401,
          message: error.message,
          error: 'Unauthorized',
        });
      } else {
        next({
          status: 500,
          message: error.message,
          error: 'Internal server error',
        });
      }
    }
  }

  async listAllUsers(req, res, next) {
    // TODO: Criar req params para paginação
    try {
      const users = await usersService.listAllUsers();
      return res.status(200).json({
        users,
      });
    } catch (error) {
      next({
        status: 500,
        message: error.message,
        error: 'Internal server error',
      });
    }
  }
}

module.exports = new UsersController();
