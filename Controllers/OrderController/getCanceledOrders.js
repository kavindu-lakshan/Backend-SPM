/**
 * @file This file defines for add Order details
 * @author Kavindu Shehan
 */
const { MongoClient, ObjectId } = require('mongodb');

module.exports = getCanceledOrders = async (req, res) => {
    const { _id } = req.user;

    const client = new MongoClient(process.env.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    const db = client.db(process.env.MONGO_DB);
    const collection = db.collection('canceledorders');
    console.info(`Database connected...!`)

    try {
        var options = {
            allowDiskUse: true
        };

        var pipeline = [
            {
                '$project': {
                    '_id': 0,
                    'canceledorders': '$$ROOT'
                }
            }, {
                '$lookup': {
                    'from': 'users',
                    'localField': 'canceledorders.user',
                    'foreignField': '_id',
                    'as': 'users'
                }
            }, {
                '$unwind': {
                    'path': '$users',
                    'preserveNullAndEmptyArrays': false
                }
            }, {
                '$match': {
                    'canceledorders.user': ObjectId(_id)
                }
            }
        ]

        var cursor = collection.aggregate(pipeline, options);
        var result = await cursor.toArray()

        res.status(200).json(result);
    } catch (error) {
        console.log(error)
        client.close()
    }
}