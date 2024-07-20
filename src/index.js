const express = require("express");
const app = express();
// const path = require("path");
// const cookieParser = require("cookie-parser"); // used later for verification
require("dotenv").config();

const PORT = process.env.PORT || 5000;

app.use(express.json());
// app.use(cookieParser());  // used later for verification
app.use(express.urlencoded({ extended: true }));

app.use("", require("./routes/routes"));

app.listen(PORT,(error)=>{
    if (error) throw error;
});