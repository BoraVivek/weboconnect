const mongoose = require("mongoose");
const env = require("../config/environment");

mongoose.connect(env.db);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Error Connecting to MongoDB"));

db.on("open", function(){
    console.log("Connected to DB : MongoDB");
})

module.exports = db;