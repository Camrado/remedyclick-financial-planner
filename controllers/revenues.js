const Revenue = require('../models/Revenue');

const getAllRevenue = async (req, res) => {
  const revenues = await Revenue.find({});
  res.status(200).json({ revenues });
};

const createRevenue = async (req, res) => {
  const revenue = await Revenue.create(req.body);
  res.status(201).json({ revenue });
};

const getRevenue = async (req, res) => {
  const { id: revenueID } = req.params;
  const revenue = await Revenue.findOne({ _id: revenueID });

  if (!revenue) throw new Error(`No revenue with ID: ${revenueID}`, 404);

  res.status(200).json({ revenue });
};

module.exports = { getAllRevenue, getRevenue, createRevenue };
