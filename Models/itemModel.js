const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  item_code: { type: String, unique: [true,"This Item is Already Exist"], required: [true,"Please Enter Item Code"] },
  name: { type: String, required: [true,"Please Enter Item Name"] },
  description: { type: String, required: [true,"Please Enter Description"]  },
  qty: { type: String, required: [true,"Please Enter Qty"]  },
  brand: { type: String, required: [true,"Please Enter Item Brand"] },
  enabled: {type: Boolean, default: false},
  created_at: {type: Date, default: Date.now}
});

const Item = mongoose.model('Item', itemSchema);
module.exports = Item;