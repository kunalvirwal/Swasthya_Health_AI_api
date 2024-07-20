// Here the source code for the business logic of the routes
const utils = require("../utils/Utils")

async function getHomeRecommendations(req,res){
    let list = ["bikes"]
    let query = list.join(" ")  // change according to the user
    const vids = await utils.getVideos(query)
    const articles = await utils.getArticles(list)
    res.status(200).json({items:vids,articles:articles})
}

module.exports = {
    getHomeRecommendations,
}