<template>
  <div>
    <img src="../assets/recentlyWatched.png" width=300px class="title"/>
    <RecipePreviewList title="Recently Watched Recipes" :recipes="recipes" recipeType="recipe"/>
  </div>
</template>

<script>
import RecipePreviewList from "./RecipePreviewList.vue";
export default {
  name: "WatchedRecipePreviewList",
  components: {
    RecipePreviewList
  },
  data() {
    return {
      recipes: []
    };
  },
  mounted() {
    this.updateRecipes();
  },
  methods: {
    async updateRecipes() {
      try {
        const response = await this.axios.get(
          this.$root.store.server_url + "/user/getThreeRecentlyWachedRecipes"
        );

        // console.log(response);
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
        this.recipes = _recipes;
        }
        catch (error) {
          console.log(error);
              if(error.status === 401){
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
    }
};
</script>

<style>

.title{
  display: table-cell;
  margin: 0 auto;
  vertical-align: middle;
  padding-bottom: 20px;

}

</style>