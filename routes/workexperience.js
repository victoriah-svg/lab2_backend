const express = require("express");
const client = require("../db");
const router = express.Router();

router.get("/", async(req, res)=>{
    try{
        const workexperience = await client.query(`
            SELECT * FROM workexperience
            `);
            return res.json(workexperience.rows);
    }catch(error){
        res.status(500).json({error: "could not get workexperiences"});
    }
});

module.exports = router;