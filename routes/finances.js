const express = require('express');
const FinanceRouter = express.Router();

// Controllers
const { getAllFinances, getFinance, createFinance } = require('../controllers/finances');

FinanceRouter.get('/', getAllFinances);
FinanceRouter.get('/:id', getFinance);
FinanceRouter.post('/', createFinance);

module.exports = FinanceRouter;
