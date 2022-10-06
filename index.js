const express = require("express");
const expressConfig = require('./config/express');
const routerConfig = require('./config/routes');
const databaseConfig = require('./config/database');
const Facility = require("./models/Facility");

async function start() {
    const app = express();
    
    await databaseConfig(app);
    expressConfig(app);
    routerConfig(app);
    app.listen(3000 , () => console.log("Everything is good"));
}

start(); 
