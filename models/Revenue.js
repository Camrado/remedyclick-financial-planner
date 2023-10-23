const mongoose = require('mongoose');

const RevenueSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
    maxlength: 50
  },
  amount: {
    type: Number,
    required: true
  },
  finance_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Finance'
  }
});

module.exports = mongoose.model('Revenue', RevenueSchema);
