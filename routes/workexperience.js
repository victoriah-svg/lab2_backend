const express = require("express");
const client = require("../db");
const router = express.Router();

router.get("/", async(req, res)=>{
    try{
        //SQL-query för att hämta alla rader från tabellen
        const workexperience = await client.query(`
            SELECT * FROM workexperience
            `);
            //return alla rader som hämtats
            return res.json(workexperience.rows);
    }catch(error){
        //statuskod 500, fel på servern och felmeddelande 
        res.status(500).json({error: "could not get workexperiences"});
    }
});

router.post("/", async(req, res)=>{
    //data som läses in från request
    const {companyname, jobtitle, location } = req.body;

    // om companyname, jobtitel eller location inte medskickat, returnera status och meddelande
    if(!companyname || !jobtitle || !location){
        //status 400 för bad request, från klientsidan och meddelande vad som fattas
        return res.status(400).json({message: "You have to specify comanyname, jobtitle and location"});
    }

    try{
        const result = await client.query(
            `INSERT INTO workexperience (companyname, jobtitle, location) VALUES ($1, $2, $3)`, [companyname, jobtitle, location]
        );

        return res.json(result);
    }catch(error){
        res.status(500).json({message: "Could not insert workexperience"});
    }
})

module.exports = router;