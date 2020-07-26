const express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt");
const DBUsersUtils = require("../utils/DBUsers");
const DButils = require("../modules/DButils");


router.post("/register",async (req, res, next) => {
    try {
      // valid parameters and username exists
      let isExist = await DBUsersUtils.isExistUser(req.body.username);
      if (isExist)
        res.status(409).send({message: "Username is already taken"});
      else{
        let hash_password = bcrypt.hashSync(
          req.body.password,
          parseInt(process.env.bcrypt_saltRounds)
        );
        // add the new username
        DBUsersUtils.setNewUserInDB(req.body.username, req.body.firstName, req.body.lastName, req.body.country, hash_password, req.body.email, req.body.profilePicture);
        res.status(201).send({ message: "user created", success: true });
      }
    } catch (error) {
        next(error);
    }
  });
  
  //login
  router.post("/login", async (req, res) => {
    try {
      // check that username exists
      const user = await DBUsersUtils.findUserInDB(req.body.username);

      // check that the password is correct
      let match = await DBUsersUtils.validatePassword(req.body.password, user.password);
      if (!match){
        res.status(401).send({ message: "Username or Password incorrect"});
      }
      else{
        // Set cookie
        req.session.id = user.userId;
        // req.session.save();
        // res.cookie(session_options.cookieName, user.user_id, cookies_options);
        // return cookie
        res.status(200).send({ message: "login succeeded", success: true });
      }
    } catch (error) {
        next(error);
    }
  });
  
  module.exports = router;