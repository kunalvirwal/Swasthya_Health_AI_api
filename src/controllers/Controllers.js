// Here the source code for the business logic of the routes
const utils = require("../utils/Utils")

async function getHomeRecommendations(req,res){
    let query = ""  // change according to the user
    const vids = await utils.getVideos(query)
    res.status(200).json({items:vids})
}

module.exports = {
    getHomeRecommendations,
}