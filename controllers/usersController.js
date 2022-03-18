const User = require("../models/users");


module.exports.profile = function(req, res){
    return res.render("profile",{
        title: "Profile",
        active: 'profile'
    })
}

module.exports.editProfile = function(req, res){
    return res.render("editProfile", {
        title: "Edit Profile",
        active: "profile"
    })
}

module.exports.updateProfile = async function(req,res){
    try{
        if(req.body.password !== req.body.confirm_password){
            req.flash("error",'Password and Confirm Password should be same');
            return res.redirect("back");
        }

        await User.findOneAndUpdate({email: req.body.email}, req.body);

        req.flash("success",'Details updated successfully');
        return res.redirect("/users/profile");
    }catch(err){
        return console.log(err);
    }
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

module.exports.deleteAccount = async function(req, res){
    await req.user.remove();
    req.flash("success", "Account deleted successfully");
    return res.redirect("/");
}