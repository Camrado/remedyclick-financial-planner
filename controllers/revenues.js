// Modules
const mongoose = require('mongoose');

// Models
const Revenue = require('../models/Revenue');
const Finance = require('../models/Finance');

// Errors
const { BadRequestError } = require('../errors');

const getAllRevenue = async (req, res) => {
  const revenues = await Revenue.find({});
  res.status(200).json(revenues);
};

const createRevenue = async (req, res) => {
  const revenue = await Revenue.create(req.body);

  // Adding created revenue's _id to Finance.revenues
  let finance = await Finance.findById(req.body.finance_id);
  await Finance.findByIdAndUpdate(req.body.finance_id, { revenues: [...finance.revenues, revenue] });

  res.status(201).json(revenue);
};

const getRevenue = async (req, res) => {
  const { id: revenueID } = req.params;

  // Checking if revenueID is valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(revenueID)) {
    throw new BadRequestError(`invalid ID: ${revenueID}`, 'invalid_id', 400);
  }

  const revenue = await Revenue.findOne({ _id: revenueID });

  if (!revenue) {
    throw new BadRequestError(`no revenue with ID: ${revenueID}`, 'not-found', 404);
  }

  res.status(200).json(revenue);
};

const updateRevenue = async (req, res) => {
  const { id: revenueID } = req.params;

  // Checking if revenueID is valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(revenueID)) {
    throw new BadRequestError(`invalid ID: ${revenueID}`, 'invalid_id', 400);
  }

  const revenue = await Revenue.findByIdAndUpdate(revenueID, req.body, {
    new: true,
    runValidators: true
  });

  if (!revenue) {
    throw new BadRequestError(`no revenue with ID: ${revenueID}`, 'not-found', 404);
  }

  res.status(200).json(revenue);
};

const deleteRevenue = async (req, res) => {
  const { id: revenueID } = req.params;

  // Checking if revenueID is valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(revenueID)) {
    throw new BadRequestError(`invalid ID: ${revenueID}`, 'invalid_id', 400);
  }

  const revenue = await Revenue.findByIdAndDelete(revenueID);

  if (!revenue) {
    throw new BadRequestError(`no revenue with ID: ${revenueID}`, 'not-found', 404);
  }

  res.status(200).json(revenue);
};

module.exports = { getAllRevenue, getRevenue, createRevenue, updateRevenue, deleteRevenue };
