// console.log("Server.js file is running...");


//importing required packages
require("dotenv").config();
const app = require("./src/app.js");


//port
const PORT = process.env.PORT || 8080;

app.listen(PORT, ()=>{
    console.log(`Server is running at http://localhost:${PORT}`);
})