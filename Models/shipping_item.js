const mongoose = require('mongoose');

const shippingItem = new mongoose.Schema({
    item: { type: mongoose.Schema.Types.ObjectId, ref: "Item" },
    qty:{
        type: Number,
    },
    price:{
        type: Number,
    },
    address:{
        type:String
    },
    status: {
        type: String,
        enum: ['draft', 'pending', 'shipped','declined'],
        default: 'draft'
    },
});

const ShippingItem = mongoose.model('ShippingItem', shippingItem);
module.exports = ShippingItem;
