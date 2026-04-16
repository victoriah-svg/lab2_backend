/*Importerar paket */
const express = require("express");
require('dotenv').config(); // för att kunna läsa in data från env-filen
const cors = require("cors");

//Läser in routes
const workExperiencesRoutes = require("./routes/workexperiences")

// Skapar Express-instans
const app = express();

// Middlewares för att tillåta anslutning från andra domäner - cors - och för att parsa-JSONbody
app.use(cors());       
app.use(express.json());  

//Route
app.use("/workexperiences", workExperiencesRoutes);



//Startar applikationen
app.listen(process.env.PORT, ()=>{ //vilken port den ska lyssna på, tas från env-filen, 3000
    console.log("Server startad på http://localhost:" + process.env.PORT); 
});