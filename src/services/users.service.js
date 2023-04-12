const uuid = require('uuid');
const { genSalt, hash, compare } = require('bcryptjs');
const { user } = require('../database/models');
const { Op } = require('sequelize');

class UsersService {
  async createUser(data) {
    const { name, email, password, phone, cpf, acceptTerms } = data;
    const emailExists = await user.findOne({ where: { email } });
    const cpfExists = await user.findOne({ where: { cpf } });
    if (emailExists) throw new Error('Email already exists');
    if (cpfExists) throw new Error('CPF already exists');
    try {
      const salt = await genSalt(10);
      return await user.create({
        id: uuid.v4(),
        name,
        email,
        password: await hash(password, salt),
        phone,
        cpf,
        acceptTerms,
        role: 'REGISTERED_USER',
      });
    } catch (error) {
      throw new Error('Internal server error');
    }
  }

  async login(data) {
    const { email, password } = data;
    const emailExists = await user.findOne({ where: { email } });
    if (!emailExists) throw new Error('Invalid Credentials');
    if (await compare(password, emailExists.password)) {
      return emailExists;
    } else {
      throw new Error('Invalid Credentials');
    }
  }

  async listAllUsers(query) {
    query.user = query.user == undefined ? '' : query.user;
    try {
      return await user.findAndCountAll({
        attributes: [
          'id',
          'name',
          'email',
          'phone',
          'cpf',
          'role',
          'createdAt',
        ],
        where: {
          [Op.or]: [
            { email: { [Op.like]: `%${query.user}%` } },
            { name: { [Op.like]: `%${query.user}%` } },
          ],
        },
        offset: (query.page - 1) * query.limit,
        limit: query.limit,
      });
    } catch (error) {
      throw new Error('Internal server error');
    }
  }
}

module.exports = new UsersService();
