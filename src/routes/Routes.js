const express = require("express");
const router = express.Router();
const controllers = require("../controllers/Controllers")
require("dotenv").config()


router.get("/", (req,res) => {
    controllers.getHomeRecommendations(req,res);
});

module.exports = router;