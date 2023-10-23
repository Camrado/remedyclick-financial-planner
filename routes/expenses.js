const express = require('express');
const ExpenseRouter = express.Router();

// Controllers
const { getAllExpenses, getExpense, createExpense } = require('../controllers/expenses');

ExpenseRouter.get('/', getAllExpenses);
ExpenseRouter.get('/:id', getExpense);
ExpenseRouter.post('/', createExpense);

module.exports = ExpenseRouter;
