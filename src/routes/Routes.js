const express = require("express");
const router = express.Router();
const controllers = require("../controllers/Controllers")
require("dotenv").config()


router.get("/", (req,res) => {
    controllers.getHomeRecommendations(req,res);
});

router.post("/LLM", (req,res) => {
    controllers.getAnswers(req,res);
});

router.post("/signup", (req,res) => {
    controllers.createUserandJWT(req,res);
});



module.exports = router;