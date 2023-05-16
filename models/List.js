const Sequelize = require('sequelize');

const sequelize = new Sequelize('postgres://postgres:password@localhost:5432/mydatabase');

const List = sequelize.define('list', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = List;