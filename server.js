/*Importerar paket */
const express = require("express");
const { Client } = require("pg"); // för pg-paketet
require('dotenv').config(); // för att kunna läsa in data från env-filen
const cors = require("cors");

// Skapar Express-instans
const app = express();

// Middlewares för att tillåta anslutning från andra domäner - cors - och för att parsa-JSONbody
app.use(cors());       
app.use(express.json());  

//anslutning till databas
const client = new Client({
    //dessa läses in från env-filen
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    // detta måste finnas med för gratisvariant av postgre , inte krypterad med ssl
    ssl: {
        rejectUnauthorized: false,
    },
});

//ansluter till db
client.connect((err) => {
    if(err) {
        console.log("Connection error: " + err);
    } else {
        console.log("Connected to database!");
       
    }
});

//Startar applikationen
app.listen(process.env.PORT, ()=>{ //vilken port den ska lyssna på, tas från env-filen, 3000
    console.log("Server startad på http://localhost:" + process.env.PORT); 
});