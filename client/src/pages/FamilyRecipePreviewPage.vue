<template>
    <div>
        <img src="../assets/familyRecipes.png" width=350px class="title"/>
        <MultipleRecipePreviewList :recipes="recipes" recipeType="familyRecipe"></MultipleRecipePreviewList>
    </div>
</template>

<script>
import MultipleRecipePreviewList from "../components/MultipleRecipePreviewList";
export default {
  name: "FamilyRecipesPage",
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
        this.$root.store.server_url + "/user/getFamilyRecipes",
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