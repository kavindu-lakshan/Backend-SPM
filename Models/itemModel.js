const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  supplier_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  item_code: { type: String, unique: [true,"This Item is Already Exist"], required: [true,"Please Enter Item Code"] },
  name: { type: String, required: [true,"Please Enter Item Name"] },
  description: { type: String },
  qty: { type: String, required: [true,"Please Enter Qty"]  },
  price: { type: String, required: [true,"Please Enter Item Price"]  },
  brand: { type: String, required: [true,"Please Enter Item Brand"] },
  enabled: {type: Boolean, default: false},
  created_at: {type: Date, default: Date.now}
});

const Item = mongoose.model('Item', itemSchema);
module.exports = Item;
