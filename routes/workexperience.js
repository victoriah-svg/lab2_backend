const express = require("express");
//hämtar connection till databasen som exporteras från db.js och sparar i variabeln client
const client = require("../db");
//Router
const router = express.Router();

//Routes

//Hämta alla rader
router.get("/", async (req, res) => {
    try {
        //SQL-query för att hämta alla rader från tabellen
        const workexperience = await client.query(`
            SELECT * FROM workexperience
            `);
        //return alla rader som hämtats
        return res.json(workexperience.rows);
    } catch (error) {
        //statuskod 500, fel på servern och felmeddelande 
        res.status(500).json({ error: "could not get workexperiences" });
    }
});

//lägga till rad
router.post("/", async (req, res) => {
    //data som läses in från request
    const { companyname, jobtitle, location } = req.body;
    

    // om companyname, jobtitel eller location inte medskickat, returnera status och meddelande
    if (!companyname || !jobtitle || !location) {
        //status 400 för bad request, från klientsidan och meddelande vad som fattas
        return res.status(400).json({ message: "You have to specify comanyname, jobtitle and location" });
    }

    try {
        /*SQL-query för att sätta in rad i tabellen med uppgifter som skickats med*/
        const result = await client.query(
            `INSERT INTO workexperience (companyname, jobtitle, location) 
            VALUES ($1, $2, $3) RETURNING *`, [companyname, jobtitle, location]
        );
        /*Returnera raden som satts in */
        return res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: "Could not insert workexperience" });
    }
});

//ändra rad
router.put("/:id", async (req, res) => {
    /*Den data som skickats med i query params*/
    const companyname = req.query.companyname;
    const jobtitle = req.query.jobtitle;
    const location = req.query.location;

    // om companyname, jobtitel eller location inte medskickat, returnera status och meddelande
    if (!companyname || !jobtitle || !location) {
        //status 400 för bad request, från klientsidan och meddelande vad som fattas
        return res.status(400).json({ message: "You have to specify comanyname, jobtitle and location" });
    }

    try {
        const result = await client.query(
            `UPDATE workexperience SET companyname= $1,
            jobtitle= $2,
            location= $3 WHERE id= $4 RETURNING *`, [companyname, jobtitle, location, req.params.id]
        );
        return res.json(result.rows[0]);


    } catch (error) {
        res.status(500).json({ message: "Could not update workexperience" });
    }

});

//ta bort rad
router.delete("/:id", async (req, res) => {
    try {
        //Ta bort rad som har id som skickats med
        const result = await client.query(
            `DELETE FROM workexperience WHERE id= $1`, [req.params.id]
        );

        return res.json({ message: "workexperience deleted" });
    } catch (error) {
        res.status(500).json({ message: "could not delete workexperience" });
    }

});

//exporterar router
module.exports = router;