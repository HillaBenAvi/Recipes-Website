const axios = require("axios");
require("dotenv").config();
const recipesAPIUrl = "https://api.spoonacular.com/recipes";
const apiKey = "apiKey=86d994e3cdd34379a676d4698eea02c6";
const recipesDataUtil = require("./recipesData");

async function searchForRecipes(searchQuery, number, searchParams){
    let searchResponse = await axios.get(`${recipesAPIUrl}/search?${apiKey}`,
    {
        params: searchParams,
    });
    const recipesIdList = recipesDataUtil.extractSearchResultsIds(searchResponse);
    let infoArray = await recipesDataUtil.getRecipesPreview(recipesIdList); //search this function in another record
    return infoArray;
}

function extractQueriesParams(queryParams, searchParams){
    const paramsList = ["diet", "cuisine", "intolerance"];
    paramsList.forEach((param) => {
        if(queryParams[param]){
            searchParams[param] = queryParams[param];
        }
    });
}


module.exports = {
    searchForRecipes : searchForRecipes,
    extractQueriesParams : extractQueriesParams
}