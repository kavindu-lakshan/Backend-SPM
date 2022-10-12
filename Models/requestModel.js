const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  supplier_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  request: { type: String, required: [true,"Please Enter Request Details"]  },
  due_date: {type: Date, required: [true,"Please Enter Request Due Date"]  },
  status: { type: String, enum: ['Pending', 'Approved','Declined'], default: 'Pending'},
  created_at: {type: Date, default: Date.now},
  updated_at: {type: Date, default: Date.now}
});

const Request = mongoose.model('Request', requestSchema);
module.exports = Request;
