const express = require("express");
const app = express();
const morgan = require("morgan");
const producerRoutes = require("../api/routes/producers");
const movieRoutes = require("..//api/routes/movies");

//middleware for loging
app.use(morgan("dev"))

//parsing middleware
app.use(express.urlencoded({
    extended: true
}));

//middleware that all request are json
app.use(express.json());

//middleware to handle the Cors policy
app.use((req,res,next) => {
    res.header("Access-Control-Allow-Orgin","*");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With,Content-Type,Accept,Authroization");

    if(req.method === "OPTIONS"){
        res.header("Access-Control-Allow-Methods","POST,PUT,GET,PATCH,DELETE");
    }
    next();
})

app.get("/", (req,res,next) => {
    res.status(201).json({
        message: "Service is up", 
        method: req.method
    });
});

app.use('/producerRoutes',producerRoutes);
app.use('/movieRoutes',movieRoutes);

//add middleware to handle errors and bad url paths
app.use((req,res,next) => {
    const error = new Error("Not Found!");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        error: {
            message: error.message,
            status: error.status
        }
    });
});



module.exports = app;