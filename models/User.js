const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');

const sequelize = new Sequelize('postgres://postgres:password@localhost:5432/mydatabase');

const User = sequelize.define('user', {
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

User.beforeCreate((user) => {
  const salt = bcrypt.genSaltSync();
  user.password = bcrypt.hashSync(user.password, salt);
});

User.prototype.validatePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = User;