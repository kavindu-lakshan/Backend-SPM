const { MongoClient, ObjectId } = require("mongodb");
const Stock = require("../../Models/stock_model");
const Item = require("../../Models/itemModel");
const catchAsync = require("../../Utils/catchAsync");
const Filter = require("../../Utils/Filters");
const e = require("express");

//Create Stock
exports.Stock = catchAsync(async (req, res, next) => {
  const newStock = await Stock.create(req.body);
  const itemDetails = await Item.findOne({ _id: req.body.item });
  console.log(itemDetails);
  res.status(201).json({
    status: "success",
    data: {
      group: newStock,
      items: itemDetails,
    },
  });
});

//Update Stock
exports.UpdateStock = catchAsync(async (req, res, next) => {
  let all_Stocks = await Stock.findByIdAndUpdate(req.params.id, { available_stock: req.body.available_stock, last_update: new Date() });
  res.status(201).json({
    status: "success",
    data: {
      all_Stocks,
    },
  });
});

//Delete Stock
exports.DeleteStock = catchAsync(async (req, res, next) => {
  let deleteStock = await Stock.findByIdAndDelete(req.params.id);
  res.status(200).json({
    status: "success",
    data: {
      deleteStock,
    },
  });
});
