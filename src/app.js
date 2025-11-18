//importing express
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db.js");
const appRouter = require("./routes.js");
const StatusCodes = require("./utils/statusCodes.js");

connectDB();

// Initialize Express app
const app = express();

// Middleware (Helper that run before your routes )
app.use(cors());
app.use(express.json());

//Test Route
app.get("/", (req, res) => {
    res.send("Backend server is running ...")
})

app.use("/api", appRouter);


app.use((_req, res)=>{
    res.status(StatusCodes.NOT_FOUND).send({
        message: "Route Not Found"
    });
});

//export app
module.exports = app;