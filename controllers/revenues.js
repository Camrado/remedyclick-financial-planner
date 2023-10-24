// Models
const Revenue = require('../models/Revenue');
const Finance = require('../models/Finance');

// Errors
const { createRequestError } = require('../errors/RequestError');

// Modules
const mongoose = require('mongoose');

const getAllRevenue = async (req, res) => {
  const revenues = await Revenue.find({});
  res.status(200).json({ revenues });
};

const createRevenue = async (req, res) => {
  const revenue = await Revenue.create(req.body);

  // Adding created revenue's _id to Finance.revenues
  let finance = await Finance.findById(req.body.finance_id);
  await Finance.findByIdAndUpdate(req.body.finance_id, { revenues: [...finance.revenues, revenue] });

  res.status(201).json({ revenue });
};

const getRevenue = async (req, res, next) => {
  const { id: revenueID } = req.params;

  // Checking if revenueID is valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(revenueID)) {
    return next(createRequestError(`incorrect ID for revenue: ${revenueID}`, 'incorrect_id', 404));
  }

  const revenue = await Revenue.findOne({ _id: revenueID });

  if (!revenue) {
    return next(createRequestError(`no revenue with ID: ${revenueID}`, 'not-found', 404));
  }

  res.status(200).json({ revenue });
};

const updateRevenue = async (req, res, next) => {
  const { id: revenueID } = req.params;

  // Checking if revenueID is valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(revenueID)) {
    return next(createRequestError(`incorrect ID for revenue: ${revenueID}`, 'incorrect_id', 404));
  }

  const revenue = await Revenue.findByIdAndUpdate(revenueID, req.body, {
    new: true,
    runValidators: true
  });

  if (!revenue) {
    return next(createRequestError(`no revenue with ID: ${revenueID}`, 'not-found', 404));
  }

  res.status(200).json(revenue);
};

const deleteRevenue = async (req, res, next) => {
  const { id: revenueID } = req.params;

  // Checking if revenueID is valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(revenueID)) {
    return next(createRequestError(`incorrect ID for revenue: ${revenueID}`, 'incorrect_id', 404));
  }

  const revenue = await Revenue.findByIdAndDelete(revenueID);

  if (!revenue) {
    return next(createRequestError(`no revenue with ID: ${revenueID}`, 'not-found', 404));
  }

  res.status(200).json(revenue);
};

module.exports = { getAllRevenue, getRevenue, createRevenue, updateRevenue, deleteRevenue };
