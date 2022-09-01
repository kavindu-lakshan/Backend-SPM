const express = require("express");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const cors = require("cors");
const compression = require('compression')

const AuthController = require('./Routes/auth_routes')
const AdminStaff = require('./Routes/AdminRoutes/staff_routes')
const AppError = require("./Utils/AppError");

const app = express();

// Configure the cors
const app_url = process.env.APP_URL
app.use(
    cors({
        origin: '*',
        credentials: true,
    })
);


// GLOBAL MIDDLEWARES

// Set security HTTP headers
app.use(helmet());

// Limit requests from same API
const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 10,
    message: "Too many requests from this IP, please try again in an hour!",
});
app.use("/api", limiter);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: "10kb" }));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(
    hpp({
        whitelist: [
            "title",
            "description",
            "ratingsAverage",
            "maxGroupSize",
            "difficulty",
            "price",
        ],
    })
);

app.use(compression())
const base = '/api/v1'

app.use(`${base}/auth`, AuthController);
app.use(`${base}/admin`, AdminStaff);
// app.use(`${base}/notices`, noticeRouter);
// app.use(`${base}/admin`, adminRouter);

app.all("*", (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

module.exports = app;
