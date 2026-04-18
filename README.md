# Laboration 2 - Backend-baserad Webbutveckling Mittuniversitetet 

## 🌟 Syfte

Detta repository innehåller kod för ett första enkelt REST API byggt med NodeJs och Express. APIet hanterar jobberfarentheter för ett CV och använder en PostgreSQL-databas för lagring. Funktionalitet för CRUD(Create, Read, Update och Delete) har implementerats. 


##  Installation

1. Klona repositoryt

2. Gå in i projektmappen

3. Installera npm-paket:
npm install

4. Kör install-script som ligger i install.js:
node install.js

5. Detta skapar tabellen workexperience med fälten 
-id (SERIAL PRIMARY KEY)
-companyname (TEXT NOT NULL)
-jobtitle (TEXT NOT NULL)
-location (TEXT NOT NULL)

6. Starta servern:
npm run dev

## Användning

|Metod | Ändpunkt        |           Beskrivning                                     |
-------|-----------------|-----------------------------------------------------------|
GET    | /workexperience     | Hämtar alla jobberfarenheter                              |
POST   | /workexperience     | Lägger till ny jobberfaranhet som skickas med som objekt  |
PUT    | /workexperience/:id | Uppdaterar jobberfarenhet med specifikt id som skickas med. Objekt med jobberfarenhet måste skickas med |
DELETE | /workexperience/:id | Tar bort jobberfarenhet med ett specifikt id |



#### 🌟 Länk till live-version av API:et:
länk https://lab2-backend-ll5z.onrender.com/workexperience

