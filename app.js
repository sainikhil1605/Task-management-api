const express = require('express');
const app = express();
const tasks = require('./routes/tasks');
const connectDB = require('./db/connect');
const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');
const morgan = require('morgan');
require('dotenv').config();
const PORT = process.env.PORT || 5000;
app.use(morgan('dev'));
app.use(express.json());
app.use('/api/v1/tasks', tasks);
app.use(notFound);
app.use(errorHandler);
const start = async () => {
  try {
    await connectDB(process.env.CONNECTION_STRING);
    app.listen(PORT, console.log('Server is listening on port ' + PORT));
  } catch (err) {
    console.log(err);
  }
};

start();
