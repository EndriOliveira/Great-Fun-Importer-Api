require('dotenv').config();

const usersService = require('../services/users.service');
const { formatCpf, formatPhone, totalPages } = require('../utils/utils');
const { validateCPF } = require('../utils/validateCpf');

class UsersController {
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
        status: 400,
        message: 'Invalid CPF',
        error: 'Bad Request',
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

  async deleteUser(req, res, next) {
    const { id } = req.params;
    const { role } = req.user;
    if (role !== 'ADMIN') {
      return next({
        status: 403,
        message: 'You do not have permission to delete a user',
        error: 'Forbidden',
      });
    }
    try {
      await usersService.deleteUser({
        id,
      });
      return res.status(200).json({
        message: 'User deleted successfully',
      });
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
}

module.exports = new UsersController();
