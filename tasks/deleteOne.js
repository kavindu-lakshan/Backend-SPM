/**
 * @file This file defines for delete one data 
 * @author Bhanuka Chathuranga
 */
const { MongoClient } = require('mongodb');
// const client = require('../config/config');

module.exports = async function deleteOne(collectionName, query, cb) {
    const client = new MongoClient(process.env.DATABASE, { useUnifiedTopology: true });
    try {
        await client.connect();
        const db = client.db(process.env.MONGO_DB);
        console.info(`Database connected...!`)
        const collection = db.collection(collectionName);
        const searchCursor = await collection.deleteOne(query);
        // const result = await searchCursor.toArray();
        // console.table(result)
        cb(null, searchCursor)

    } catch (error) {
        console.error(error)
        cb(error, null)
    } finally {
        console.log('Db is disconnected...!');
        client.close();
    }
}