const Expense = require('../models/Expense');
const Finance = require('../models/Finance');

const getAllExpenses = async (req, res) => {
  const expenses = await Expense.find({});
  res.status(200).json({ expenses });
};

const createExpense = async (req, res) => {
  const expense = await Expense.create(req.body);

  // Adding created expense's _id to Finance.expenses
  let finance = await Finance.findById(req.body.finance_id);
  await Finance.findByIdAndUpdate(req.body.finance_id, { expenses: [...finance.expenses, expense] });

  res.status(201).json({ expense });
};

const getExpense = async (req, res) => {
  const { id: expenseID } = req.params;
  const expense = await Expense.findOne({ _id: expenseID });

  if (!expense) throw new Error(`No expense with ID: ${expenseID}`, 404);

  res.status(200).json({ expense });
};

module.exports = { getAllExpenses, getExpense, createExpense };
