const express = require('express');
const RevenueRouter = express.Router();

// Controllers
const { getAllRevenue, getRevenue, createRevenue } = require('../controllers/revenues');

RevenueRouter.get('/', getAllRevenue);
RevenueRouter.get('/:id', getRevenue);
RevenueRouter.post('/', createRevenue);

module.exports = RevenueRouter;
