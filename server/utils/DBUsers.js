
const axios = require("axios");
require("dotenv").config();
const bcrypt = require("bcrypt");
const recipesAPIUrl = "https://api.spoonacular.com/recipes";
const apiKey = "apiKey=86d994e3cdd34379a676d4698eea02c6";
const DButils = require("../modules/DButils");
const recipesDataUtils = require("./recipesData");

//favorite recipe or/and whatched recipe
async function getUserInfoAboutRecipe(username, recipeId){
    const info = {};
    let watchedRecipe = ( await DButils.execQuery(
        `SELECT * FROM dbo.watchedRecipes WHERE username = '${username}' and recipeId = '${recipeId}'`)
    ); 
        let favoriteRecipe = (await DButils.execQuery(
            `SELECT * FROM dbo.favorites WHERE username = '${username}' and id = '${recipeId}'`)
    ); 
    
    if(watchedRecipe.length > 0){
        info.watched = "true";
    }
    else{
        info.watched = "false";
    }
    if(favoriteRecipe.length > 0){
        info.favorite = "true";
    }
    else{
        info.favorite = "false";
    }
    return info;
}

async function findUserInDB(username){
    let isExist = await isExistUser(username);
    if (!isExist){
        throw { status: 401, message: "Username or Password incorrect" };
    }
    const user =(
        await DButils.execQuery(
              `SELECT * FROM dbo.users WHERE username = '${username}'`)
    )[0]; 
    return user;
}

async function findUserInDBById(userId){
    let isExist = await isExistUserId(userId);
    if (!isExist){
        throw { status: 401, message: "Username or Password incorrect" };
    }
    const user =(
        await DButils.execQuery(
              `SELECT * FROM dbo.users WHERE userId = '${userId}'`)
    )[0]; 
    return user;
}

async function isExistUser(userName){
    const users = await DButils.execQuery("SELECT username FROM dbo.users");
    if (!users.find((x) => x.username === userName))
        return false;
    else{
        return true;
    } 
}

async function isExistUserId(userId){
    const users = await DButils.execQuery("SELECT userId FROM dbo.users");
    if (!users.find((x) => x.userId === userId))
        return false;
    else{
        return true;
    } 
}

async function validatePassword(reqPassword, userPassword){
    let match = await bcrypt.compare(reqPassword, userPassword);
    if (match) {
        return true;
    }
    return false; 
}

function setNewUserInDB(userName, firstName, lastName, country, hashPassword, email, profilePicture){
    DButils.execQuery(
        `INSERT INTO dbo.users VALUES (default, '${userName}', '${hashPassword}', '${email}', '${firstName}', '${lastName}', '${profilePicture}', '${country}')`
      );
}

//search dateAndTime function
function addRecipeToWatchedRecipes(username, recipeId){
    DButils.execQuery(
        `INSERT INTO dbo.watchedRecipes VALUES ('${username}', '${recipeId}', GETDATE())`
      );
}

async function getThreeRecentlyWachedRecipes(username){
    const watchedRecipes = await DButils.execQuery(
        `SELECT TOP (3) recipeId FROM dbo.watchedRecipes
         WHERE username = '${username}'  order by watchedTime DESC`);
    return watchedRecipes;
}

async function getPersonalRecipes(username){
    const recipes = await DButils.execQuery(
              `SELECT id, title, readyInMinutes, vegetarian, vegan, glutenFree, 
              image FROM dbo.personalRecipes WHERE username = '${username}'`);
    return recipes;
}

async function getPersonalRecipeFullDetails(username, recipeId){
    const recipes =await DButils.execQuery(
              `SELECT * FROM dbo.personalRecipes WHERE username = '${username}' and id = '${recipeId}'`);
    return recipes;
}

async function getFamilyRecipes(username){
    const recipes = await DButils.execQuery(
        `SELECT id, title, readyInMinutes, vegetarian, vegan, glutenFree, 
        image FROM dbo.familyRecipes WHERE username = '${username}'`);
    return recipes;
}

async function getUserInfo(username){
    const details = await DButils.execQuery(
        `SELECT username, firstName, lastName, email, profilePicture, country FROM dbo.users WHERE username = '${username}'`);
    return details; 
}

async function getFamilyRecipeFullDetails(username, recipeId){
    const recipes = await DButils.execQuery(
        `SELECT * FROM dbo.familyRecipes WHERE username = '${username}' and id = '${recipeId}'`);
    return recipes;
}

async function getFavoriteRecipes(userName){
    const recipes = await DButils.execQuery(
        `SELECT id FROM dbo.favorites WHERE username = '${userName}'`);
    return recipes;
}

function addToFavorites(username, recipeId){
    DButils.execQuery(
        `INSERT INTO dbo.favorites VALUES ('${username}', '${recipeId}')`)
}

module.exports={
    findUserInDB : findUserInDB,
    validatePassword : validatePassword,
    findUserInDBById : findUserInDBById,
    addRecipeToWatchedRecipes : addRecipeToWatchedRecipes, 
    isExistUser : isExistUser, 
    setNewUserInDB : setNewUserInDB, 
    getPersonalRecipes : getPersonalRecipes, 
    getFamilyRecipes : getFamilyRecipes, 
    getFavoriteRecipes : getFavoriteRecipes, 
    addToFavorites : addToFavorites, 
    getFamilyRecipeFullDetails : getFamilyRecipeFullDetails, 
    getPersonalRecipeFullDetails : getPersonalRecipeFullDetails, 
    getThreeRecentlyWachedRecipes : getThreeRecentlyWachedRecipes, 
    getUserInfoAboutRecipe : getUserInfoAboutRecipe,
    getUserInfo : getUserInfo
}

