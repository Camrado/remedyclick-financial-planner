const Finance = require('../models/Finances');
const Revenue = require('../models/Revenue');

const getAllFinances = async (req, res) => {
  let finances = await Finance.find({});

  finances.map(async (finance) => {
    let revenues = await Revenue.find({ finance_id: finance._id });
    finance.revenues = revenues;
  });

  res.status(200).json(finances);
};

const createFinance = async (req, res) => {
  const finance = await Finance.create(req.body);
  res.status(201).json({ finance });
};

const getFinance = async (req, res) => {
  const { id: financeID } = req.params;
  const finance = await Finance.findOne({ _id: financeID });

  if (!finance) throw new Error(`No finance with ID: ${financeID}`, 404);

  res.status(200).json({ finance });
};

module.exports = { getAllFinances, createFinance, getFinance };
