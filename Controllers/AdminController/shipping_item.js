//get all Staff
const catchAsync = require("../../Utils/catchAsync");
const Filter = require("../../Utils/Filters");
const ShippingItem = require("../../Models/shipping_item");
const Items = require("../../Models/itemModel");
const {MongoClient, ObjectId} = require("mongodb");

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

exports.getShippingItems = async (req, res) => {
    const { _id } = req.user;

    const client = new MongoClient(process.env.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    const db = client.db(process.env.MONGO_DB);
    const collection = db.collection('orders');
    console.info(`Database connected...!`)

    try {
        var options = {
            allowDiskUse: true
        };

        var pipeline = [
            {
                '$project': {
                    '_id': 0,
                    'orders': '$$ROOT'
                }
            }, {
                '$lookup': {
                    'from': 'items',
                    'localField': 'orders.item_ref',
                    'foreignField': '_id',
                    'as': 'items'
                }
            }, {
                '$unwind': {
                    'path': '$items',
                    'preserveNullAndEmptyArrays': false
                }
            }
        ]

        var pipeline2 = {
            '$match': {
                'orders.status': req.query.status
            }
        }

        if (req.query.status) {
            pipeline.push(pipeline2)
        }

        var cursor = collection.aggregate(pipeline, options);
        var result = await cursor.toArray()

        res.status(200).json(result);
    } catch (error) {
        console.log(error)
        client.close()
    }
}


exports.updateShippingItem = async (req, res) => {
    const { data } = req.body;
    console.log(data)
    var id = data.id;
    delete data["id"];

    const client = new MongoClient(process.env.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    const db = client.db(process.env.MONGO_DB);
    console.info(`Database connected...!`)

    try {
        await db.collection('orders').updateOne({ _id: ObjectId(id) }, { $set: { status: data.status } })
        client.close()
        res.status(200).send(`The order created successfully...!`)
    } catch (error) {
        console.log(error)
        client.close()
    }
}




//update Staff
exports.update_shipping_state = catchAsync(async (req, res, next) => {
    console.log(req.body)
    console.log(req.params.id)
    let all_ShippingItems = await ShippingItem.findByIdAndUpdate(req.params.id,req.body)
    res.status(201).json({
        status: "success",
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
