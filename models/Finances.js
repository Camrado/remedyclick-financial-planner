const mongoose = require('mongoose');

const FinancesSchema = new mongoose.Schema({
  year: {
    type: Number,
    required: true,
    default: new Date().getFullYear()
  },
  month: {
    type: String,
    required: true,
    maxlength: 10,
    trim: true,
    default: new Date().toLocaleString('default', { month: 'long' })
  },
  revenues: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Revenue'
    }
  ]
});

module.exports = mongoose.model('Finance', FinancesSchema);
