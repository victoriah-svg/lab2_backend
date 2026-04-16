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
            `INSERT INTO workexperience (companyname, jobtitle, location) 
            VALUES ($1, $2, $3) RETURNING *`, [companyname, jobtitle, location]
        );

        return res.json(result.rows[0]);
    }catch(error){
        res.status(500).json({message: "Could not insert workexperience"});
    }
});

router.put("/:id", async (req, res)=>{
    const companyname = req.query.companyname;
    const jobtitle = req.query.jobtitle;
    const location = req.query.location;

    try{
        if(companyname){
            const result = await client.query(
            `UPDATE workexperience SET companyname= $1 WHERE id= $2 RETURNING *`, [companyname, req.params.id]
        );

         res.json(result.rows[0]);
        }

        if(jobtitle){
            const result = await client.query(
            `UPDATE workexperience SET jobtitle= $1 WHERE id= $2 RETURNING *`, [jobtitle, req.params.id]
        );

        res.json(result.rows[0]);
        }

        if(location){
            const result = await client.query(
            `UPDATE workexperience SET location= $1 WHERE id= $2 RETURNING *`, [location, req.params.id]
        );
        res.json(result.rows[0]);
        }
        return res.json(result.rows[0]);
        

    }catch(error){
        res.status(500).json({message: "Could not update workexperience"});
    }

});

router.delete("/:id", async (req, res)=>{
    try{
        const result = await client.query(
        `DELETE FROM workexperience WHERE id= $1`, [req.params.id] 
    );

        return res.json({ message: "workexperience deleted"});
    }catch(error){
        res.status(500).json({message: "could not delete workexperience"});
    }
    
});

module.exports = router;