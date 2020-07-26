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
        try {
          response = await this.axios.get(
            this.$root.store.server_url + "/user/getPersonalRecipeFullDetails/recipeId/" + this.$route.params.recipeId 
          );
          if (response.status !== 200) this.$router.replace("/NotFound");
        } catch (error) {
          console.log("error: ", error.message);
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
          servings
        };

      
        if (response.status !== 200) this.$router.replace("/NotFound");
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
            return;
        }
      this.recipe = _recipe;
    }
    }
};
</script>

