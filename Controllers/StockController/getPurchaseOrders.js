/**
 * @file This file defines for get purchase order details
 * @author Kavindu Shehan
 */
const { MongoClient, ObjectId } = require('mongodb');

module.exports = getPurchaseOrders = async (req, res) => {
    const client = new MongoClient(process.env.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    const db = client.db(process.env.MONGO_DB);
    const collection = db.collection('purchaseorders');
    console.info(`Database connected...!`)

    try {
        var options = {
            allowDiskUse: true
        };

        var pipeline = [
            {
                '$project': {
                    '_id': 0,
                    'purchaseorders': '$$ROOT'
                }
            }, {
                '$lookup': {
                    'from': 'orders',
                    'localField': 'purchaseorders.order_ref',
                    'foreignField': '_id',
                    'as': 'orders'
                }
            }, {
                '$unwind': {
                    'path': '$orders',
                    'preserveNullAndEmptyArrays': false
                }
            }
        ]

        var pipeline2 = {
            '$match': {
                'purchaseorders.status': req.query.status
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