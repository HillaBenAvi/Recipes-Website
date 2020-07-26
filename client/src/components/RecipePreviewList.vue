<template>
  <b-container>
    <b-col>
      <b-row v-for="r in recipes" :key="r.id">
        <RecipePreview class="recipe-preview" :recipe="r" :name="recipeType"  />
      </b-row>
    </b-col>
  </b-container>
</template>

<script>
import RecipePreview from "./RecipePreview.vue";
export default {
  name: "RecipePreviewList",
  components: {
    RecipePreview
  },
  props: {
    title: {
      type: String,
      required: true
    },
    recipes: {
      type: Array,
      required: true
    },
    recipeType: {
      type: String,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>

.recipe-preview {
  display: table-cell;
  margin: 10px auto;
  vertical-align: middle;
}
</style>