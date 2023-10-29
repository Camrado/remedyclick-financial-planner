// Models
const Finance = require('../models/Finance');

// Errors
const { BadRequestError } = require('../errors');

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

const getFinance = async (req, res) => {
  const { id: financeID } = req.params;

  // Checking if financeID is valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(financeID)) {
    throw new BadRequestError(`invalid ID: ${financeID}`, 'invalid_id', 400);
  }

  const finance = await Finance.findOne({ _id: financeID }).populate('revenues').populate('expenses');

  if (!finance) {
    throw new BadRequestError(`no finance with ID: ${financeID}`, 'not-found', 404);
  }

  res.status(200).json(finance);
};

module.exports = { getAllFinances, createFinance, getFinance };
