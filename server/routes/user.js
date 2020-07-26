const express = require("express");
var router = express.Router();
const DBUsersUtils = require("../utils/DBUsers"); 
const recipeDataUtils = require("../utils/recipesData"); 
const DBUsers = require("../utils/DBUsers");

//check if there is a valid connected user for incoming requests
router.use(async (req, res, next) => {
    try{
        if(req.session && req.session.id){
            const id = req.session.id;
            const user = await DBUsersUtils.findUserInDBById(id); 
            if(user){
                req.user = user;
                next();
            }
        }
        else{
            res.sendStatus(401); //unautorized
        }
    }
    catch(error){
        res.sendStatus(401); //unautorized

    }
});


router.get("/getUserInfo", async (req, res)=>{
    try{
        const details = await DBUsersUtils.getUserInfo(req.user.username); 
        res.status(200).send({user: details[0]});
    }
    catch(error){
        res.sendStatus(400); //bad request
    }
});

//get info about watched/favorite recipes of user 
router.get("/getRecipeInfo/ids/:ids", async (req, res)=> {
    try{
    const ids = JSON.parse(req.params.ids); //JSON.parse converts array of strings to array of integers of the ids.
    const username = req.user.username;
    let promises = [];
    let info = {};
    ids.map((recipeId) => {
        let promise = DBUsersUtils.getUserInfoAboutRecipe(username, recipeId) //userRecipesData is - id of recipe and the values: watched & saved
        .then((value) => {
            info[recipeId] = value;
        });
        promises.push(promise);
       
    });
    await Promise.all(promises);
    res.status(200).send(info);
    }
    catch(error){
        res.sendStatus(400); //bad request
    }
});

router.get("/getPersonalRecipes", async (req, res)=> {
   try{
    const personalRecipes = await DBUsersUtils.getPersonalRecipes(req.user.username);
    res.status(200).send({recipes: personalRecipes});
   }
   catch(error){
       res.sendStatus(400); //bad request
   }
});

router.get("/getPersonalRecipeFullDetails/recipeId/:recipeId", async(req, res)=> {
    try{
        const personalRecipe =await DBUsersUtils.getPersonalRecipeFullDetails(req.user.username, req.params.recipeId);
        res.status(200).send({recipe: personalRecipe});
    }
    catch(error){
        res.sendStatus(400); //bad request
    }
    
});

router.get("/getFamilyRecipes", async (req, res)=> {
    try{
        const familyRecipes = await DBUsersUtils.getFamilyRecipes(req.user.username)
        res.status(200).send({recipes: familyRecipes});
    }catch(error){
        res.sendStatus(400); //bad request
    }
    
});

router.get("/getFamilyRecipeFullDetails/recipeId/:recipeId", async (req, res)=> {
    try{
        const familyRecipe = await DBUsersUtils.getFamilyRecipeFullDetails(req.user.username,  req.params.recipeId);
        res.status(200).send({recipe: familyRecipe});
    }catch(error){
        res.sendStatus(400); //bad request
    }
});

router.get("/getFavoriteRecipes", async (req, res)=> {
    try{
        const favoriteRecipesIds = await DBUsersUtils.getFavoriteRecipes(req.user.username);
        let recipesIds = []; 
        for(let i=0; i<favoriteRecipesIds.length; i++){
            recipesIds.push(favoriteRecipesIds[i].id);
        }
        const favoriteRecipes = await recipeDataUtils.getRecipesPreview(recipesIds); 
        res.status(200).send({recipes: favoriteRecipes});
    }
    catch(error){
        res.status(401); //Unauthorized
    }
});

router.post("/addToFavorites", (req, res)=> {
    const { recipeId } = req.body;
    DBUsersUtils.addToFavorites(req.user.username, recipeId); 
    res.status(201).send({ message: "recipe added to your favorites successfully"});
});

router.post("/addToWatchedRecipes", (req, res)=> {
    const { recipeId } = req.body;
    DBUsersUtils.addRecipeToWatchedRecipes(req.user.username, recipeId);
    res.status(201).send({ message: "recipe added to your whatched recipes successfully"});
});

router.get("/getThreeRecentlyWachedRecipes", async (req, res)=> {
    try{
        const watchedRecipes = await DBUsersUtils.getThreeRecentlyWachedRecipes(req.user.username);
        idsList = []; 
        watchedRecipes.map((recipe)=>{
            idsList.push(recipe.recipeId);
        });
        const watchedRecipesPreview = await recipeDataUtils.getRecipesPreview(idsList);
        res.status(200).send({recipes: watchedRecipesPreview});
    }catch(error){
        res.status(400); //bad request
    } 
});

router.post("/logout", function (req, res) {
    req.session.reset(); // reset the session info --> send cookie when req.session == undefined!!
    res.send({ success: true, message: "logout succeeded" });
});


module.exports = router;