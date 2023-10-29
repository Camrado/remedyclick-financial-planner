// Modules
const mongoose = require('mongoose');

// Models
const Expense = require('../models/Expense');
const Finance = require('../models/Finance');

// Errors
const { createRequestError } = require('../errors/RequestError');

const getAllExpenses = async (req, res) => {
  const expenses = await Expense.find({});
  res.status(200).json(expenses);
};

const createExpense = async (req, res) => {
  const expense = await Expense.create(req.body);

  // Adding created expense's _id to Finance.expenses
  let finance = await Finance.findById(req.body.finance_id);
  await Finance.findByIdAndUpdate(req.body.finance_id, { expenses: [...finance.expenses, expense] });

  res.status(201).json(expense);
};

const getExpense = async (req, res, next) => {
  const { id: expenseID } = req.params;

  // Checking if expenseID is valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(expenseID)) {
    return next(createRequestError(`invalid ID: ${expenseID}`, 'invalid_id', 404));
  }

  const expense = await Expense.findOne({ _id: expenseID });

  if (!expense) {
    return next(createRequestError(`no expense with ID: ${expenseID}`, 'not-found', 404));
  }

  res.status(200).json(expense);
};

const updateExpense = async (req, res, next) => {
  const { id: expenseID } = req.params;

  // Checking if expenseID is valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(expenseID)) {
    return next(createRequestError(`invalid ID: ${expenseID}`, 'invalid_id', 404));
  }

  const expense = await Expense.findByIdAndUpdate(expenseID, req.body, {
    new: true,
    runValidators: true
  });

  if (!expense) {
    return next(createRequestError(`no expense with ID: ${expenseID}`, 'not-found', 404));
  }

  res.status(200).json(expense);
};

const deleteExpense = async (req, res, next) => {
  const { id: expenseID } = req.params;

  // Checking if expenseID is valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(expenseID)) {
    return next(createRequestError(`invalid ID: ${expenseID}`, 'invalid_id', 404));
  }

  const expense = await Expense.findByIdAndDelete(expenseID);

  if (!expense) {
    return next(createRequestError(`no expense with ID: ${expenseID}`, 'not-found', 404));
  }

  res.status(200).json(expense);
};

module.exports = { getAllExpenses, getExpense, createExpense, updateExpense, deleteExpense };
