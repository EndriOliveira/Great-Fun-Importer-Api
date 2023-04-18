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

  async editUser(data) {
    const { userId, id, name, password, phone, cpf } = data;
    const userExists = await user.findOne({ where: { id } });
    if (!userExists) throw new Error('User not found');
    if (userId != id) throw new Error('Unauthorized');
    if (await compare(password, userExists.password)) {
      return await user.update(
        {
          name: name ? name : userExists.name,
          phone: phone ? phone : userExists.phone,
          cpf: cpf ? cpf : userExists.cpf,
        },
        { where: { id } }
      );
    } else {
      throw new Error('Invalid Credentials');
    }
  }

  async login(data) {
    const { email, password } = data;
    const userExists = await user.findOne({ where: { email } });
    if (!userExists) throw new Error('Invalid Credentials');
    if (await compare(password, userExists.password)) {
      return userExists;
    } else {
      throw new Error('Invalid Credentials');
    }
  }

  async forgetPassword(data) {
    const { email, code } = data;
    const userExists = await user.findOne({ where: { email } });
    if (!userExists) throw new Error('User not found');
    await user.update(
      {
        code,
        resetPasswordExpires: Date.now() + 3600000,
      },
      { where: { email } }
    );
    return userExists;
  }

  async deleteUser(data) {
    const { id } = data;
    const userExists = await user.destroy({ where: { id } });
    if (userExists == 0) throw new Error('User not found');
    return;
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
