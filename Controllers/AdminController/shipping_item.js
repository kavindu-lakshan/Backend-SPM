//get all Staff
const catchAsync = require("../../Utils/catchAsync");
const Filter = require("../../Utils/Filters");
const ShippingItem = require("../../Models/shipping_item");
const Items = require("../../Models/itemModel");

exports.all_shipping_items = catchAsync(async (req, res, next) => {
    let Respond = new Filter(ShippingItem.find(), req.query).filter().sort().limitFields().paginate();
    const ShippingItems = await Respond.query;
    res.status(201).json({
        status: "success",
        data: {
            ShippingItems,
        },
    });
});

//update Staff
exports.update_shipping_state = catchAsync(async (req, res, next) => {
    let all_ShippingItems = await ShippingItem.findByIdAndUpdate(req.params.id,req.body)
    res.status(201).json({
        status: "success",
        data: {
            all_ShippingItems,
        },
    });
});

exports.getItem = catchAsync(async (req, res, next) => {
    let Item = await Items.findById(req.params.id)
    res.status(201).json({
        status: "success",
        data: {
            Item,
        },
    });
});
