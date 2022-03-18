const express = require("express");
const app = express();
const port = 8000;
const expressLayouts = require("express-ejs-layouts");
const path = require("path");
require('dotenv').config()

// Setting up View Engine and Views folder
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static(path.join(__dirname,"./public")));

// Setting up Layouts Configuration
app.use(expressLayouts);
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

// Using the router
app.use("/", require("./routes/router"));

// Listening to the server
app.listen(process.env.PORT || port, function(err){
    if(err){
        return console.log("Error in running server");
    }

    console.log("Server is up and running at port:", process.env.PORT || port);
})