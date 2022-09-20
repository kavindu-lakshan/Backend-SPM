const ShippingItem = require('../Models/shipping_item');
const DB = require('../dbConfig')

const items = [
    {
        item:'63190a7d68ab4d21a0dbd92b',
        qty:10,
        price:1000,
        address:'Sewanagal, Embilipitiya'
    },
    {
        item:'63190ad768ab4d21a0dbd930',
        qty:5,
        price:2000,
        address:'Deniyaya, Matara',
        status:'pending'
    },
    {
        item:'63190ad768ab4d21a0dbd930',
        qty:5,
        price:2000,
        address:'Maharagam, Colombo 03'
    },
    {
        item:'6319f3a246ee9f23a4e3a7dc',
        qty:5,
        price:2000,
        address:'Galle',
        status:'shipped'
    }
]

const saveItem = async()=>{
    try{
        for (const x of items) {
           await ShippingItem.create(x)
        }
    }catch (e){

    }
    closeDatabase()
}

const closeDatabase = () => {
    DB.disconnect().then(() => {
        console.log('database connection close')
    })
}

saveItem()

