/**
 * @file This file defines for add Order details
 * @author Kavindu Shehan
 */
const { MongoClient, ObjectId } = require('mongodb');

module.exports = getOrder = async (req, res) => {
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
            }, {
                '$match': {
                    'orders.user': ObjectId(_id)
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