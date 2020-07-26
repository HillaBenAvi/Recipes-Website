<template>
  <b-container class="container">

    <b-row>
      <b-col>
        <RandomRecipePreviewList class="Recipes-list" />
      </b-col>
      <b-col v-if="!$root.store.username" >
        <LoginPage class="Recipes-list"></LoginPage>
      </b-col>
      <b-col v-else>
        <WatchedRecipesPreviewList class="Recipes-list"></WatchedRecipesPreviewList>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import RandomRecipePreviewList from "../components/RandomRecipePreviewList";
import WatchedRecipesPreviewList from "../components/WatchedRecipesPreviewList";
import LoginPage from "../pages/LoginPage";
export default {
  components: {
    RandomRecipePreviewList,
    LoginPage, 
    WatchedRecipesPreviewList
  }
};
</script>

<style lang="scss" scoped>
.Recipes-list {
  margin: 10px 0 10px;
}
.blur {
  -webkit-filter: blur(5px); /* Safari 6.0 - 9.0 */
  filter: blur(2px);
}
::v-deep .blur .recipe-preview {
  pointer-events: none;
  cursor: default;
}

</style>
