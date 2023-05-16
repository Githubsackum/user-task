const express = require('express');
const cors = require('cors');
const { Sequelize } = require('sequelize');

// Import routes and models here
const authRoutes = require('./routes/auth');
const listRoutes = require('./routes/lists');
const taskRoutes = require('./routes/tasks');
const User = require('./models/User');
const List = require('./models/List');
const Task = require('./models/Task');

const app = express();

// Set up middleware
app.use(express.json());
app.use(cors());

// Set up database connection
const sequelize = new Sequelize('database_name', 'username', 'password', {
  host: 'localhost',
  dialect: 'postgres',
});

// Test the database connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

// Define routes here
app.use('/api/auth', authRoutes);
app.use('/api/lists', listRoutes);
app.use('/api/tasks', taskRoutes);

// Define models here
User.init(sequelize);
List.init(sequelize);
Task.init(sequelize);

// Define associations between models here
User.hasMany(List);
List.belongsTo(User);
List.hasMany(Task);
Task.belongsTo(List);

// Sync the database models with the database schema
sequelize.sync();

// Handle errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Internal server error.');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}.`);
});
