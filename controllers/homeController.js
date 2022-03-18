module.exports.home = function(req, res){
    return res.render("home", {
        title: "Homepage",
        active: "homepage"
    })
}

module.exports.login = function(req, res){

    if(req.isAuthenticated()){
        return res.redirect("/");
    }

    return res.render("login", {
        title: "Login",
        active: "login"
    })
}

module.exports.register = function(req, res){

    if(req.isAuthenticated()){
        return res.redirect("/");
    }

    return res.render("register", {
        title: "Register",
        active: 'register'
    })
}

module.exports.logout = function(req, res){
    req.logout();
    return res.redirect("/login");
}