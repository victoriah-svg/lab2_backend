/* Installera databasen och generera tabeller
 */

const { Client } = require("pg"); // för pg-paketet
require('dotenv').config(); // för att kunna läsa in data från vår env-fil

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

//ansluter till databasen
client.connect((err) => {
    if(err) {
        console.log("Connection error: " + err);
    } else {
        console.log("Connected to database!");
       createTables(); 
    }
});

// funktion för att skapa tabeller , tar client som vi skapat och kör. query + sql-fråga
async function createTables(){
    try{
    const res = await client.query(
        `
        DROP TABLE IF EXISTS workexperience;
        CREATE TABLE IF NOT EXISTS workexperience (
        id SERIAL PRIMARY KEY,
        companyname TEXT NOT NULL,
        jobtitle TEXT NOT NULL,
        location TEXT NOT NULL
        )
        `
    )
    console.log(res); // för att se vad som skapats
}catch(err){
    //loggar felmeddelanden
    console.error(err);
}finally{
    //stänger när klart
    await client.end()
}
}