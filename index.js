const express = require("express");
const app = express();
const port = 8000;
const expressLayouts = require("express-ejs-layouts");
const path = require("path");
const db = require("./config/mongoose");
const passport = require("passport");
const LocalStrategy = require("./config/passport-local-strategy");
const session = require('express-session');
const env = require("./config/environment");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const flashMiddleware = require("./middleware/flashMiddleware");

// Encoding from data
app.use(express.urlencoded({
    extended: false
}))

// Setting up View Engine and Views folder
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static(path.join(__dirname,"./public")));

// Setting up Layouts Configuration
app.use(expressLayouts);
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

// Configuring Session
app.use(session({
    name: "weboconnect",
    secret: env.secret,
    saveUninitialized: false,
    resave: false,
    cookie: { maxAge: (1000 * 60 * 100)},
    store: MongoStore.create({
        mongoUrl: env.db,
        autoRemove: 'native'
    })
}));

// Configuring Flash System
app.use(flash());

// Initializing Passport and It's session
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use(flashMiddleware.setFlash);




// Using the router
app.use("/", require("./routes/router"));

// Listening to the server
app.listen(process.env.PORT || port, function(err){
    if(err){
        return console.log("Error in running server");
    }

    console.log("Server is up and running at port:", process.env.PORT || port);
})