const User = require("../../Models/user_model");
const catchAsync = require("../../Utils/catchAsync");
const sendEmail = require("../../Utils/email");
const Filter = require('../../Utils/Filters')


exports.createStaff = catchAsync(async (req, res, next) => {
    req.body.password = Math.random().toString(16).substr(2, 8);

    let URL = 'http://localhost:8081/#/';

    const message = `<p>You have register to the system by system admin. Now you can log in to our system using this <b>(${req.body.password})</b> temporary
    password. After first login attempt please make sure change your password and update your profile. 
    Using below link you can log in.<div><a href= ${URL} >EyePaX</a></div></p>`;

    const newUser = await User.create(req.body);

    await sendEmail({
        email: req.body.email,
        subject: 'Congrats you are being a member of EyePaX Company!!',
        message:message
    });
    res.status(201).json({
        status: "success",
        data: {
            newUser,
        },
    });
});


//get all Staff
exports.allStaff = catchAsync(async (req, res, next) => {
    let Respond = new Filter(User.find(), req.query).filter().sort().limitFields().paginate();
    const users = await Respond.query;
    res.status(201).json({
        status: "success",
        data: {
            users,
        },
    });
});


//update Staff
exports.updateStaff = catchAsync(async (req, res, next) => {
    req.body.user = req.user
    let all_Users = await User.findByIdAndUpdate(req.params.id,req.body)
    res.status(201).json({
        status: "success",
        data: {
            all_Users,
        },
    });
});


//delete Staff
exports.deleteStaff = catchAsync(async (req, res, next) => {
    let deletedUser = await User.findByIdAndDelete(req.params.id)
    res.status(200).json({
        status: "success",
        data: {
            deletedUser,
        },
    });
});
