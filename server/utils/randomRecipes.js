const axios = require("axios");
require("dotenv").config();
const recipesAPIUrl = "https://api.spoonacular.com/recipes";
const apiKey = "apiKey=86d994e3cdd34379a676d4698eea02c6";
const recipesDataUtil = require("./recipesData");


async function getThreeRandomRecipes(randomParams){
    isFound=false;
    let searchResponse;
    while(!isFound){
        searchResponse = await axios.get(`${recipesAPIUrl}/random?${apiKey}`,
        {
            params: randomParams,
        } 
        )
        let counter = 0;
        for(let i=0; i<searchResponse.data.recipes.length; i++){
            if(searchResponse.data.recipes[i].analyzedInstructions.length > 0)
                counter ++; 
        }
        if(counter === 3){
            isFound = true; 
        }
    }
        const recipesIdList = recipesDataUtil.extractRandomResultsIds(searchResponse);
        let infoArray = await recipesDataUtil.getRecipesPreview(recipesIdList); //search this function in another record    


   
    return infoArray;
}

exports.getThreeRandomRecipes = getThreeRandomRecipes;


