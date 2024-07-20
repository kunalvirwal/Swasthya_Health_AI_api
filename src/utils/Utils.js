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

module.exports = {
    getVideos,
}