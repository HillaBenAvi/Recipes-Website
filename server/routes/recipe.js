const express = require("express");
var router = express.Router();
const axios = require("axios");
const searchRecipeUtils = require("../utils/searchRecipes");
const randomRecipeUtils = require("../utils/randomRecipes");
const recipeDataUtils = require("../utils/recipesData");



router.get("/randomRecipes", (req, res)=> {
    params = {};
    params.number = 3;
    randomRecipeUtils
    .getThreeRandomRecipes(params)
    .then((infoArray)=> res.status(200).send({recipes: infoArray}))
    .catch((error)=> {
        res.sendStatus(500); //internal server error
    });
});


router.get("/search/query/:searchQuery/amount/:number", (req, res)=> {
    const { searchQuery, number } = req.params;
    searchParams = {};
    searchParams.query = searchQuery;
    searchParams.number = number;
    searchParams.instructionsRequired = true;

    searchRecipeUtils.extractQueriesParams(req.query, searchParams);

    searchRecipeUtils
    .searchForRecipes(searchQuery, number, searchParams)
    .then((infoArray)=> res.status(200).send({recipes: infoArray}))
    .catch((error)=> {
        res.sendStatus(500); //internal server error
    });
});


router.get("/displayRecipe/id/:recipeId", (req, res)=> {
    const { recipeId } = req.params;
    let info = recipeDataUtils.getRecipeInfoById(recipeId)
    .then((info)=> res.status(200).send({recipe: info}))
    .catch((error)=> {
        res.sendStatus(500); //internal server error
    });
});



module.exports = router;