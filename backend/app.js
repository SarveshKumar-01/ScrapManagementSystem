//imports
const express = require('express');
const app = express()

// const PORT = 5000;
const PORT = process.env.port || 5000;

// const data = require("./data.js");
const mongoose = require("mongoose");
const {mongoUrl} = require("./keys");
const cors = require("cors");

const path = require("path") 

app.use(cors())
require('./modals/user');
require('./modals/Computer');



app.use(express.json())
app.use(require('./routes/auth'));
app.use(require('./routes/activity'));




mongoose.connect(mongoUrl);

mongoose.connection.on("connected" , () => {
    console.log("Connected to MongoDB");
})


mongoose.connection.on("error" , () => {
    console.log("Not Connected to MongoDB");
})



app.listen(PORT , ()=> {
    console.log("Server is running on "+ PORT);
});

