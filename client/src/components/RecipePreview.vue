<template>
  <b-card no-body  style="width: 320px; height:330px" class="recipe-preview">
    <b-row no-gutters class="recipe-body">
      <b-col>
        <router-link :to="{ name: name, params: { recipeId: recipe.id , favorite: recipe.favorite} }" >
          <b-card-img :src="recipe.image" alt="Image" class="recipe-image"></b-card-img>
        </router-link>  
        <router-link :to="{ name: name, params: { recipeId: recipe.id , favorite: recipe.favorite} }" >
          <b-card-title class="recipe-title">{{recipe.title}}</b-card-title>
        </router-link>
        <div class="recipe-footer">
          <div>
            <b-icon v-if="recipe.readyInMinutes" icon="clock" style="width: 15px; height: 15px;"></b-icon>
            <a style="margin-right: 10px; margin-bottom: 20px;">  {{ recipe.readyInMinutes }} minutes</a>
            <b-icon v-if="recipe.aggregateLikes>-1" icon="heart" style="width: 15px; height: 15px;"></b-icon>
            <a style="margin-right: 10px; margin-bottom: 20px;"> {{ recipe.aggregateLikes }} likes</a>   
          </div>
          <div>
            <b-badge style="margin-top: 10px;" v-if="recipe.vegan" variant="success">Vegan</b-badge>
            <b-badge style="margin-top: 10px;" v-if="recipe.vegetarian" variant="success">Vegetarian</b-badge>
            <b-badge style="margin-top: 10px;" v-if="recipe.glutenFree" variant="success">Gluten free</b-badge>
          </div>
          <recipePreviewData style="margin-top: 5px;" :id="parseInt(this.recipe.id)" :watched="this.recipe.watched" :favorite="this.recipe.favorite"></recipePreviewData>
        </div>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
import recipePreviewData from "../components/recipePreviewData";
export default {
  components:{
    recipePreviewData
  },
  props: {
    recipe: {
      type: Object,
      required: true
    },
    name: {
      type: String, 
      required: true
    }
  }
};
</script>

<style scoped>

.recipe-preview {
  padding-bottom: 10px;

}

.recipe-preview .recipe-body .recipe-image {
  width: 317px; 
  height: 180px; 
  object-fit: cover;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  background-size: cover;
}

.recipe-preview .recipe-footer {
  text-align: center;
  font-size: 14px;
}

.recipe-body .recipe-title {
  padding-top: 10px;
  width: 95%;
  font-size: 18px;
  text-align: center;
  overflow-wrap: break-word;
  word-wrap: break-word;
  hyphens: auto;
}

</style>
