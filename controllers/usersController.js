const User = require("../models/users");


module.exports.profile = function(req, res){
    return res.render("profile",{
        title: "Profile",
        active: 'profile'
    })
}

module.exports.createSession = function(req, res){
    req.flash("success",'Logged in successfully');
    return res.redirect("/users/profile");
}

module.exports.confirmRegistration = async function(req, res){
    try{
        if(req.body.password !== req.body.confirm_password){
            req.flash("error",'Password and Confirm Password should be same');
            return res.redirect("back");
        }

        let user = await User.findOne({email: req.body.email});

        if(user){
            req.flash("error",'User already exists with this email');
            return res.redirect("back");
        }

        await User.create(req.body);

        req.flash("success",'Account created successfully');
        return res.redirect("/login");
    }catch(err){
        return console.log(err);
    }
}