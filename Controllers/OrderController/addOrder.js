/**
 * @file This file defines for add Order details
 * @author Kavindu Shehan
 */
const { MongoClient, ObjectId } = require('mongodb');

module.exports = addOrder = async (req, res) => {
    const { order } = req.body;
    const { _id, first_name, last_name, mobile } = req.user;

    const client = new MongoClient(process.env.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    const db = client.db(process.env.MONGO_DB);
    console.info(`Database connected...!`)

    try {
        var orderObj = {
            orderId: order.id,
            user: ObjectId(_id),
            name: first_name.concat(" ", last_name),
            telephone: mobile,
            item_ref: ObjectId(order.item.value),
            status: "Initiated",
            quantity: Number(order.qty),
            updatedAt: new Date(),
            createdAt: new Date(),
        }

        let insertedOrder = await db.collection('orders').insertOne(orderObj)

        let item = await db.collection('items').find({ _id: ObjectId(order.item.value) }).toArray()

        await Promise.all(item.map(async e => {
            var purchaseObj = {
                user: ObjectId(_id),
                order_ref: ObjectId(insertedOrder.insertedId),
                item: e.name,
                item_code: e.item_code,
                brand: e.brand,
                quantity: Number(order.qty),
                price: Number((Number(e.price) * Number(order.qty)).toFixed(2))
            }

            await db.collection('purchaseorders').insertOne(purchaseObj)
        }))

        client.close()
        res.status(200).send(`The order created successfully...!`)
    } catch (error) {
        console.log(error)
        client.close()
    }
}