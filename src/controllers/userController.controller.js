require('dotenv').config();

const jwt = require('jsonwebtoken');
const usersService = require('../services/users.service');
const { formatCpf, formatPhone, totalPages } = require('../utils/utils');
const { validateCPF } = require('../utils/validateCpf');

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

      if (!validateCPF(cpf)) {
        return next({
          status: 401,
          message: 'Invalid CPF',
          error: 'Unauthorized',
        });
      }
      if (password !== confirmPassword) {
        return next({
          status: 401,
          message: 'Passwords do not match',
          error: 'Unauthorized',
        });
      }
      if (!acceptTerms) {
        return next({
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

  async listAllUsers(req, res, next) {
    let { page, limit, user } = req.query;
    page = isNaN(page) ? 1 : page;
    limit = isNaN(limit) || limit > 100 ? 100 : limit;
    try {
      const users = await usersService.listAllUsers({
        page,
        limit,
        user,
      });
      return res.status(200).json({
        users: users.rows,
        total: Number(users.count),
        page: Number(page),
        pages: Number(totalPages(users.count, limit)),
      });
    } catch (error) {
      return next({
        status: 500,
        message: error.message,
        error: 'Internal server error',
      });
    }
  }

  async editUser(req, res, next) {
    const { id } = req.params;
    const user = req.user;
    const { name, phone, cpf, password } = req.body;
    if (cpf && !validateCPF(cpf)) {
      return next({
        status: 401,
        message: 'Invalid CPF',
        error: 'Unauthorized',
      });
    }
    try {
      await usersService.editUser({
        userId: user.id,
        id,
        name,
        phone: phone ? formatPhone(phone) : null,
        cpf: cpf ? formatCpf(cpf) : null,
        password,
      });
      return res.status(200).json({
        message: 'User edited successfully',
      });
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

module.exports = new UsersController();
