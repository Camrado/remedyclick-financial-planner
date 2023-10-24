const express = require('express');
const RevenueRouter = express.Router();

// Controllers
const { getAllRevenue, getRevenue, createRevenue, updateRevenue, deleteRevenue } = require('../controllers/revenues');

RevenueRouter.get('/', getAllRevenue);
RevenueRouter.get('/:id', getRevenue);
RevenueRouter.post('/', createRevenue);
RevenueRouter.patch('/:id', updateRevenue);
RevenueRouter.delete('/:id', deleteRevenue);

module.exports = RevenueRouter;
