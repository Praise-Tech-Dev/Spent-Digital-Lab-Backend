//importing express
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db.js");
const appRouter = require("./routes.js");
const StatusCodes = require("./utils/statusCodes.js");

connectDB();

// Initialize Express app
const app = express();

const allowedOrigins = [
    "https://spent-digital-labs.vercel.app/",
    "http://localhost:5173" 
];
app.use(cors({
origin: function (origin, callback){
if(!origin || allowedOrigins.includes(origin)){
    return callback(null, true)
}
return callback(new Error("CORS policy violation: unallowed origin"))
},
credentials: true,
}));



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