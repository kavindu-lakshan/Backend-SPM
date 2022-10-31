const { ObjectId, MongoClient } = require("mongodb");

module.exports = deletePurchaseOrder = async (req, res) => {
    const { data } = req.body;
    console.log(data)
    var id = data._id;
    delete data["id"];

    const client = new MongoClient(process.env.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    const db = client.db(process.env.MONGO_DB);
    console.info(`Database connected...!`)

    try {

        await db.collection('orders').deleteOne({ _id: ObjectId(id) })

        await db.collection('purchaseorders').deleteOne({ order_ref: ObjectId(id) })

        var canceledorderObj = {
            orderId: data.order_id,
            item: data.item,
            quantity: data.quantity,
            total: data.total,
            reason: data.reason,
            user: ObjectId(data.user),
            deletedAt: new Date()
        }

        await db.collection('canceledorders').insertOne(canceledorderObj)

        client.close()
        res.status(200).send(`The order created successfully...!`)
    } catch (error) {
        console.log(error)
        client.close()
    }
}