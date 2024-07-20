const axios = require("axios");

require("dotenv").config();

async function getVideos(query){
    // console.log(process.env.PORT)
    const videos = await axios.get("https://www.googleapis.com/youtube/v3/search",{
        params:{
            key: process.env.YOUTUBE_DATA_API_V3_KEY,
            maxResults:10,
            q:query,
            type:"video",
            part:"snippet",
        }
    })
    let vids = videos["data"]["items"].map((val)=> {return val["snippet"]}) 
    return vids
}

async function getArticles(list){
    let query =list.join(" OR ")
    const articles = await axios.get("https://newsapi.org/v2/everything",{
        params:{
            apikey: process.env.NEWSAPI_KEY,
            q:query,
            
        }
    })
    return (articles["data"]["articles"]).slice(0,Math.min(10,articles["data"]["totalResults"]) )
    
}

module.exports = {
    getVideos,
    getArticles,
}