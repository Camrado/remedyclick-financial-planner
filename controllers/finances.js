// Models
const Finance = require('../models/Finance');

// Errors
const { createRequestError } = require('../errors/RequestError');

// Modules
const mongoose = require('mongoose');

const getAllFinances = async (req, res) => {
  let finances = await Finance.find({}).populate('revenues').populate('expenses');

  res.status(200).json(finances);
};

const createFinance = async (req, res) => {
  const finance = await Finance.create(req.body);
  res.status(201).json(finance);
};

const getFinance = async (req, res, next) => {
  const { id: financeID } = req.params;

  // Checking if financeID is valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(financeID)) {
    return next(createRequestError(`invalid ID: ${financeID}`, 'invalid_id', 404));
  }

  const finance = await Finance.findOne({ _id: financeID }).populate('revenues').populate('expenses');

  if (!finance) {
    return next(createRequestError(`no finance with ID: ${financeID}`, 'not-found', 404));
  }

  res.status(200).json(finance);
};

module.exports = { getAllFinances, createFinance, getFinance };
