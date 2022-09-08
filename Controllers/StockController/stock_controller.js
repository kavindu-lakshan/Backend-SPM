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

//Get all Stocks
exports.AllStocks = catchAsync(async (req, res, next) => {
  let Respond = new Filter(Stock.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const stocks = await Respond.query;
  let Respond2 = [];
  Respond2.push(await Item.findById(stocks.map((e) => e.item_code)));
  let details = [...stocks, ...Respond2];
  res.status(201).json({
    status: "success",
    data: {
      details,
    },
  });
});

//Update Stock
exports.UpdateStock = catchAsync(async (req, res, next) => {
  req.body.stock = req.stock;
  let all_Stocks = await Stock.findByIdAndUpdate(req.params.id, req.body);
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
