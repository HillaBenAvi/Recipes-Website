<template>
    <div>
        <img src="../assets/personalRecipes.png" width=300px class="title"/>
        <MultipleRecipePreviewList :recipes="recipes" recipeType="personalRecipe"></MultipleRecipePreviewList>
    </div>
</template>

<script>
import MultipleRecipePreviewList from "../components/MultipleRecipePreviewList";
export default {
  name: "PersonalRecipesPage",
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
        this.$root.store.server_url + "/user/getPersonalRecipes",
        );
      
      const recipes = response.data.recipes;
      this.recipes = [];
      this.recipes.push(...recipes);
      }
      catch(error){
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