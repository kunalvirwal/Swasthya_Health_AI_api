// Here the source code for the business logic of the routes
const utils = require("../utils/Utils")
require("dotenv").config();
const bcrypt = require('bcrypt');


async function getHomeRecommendations(req,res){
    let list = ["bikes"]   ////////////////////////////// change according to the user
    let query = list.join(" ")  //////////////////////////////// change according to the user
    const vids = await utils.getVideos(query)
    const articles = await utils.getArticles(list)
    res.status(200).json({videos:vids,articles:articles})
}
let chat_history=""////// save this for every user  // make a route to refresh this
let chat_history_summary=""    ////// save this for every user

async function getAnswers(req,res){
    const query = req.body.query

    let output = await utils.talkToLlama(query,chat_history_summary)
    console.log(query+"\n")
    chat_history+=("User:"+query+"\n")
    console.log((output.choices[0]?.message?.content || "")+"\n\n")
    chat_history+=("Assistant:"+(output.choices[0]?.message?.content || "")+"\n")
    chat_history_summary = (await utils.summariseChat(chat_history)).choices[0]?.message?.content || ""
    console.log("\n\n\nsummary:"+chat_history_summary+"\n\n\n")

    res.status(200).json(output)
}

async function createUserandJWT(req,res){
    if (!req.body || !req.body.name || !req.body.email || isNaN(req.body.age) || req.body.email.trim().length==0 || req.body.name.trim().length==0 ||  req.body.age<0 || (req.body.gender!=0 && req.body.gender!=1) || req.body.password.trim().length==0){
        return res.status(400)
    }


    const details={
        name:req.body.name.trim(),
        email:req.body.email.trim(),
        password: await utils.saltNhash(req.body.password),
        gender: req.body.gender,
        age: req.body.age,
        description:req.body.description.trim(),
        
    }
    
    let result = await utils.dbQuery(`SELECT * FROM USERS WHERE EMAIL=?;`, [details.email.trim()])
    if (result.length >0){
        return res.status(400)
    } else {
        result = await utils.dbQuery(`INSERT INTO USERS VALUES(NULL,?,?,?,?,?,?,?)`, [details.name, details.email, details.age , details.password, details.gender,details.description,""]);
        result = await utils.dbQuery(`SELECT * FROM USERS WHERE EMAIL=?;`, [details.email]);
        const user = result[0]
        const token= utils.generateJWT(user)
        return res.status(201).json({token,token})
    }


    res.status(200).json(details)

}

module.exports = {
    getHomeRecommendations,
    getAnswers,
    createUserandJWT,
    
}