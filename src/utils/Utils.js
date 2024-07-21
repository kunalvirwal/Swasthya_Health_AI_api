const axios = require("axios");
require("dotenv").config();

const Groq = require("groq-sdk");
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const dbConn = require("../models/database")
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');


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
    vids.forEach((val) => {
    val["thumbnails"]=val["thumbnails"]["medium"]["url"]
    });

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

async function talkToLlama(query, chat_summary){
    return groq.chat.completions.create({
        messages: [
            {
                role: "system",
                content: "1)You are a phone based informational medical assistant. You have to answer users doubts related to their medical queries or in a related domain to medicine. You have to give honest clear responses to a users query but at the same time do not scare them by straight away diagnosing any big medical situation. \n2) You have to state your diagnosis by asking for some information from the user over some query and suggest possible solutions, meanwhile still recommending them to visit a doctor and don't completely rely on an online diagnosis. \n 3) Try to tell your diagnosis after each query and narrow it down fast ",
            },
            {
                role: "user",
                content: ("Chat history:"+chat_summary+"\n The next query is:\n"+query),
            },
        ],
        model: "llama3-8b-8192",
        temperature: 1.2,
      });
}

async function summariseChat(chat){
    return groq.chat.completions.create({
        messages: [
            {
                role: "system",
                content: "You are a chat summariser. You summarise the chat between a user and an LLM medical assistant so that the summary can be used as conversation context for the assistant. Thus the summary has to be highly fact based and focus on minute informations provided by the user and be as concise as possible.Try to prevent any loss of information",
            },
            {
                role: "user",
                content: ("Chat history:"+chat+"\n\n Create a highly fact based summary and focus on minute informations provided by the user and be as concise as possible such that it can be used as conversation context."),
            },
        ],
        model: "llama3-8b-8192",
      });
}

function dbQuery(query, param = []) {
    return new Promise((resolve, reject) => {
        dbConn.query(query, param, (err, res) => {
            if (err) return reject(err);
            resolve(res)
        })
    })
}

function generateJWT(user) {
    // jwt payload
    data = {
        uuid: user.UUID,
        email: user.EMAIL,
        name: user.NAME,
    };
    return jwt.sign({ data }, process.env.SECRET_KEY, { expiresIn: "1d" });
}

function saltNhash(password) {
    const salt = bcrypt.genSaltSync(10)
    password = bcrypt.hash(password, salt);
    return password
}

module.exports = {
    getVideos,
    getArticles,
    talkToLlama,
    summariseChat,
    dbQuery,
    generateJWT,
    saltNhash,
}