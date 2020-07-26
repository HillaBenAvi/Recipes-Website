<template>
  <div v-if="this.recipe">
    <ViewRecipe :recipe="this.recipe">
    </ViewRecipe>
  </div>
</template>

<script>
import ViewRecipe from "../components/ViewRecipe";
export default {
   components: {
      ViewRecipe
  },
  data() {
    return {
      recipe: null
    };
  },
   mounted() {
    this.displayRecipe();
  },
  methods: {
    async displayRecipe() {
      let _recipe;

      try {
        let response;
        // response = this.$route.params.response;
        try {
          console.log("let's get the recipe from server")
          response = await this.axios.get(
            this.$root.store.server_url + "/user/getFamilyRecipeFullDetails/recipeId/" + this.$route.params.recipeId 
          );
          console.log("response is:" +response.data.recipe);
          // console.log("response.status", response.status);
          if (response.status !== 200) this.$router.replace("/NotFound");
        } catch (error) {
          console.log("error.response.status", error);
            if(error.response.status == 401){
              this.$root.store.logout();
              this.$router.push("/").catch(() => {
                this.$forceUpdate();
              });
            }
            else{
              this.$router.replace("/NotFound");
            }
          return;
        }

        let {
          instructions,
          ingredients,
          readyInMinutes,
          image,
          title,
          vegetarian,
          vegan,
          glutenFree,
          servings,
          fromWhom,
          WhenToPrepare,
        } = response.data.recipe[0];

        let _instructions = instructions.split('|');
        let _ingredients = ingredients.split('|');

        _recipe = {
          _instructions,
          _ingredients,
          readyInMinutes,
          image,
          title,
          vegetarian,
          vegan,
          glutenFree,
          servings,
          fromWhom,
          WhenToPrepare,
        };

      
          console.log("response.status", response.status);
          if (response.status !== 200) {
            console.log("i am not 200")
            this.$router.replace("/NotFound");
          }
        } catch (error) {
            console.log("error:" +error);
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
        this.recipe = _recipe;
    }
  }
};
</script>
