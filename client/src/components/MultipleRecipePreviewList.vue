<template>
    <b-container class="container">
      <b-row class="row" cols="3" no-gutters>
        <template v-for="n in recipes.length">
          <b-col :key="n">
              <RecipePreview class="recipe-preview" :recipe="recipes[n-1]" :name="recipeType" />
          </b-col>
        </template>
      </b-row>
    </b-container>
</template>

<script>
import RecipePreview from "./RecipePreview.vue";
export default {
  name: "MultipleRecipePreviewList",
  components: {
    RecipePreview
  },
  props: {
    recipes: {
      type: Array,
      required: true
    },
    recipeType: {
      type: String,
      required: true
    }
  },
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 400px;
}

.recipe-preview {
  margin: 10px auto;
  vertical-align: middle;
}
</style>