<template>
<div>
  <img src="../assets/random.png" width=300px class="title"/>
  <RecipePreviewList title="Random Recipes" :recipes="recipesToDisplay" recipeType="recipe"/>
  <b-button class="discover-more" v-on:click="updateRecipes">Discover more</b-button>
</div>
</template>

<script>
import RecipePreviewList from "./RecipePreviewList.vue";
export default {
  name: "RandomRecipePreviewList",
  components: {
    RecipePreviewList
  },
  data() {
    return {
      recipes: [], 
      username: this.$root.store.username
    };
  },
  mounted() {
    this.updateRecipes();
  },
  methods: {
    async updateRecipes() {
      try {
        const response = await this.axios.get(
          this.$root.store.server_url + "/recipe/randomRecipes"
        );

        this.recipes = [];
        var _recipes = response.data.recipes;

        if(this.$root.store.username){
          var ids = _recipes.map(function (recipe) {
            return recipe.id;
          });
          try{
          const infoResponse = await this.axios.get(
          this.$root.store.server_url + "/user/getRecipeInfo/ids/["+ ids + "]"
          );
          _recipes.map(function (recipe) {
            recipe.watched = infoResponse.data[recipe.id].watched; 
            recipe.favorite = infoResponse.data[recipe.id].favorite;
          });
          }
          catch (error) {
            console.log(error);
          }
        }
        this.recipes = _recipes;
        
      } catch (error) {
        console.log(error);
      }
    }, 
    async updateRecipesData(){
        this.username = this.$root.store.username; 
        var _recipes = this.recipes; 
        if(this.$root.store.username){
          var ids = _recipes.map(function (recipe) {
            return recipe.id;
          });
          try{
            const infoResponse = await this.axios.get(
              this.$root.store.server_url + "/user/getRecipeInfo/ids/["+ ids + "]"
            );
            _recipes.map(function (recipe) {
              recipe.watched = infoResponse.data[recipe.id].watched; 
              recipe.favorite = infoResponse.data[recipe.id].favorite;
            });
          }
          catch (error) {
            console.log(error);
            if(error.response.status == 401){
              this.$root.store.logout();
              this.$router.push("/").catch(() => {
                this.$forceUpdate();
              });
            }
            else{
              this.$router.replace("/NotFound");
            }
          }
        }
        else{
          _recipes.map(function (recipe) {
            recipe.watched = undefined; 
            recipe.favorite = undefined;
          });
        }
        this.recipes = _recipes; 
    }
  },
  computed:{
    recipesToDisplay(){
      if (this.username != this.$root.store.username){
        this.updateRecipesData(); 
      }
      var _recipes = this.recipes;
      return _recipes; 
    }
  }
};
</script>

<style>

.title {
  display: table-cell;
  margin: 0 auto;
  vertical-align: middle;
}

.discover-more{
  display: table-cell;
  margin: 10px 200px;
  vertical-align: middle;
}
</style>
