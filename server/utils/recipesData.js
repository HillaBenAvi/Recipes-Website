const axios = require("axios");
require("dotenv").config();
const recipesAPIUrl = "https://api.spoonacular.com/recipes";
const apiKey = "apiKey=86d994e3cdd34379a676d4698eea02c6";
const DBUsersUtils = require("./DBUsers");

function extractSearchResultsIds(searchResponse){
    let recipes = searchResponse.data.results;
    idsList = []; 
    recipes.map((recipe)=>{
        idsList.push(recipe.id);
    });
    return idsList;
}


function extractRandomResultsIds(searchResponse){
    let recipes = searchResponse.data.recipes;
    idsList = []; 
    recipes.map((recipe)=>{
        idsList.push(recipe.id);
    });
    return idsList;
}

//get recipes previews list
async function getRecipesPreview(recipesIdList){
    let promises = [];
    recipesIdList.map((id) => 
        promises.push(axios.get(`${recipesAPIUrl}/${id}/information?${apiKey}&instructionRequired=true`))
    );
    let infoResponse = await Promise.all(promises);
    relevantRecipesInfo = extractRelevantData(infoResponse);
    return relevantRecipesInfo; 
}
    

async function getRecipeInfoById (id){
    let infoResponse = await axios.get(`${recipesAPIUrl}/${id}/information?${apiKey}`); 
    fullRecipeInfo = extractFullRecipeData(infoResponse);
    extractIngredientsFromData(fullRecipeInfo);
    analyzeInstructions(fullRecipeInfo);
    return fullRecipeInfo; 
}


//recipe preview 
function extractRelevantData(infoResponse){
    return infoResponse.map((recipe) => {
        const{
            id,
            title,
            readyInMinutes,
            aggregateLikes,
            vegetarian,
            vegan,
            glutenFree,
            image,
        } = recipe.data; 
        return{
            id: id,
            title: title,
            readyInMinutes: readyInMinutes,
            aggregateLikes: aggregateLikes,
            vegetarian: vegetarian,
            vegan: vegan,
            glutenFree: glutenFree,
            image: image,
        };

    });
}

function extractFullRecipeData(infoResponse){ 
        const{
            id,
            title,
            readyInMinutes,
            aggregateLikes,
            vegetarian,
            vegan,
            glutenFree,
            image,
            servings,
            analyzedInstructions,
            extendedIngredients
        } = infoResponse.data; 
        return{
            id: id,
            title: title,
            readyInMinutes: readyInMinutes,
            aggregateLikes: aggregateLikes,
            vegetarian: vegetarian,
            vegan: vegan,
            glutenFree: glutenFree,
            image: image,
            servings: servings,
            analyzedInstructions: analyzedInstructions,
            extendedIngredients: extendedIngredients
        };
    
}

function extractIngredientsFromData(fullRecipeInfo){
    let ingredients = fullRecipeInfo.extendedIngredients;
    ingredientsList = [];
    ingredients.map((ingredient) => {
        ingredientsList.push(ingredient.original);
    });
    fullRecipeInfo.extendedIngredients = ingredientsList;
}

function analyzeInstructions(fullRecipeInfo){
    let instuctions = fullRecipeInfo.analyzedInstructions[0].steps;
    instuctionsList = [];
    instuctions.map((i) => {
        instuctionsList.push(i.number, i.step);
    });
    fullRecipeInfo.analyzedInstructions = instuctionsList;
}


module.exports={

    extractRelevantData : extractRelevantData,
    getRecipesPreview : getRecipesPreview,
    extractSearchResultsIds : extractSearchResultsIds,
    getRecipeInfoById : getRecipeInfoById,
    extractRandomResultsIds : extractRandomResultsIds
}