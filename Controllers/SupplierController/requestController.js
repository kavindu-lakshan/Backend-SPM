const Request = require('../../Models/requestModel')
const catchAsync = require("../../Utils/catchAsync");
const Filter = require('../../Utils/Filters')

//Create request
exports.Store = catchAsync(async (req, res, next) => {
    req.body.supplier_id = req.user
    const newItem = await Item.create(req.body)
    res.status(201).json({
        status: 'success',
        data: {
            group: newItem
        }
    });
})


//Get all requests
exports.AllRequests = catchAsync(async (req, res, next) => {
    let Respond = new Filter(Request.find({ supplier_id: req.user.id }), req.query).filter().sort().limitFields().paginate();
    const requests = await Respond.query;
    res.status(201).json({
        status: "success",
        data: {
            requests,
        },
    });
});

// exports.AllRequestsToDropDown = catchAsync(async (req, res, next) => {
//     let Respond = new Filter(Request.find(), req.query).filter().sort().limitFields().paginate();
//     const requests = await Respond.query;
//     res.status(201).json({
//         status: "success",
//         data: {
//             requests,
//         },
//     });
// });


//Update request
exports.UpdateRequest = catchAsync(async (req, res, next) => {
    console.log(req.body)
    console.log(req.params.id)
    let all_Requests = await Request.findByIdAndUpdate(req.params.id,req.body)
    res.status(201).json({
        status: "success",
    });
});

exports.getRequest = catchAsync(async (req, res, next) => {
    let Request1 = await Request.findById(req.params.id)
    res.status(201).json({
        status: "success",
        data: {
            Request1,
        },
    });
});

//Delete request
exports.DeleteItem = catchAsync(async (req, res, next) => {
    let deleteItem = await Item.findByIdAndDelete(req.params.id)
    res.status(200).json({
        status: "success",
        data: {
            deleteItem,
        },
    });
});
