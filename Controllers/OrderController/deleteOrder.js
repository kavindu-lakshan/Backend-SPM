const { ObjectId } = require('mongodb');
var deleteOne = require('../../tasks/deleteOne')

module.exports = deleteOrder = (req, res) => {
    const { id } = req.params;

    console.log(req.params)

    deleteOne('orders', { "_id": ObjectId(`${id}`) }, (err, result) => {
        if (err) {
            res.staus(err.status).send(err.msg);
        }
        res.status(200).send(result);
    })
}