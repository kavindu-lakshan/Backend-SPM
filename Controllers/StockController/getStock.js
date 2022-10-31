/**
 * @file This file defines for get stock details
 * @author Kavindu Shehan
 */
const { MongoClient, ObjectId } = require('mongodb');

module.exports = getStock = async (req, res) => {
    const client = new MongoClient(process.env.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    const db = client.db(process.env.MONGO_DB);
    const collection = db.collection('stocks');
    console.info(`Database connected...!`)

    console.log(req.query)

    try {
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
        ];

        var pipeline2 = {
            '$match': {
                'stocks.Availability': req.query.Availability === 'true' ? true : false
            }
        }

        if (req.query.Availability) {
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