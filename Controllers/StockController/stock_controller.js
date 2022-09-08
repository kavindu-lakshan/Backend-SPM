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

//Get all Stocks
exports.AllStocks = catchAsync(async (req, res, next) => {
  const client = new MongoClient(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  await client.connect();
  const db = client.db(process.env.MONGO_DB);
  const collection = db.collection("stocks");
  console.info(`Database connected...!`);

  try {
    let Respond = new Filter(Stock.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const stocks = await Respond.query;
    console.log(stocks);
    await Promise.all(
      stocks.map(async (e) => {
        var options = {
          allowDiskUse: true,
        };

        var pipeline = [
          {
            $project: {
              _id: 0,
              stocks: "$$ROOT",
            },
          },
          {
            $lookup: {
              from: "items",
              localField: "stocks.item_code",
              foreignField: "_id",
              as: "items",
            },
          },
          {
            $unwind: {
              path: "$items",
              preserveNullAndEmptyArrays: false,
            },
          },
          {
            $match: {
              "stocks.item_code": ObjectId(e.item_code),
            },
          },
        ];

        var cursor = collection.aggregate(pipeline, options);
        var result = await cursor.toArray();

        res.status(200).json(result);
      })
    );
  } catch (error) {
    console.log(error);
    client.close();
  }

  // let Respond2 = [];

  // Respond2.push(await Item.findById(stocks.map((e) => e.item_code)));
  // let details = [...stocks, ...Respond2];
  // res.status(201).json({
  //   status: "success",
  //   data: {
  //     details,
  //   },
  // });

  // const client = new MongoClient(process.env.DATABASE, {
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true,
  // });
  // await client.connect();
  // const db = client.db(process.env.MONGO_DB);
  // const collection = db.collection("orders");
  // console.info(`Database connected...!`);
});

//Update Stock
exports.UpdateStock = catchAsync(async (req, res, next) => {
  req.body.stock = req.stock;
  let all_Stocks = await Stock.findByIdAndUpdate(req.params.id, req.body);
  console.log(req.params.id);
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
