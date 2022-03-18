const express = require("express");
const router = express.Router();
const passport = require("passport");
const usersController = require("../controllers/usersController");

router.get("/profile", passport.checkAuthentication ,usersController.profile);
router.get("/profile/edit",passport.checkAuthentication , usersController.editProfile);


router.post("/create-session", passport.authenticate("local", {
    failureRedirect: "/login"
}) ,usersController.createSession);
router.post("/confirm-registration", usersController.confirmRegistration);
router.post("/update-profile", passport.checkAuthentication , usersController.updateProfile);
router.post("/delete-account", passport.checkAuthentication , usersController.deleteAccount);

module.exports = router;