const { ObjectId, MongoClient } = require("mongodb");

module.exports = updateOrder = async (req, res) => {
    const { data } = req.body;
    console.log(data)
    var id = data.id;
    delete data["id"];

    const client = new MongoClient(process.env.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    const db = client.db(process.env.MONGO_DB);
    console.info(`Database connected...!`)

    try {

        await db.collection('orders').updateOne({ _id: ObjectId(id) }, { $set: { quantity: Number(data.qty), updatedAt: new Date() } })

        await db.collection('purchaseorders').updateOne({ order_ref: ObjectId(id) }, { $set: { quantity: Number(data.qty), price: Number(Number(data.qty) * Number(data.price)) } })

        client.close()
        res.status(200).send(`The order created successfully...!`)
    } catch (error) {
        console.log(error)
        client.close()
    }
}