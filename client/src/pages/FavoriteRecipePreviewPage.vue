<template>
    <div >
        <img src="../assets/favorites.png" width=350px class="title"/>
        <MultipleRecipePreviewList :recipes="recipes" recipeType="recipe"></MultipleRecipePreviewList>
    </div>
</template>

<script>
import MultipleRecipePreviewList from "../components/MultipleRecipePreviewList";
export default {
  name: "FavoriteRecipesPage",
  components: {
    MultipleRecipePreviewList
  },
  data() {
    return {
      recipes: [] 
    }
  },
  mounted() {
    this.myRecipes();
  },
  methods: {
    async myRecipes() {
      try {
        const response = await this.axios.get(
        this.$root.store.server_url + "/user/getFavoriteRecipes",
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


        this.recipes = _recipes; 

      }
      catch(error){
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
  padding-top: 20px;
}

</style>