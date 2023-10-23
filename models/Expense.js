const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['Software', 'Staff', 'Other']
  },
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

module.exports = mongoose.model('Expense', ExpenseSchema);
