const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
const middleware = require("./middlewares/Middlewares");
require("dotenv").config();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());  
app.use(express.urlencoded({ extended: true }));
app.use("", middleware.authenticate_token);
app.use("", middleware.authorize_user);

app.use("", require("./routes/Routes"));

app.listen(PORT,(error)=>{
    if (error) throw error;
});