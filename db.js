const { Client } = require("pg"); // för pg-paketet

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
//exporterar client för att kunna anävnda i workexperience.js
module.exports = client;
