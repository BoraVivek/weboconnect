const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/users");
const bcrypt = require("bcrypt");

// Configuring the Local Strategy
passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true,
}, function(req, email, password, done){
    User.findOne({email: email}, function(err, user){
        if(err){
            req.flash("error",'Error in connecting with DB');
            return done(err);
        }

        if(!user || !bcrypt.compareSync(password, user.password)){
            req.flash("error","Email/Password don't match");
            return done(null, false);
        }

        return done(null, user);
    })
}));

// Serializing User
passport.serializeUser(function(user, done){
    done(null, user.id);
});

// De-serializing User
passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        if(err){
            return done(err);
        }

        if(!user){
            return done(null, false);
        }

        return done(null, user);
    });
});

// Checks Authentication - Middleware
passport.checkAuthentication = function(req,res, next){
    if(req.isAuthenticated()){
        return next();
    }

    return res.redirect('/login');
}

// Set Authenticated User to the Views - Middleware
passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }

    return next();
}

module.exports = passport;