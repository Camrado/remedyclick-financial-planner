// Node Modules
require('dotenv').config();
require('express-async-errors');
const express = require('express');

// Files
const connectDB = require('./db/connect');
const errorHandlerMiddleware = require('./middlewares/error-handler');
const RevenueRouter = require('./routes/revenues');
const ExpenseRouter = require('./routes/expenses');
const FinanceRouter = require('./routes/finances');

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(express.json());

// Routes
app.use('/api/v1/revenue', RevenueRouter);
app.use('/api/v1/expense', ExpenseRouter);
app.use('/api/v1/finance', FinanceRouter);

app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => console.log(`Listening on port ${port}`));
  } catch (err) {
    console.log(err);
  }
};

start();
