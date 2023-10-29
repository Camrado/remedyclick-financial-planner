const express = require('express');
const ExpenseRouter = express.Router();

// Controllers
const { getAllExpenses, getExpense, createExpense, updateExpense, deleteExpense } = require('../controllers/expenses');

ExpenseRouter.get('/', getAllExpenses);
ExpenseRouter.get('/:id', getExpense);
ExpenseRouter.post('/', createExpense);
ExpenseRouter.patch('/:id', updateExpense);
ExpenseRouter.delete('/:id', deleteExpense);

module.exports = ExpenseRouter;
