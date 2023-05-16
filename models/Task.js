const Sequelize = require('sequelize');

const sequelize = new Sequelize('postgres://postgres:password@localhost:5432/mydatabase');

const Task = sequelize.define('task', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  completed: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
});

module.exports = Task;
