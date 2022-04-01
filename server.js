const express = require("express");
const config = require("./config/config.json");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const userController = require("./controller/userController");

// configaration
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());

// db connection
mongoose.connect(config.MONGO_URL).then((data)=>{
    console.log("db conneted");
}).catch((err)=>{
    console.log("no connection");
});

// routes
app.use("/api/users/", require("./routes/users"));

// dashboard route


const port = config.PORT ||8003;
app.listen(port,()=>{
    console.log(`Server is runnning the:${port}`);
});




