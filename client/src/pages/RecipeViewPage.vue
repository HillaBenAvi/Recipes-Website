<template>
  <div class="container">
    <b-button v-if="this.favorite=='false' && !this.liked" @click="addToFavorites" variant="danger" class="button"> Add to your favorites  
      <b-icon icon="heart"></b-icon>
    </b-button>
    <b-badge v-else-if="this.favorite=='true' || this.liked" variant="danger" class="badge">The recipe is already in your favorites</b-badge>
    <div v-if="this.recipe">
      <ViewRecipe :recipe="this.recipe"></ViewRecipe>
    </div>
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
      recipeId: null, 
      recipe: null, 
      favorite:"",
      liked: false
    };
  },
  async created() {
    try {
      let response;
      this.recipeId = this.$route.params.recipeId;
      this.favorite = this.$route.params.favorite;

      try {
        response = await this.axios.get(
          this.$root.store.server_url + "/recipe/displayRecipe/id/" + this.recipeId
        );
        if (response.status !== 200) this.$router.replace("/NotFound");
      } catch (error) {
        console.log("error: ", error.message);
        this.$router.replace("/NotFound");
        return;
      }

      let {
        analyzedInstructions,
        extendedIngredients,
        aggregateLikes,
        readyInMinutes,
        image,
        title, 
      } = response.data.recipe;

      let _instructions = [];
      for(let i=1; i<analyzedInstructions.length; i+=2){
        _instructions.push(analyzedInstructions[i]);
      }

      let _ingredients = extendedIngredients;

      let _recipe = {
        _instructions,
        _ingredients,
        aggregateLikes,
        readyInMinutes,
        image,
        title
      };

    if (this.$root.store.username){
      try{
        response = await this.axios.post(
          this.$root.store.server_url + "/user/addToWatchedRecipes",
          {
            recipeId: this.recipeId
          }
        );
        if (response.status !== 201) this.$router.replace("/NotFound");
      } catch (error) {
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
    }
      this.recipe = _recipe;
    } catch (error) {
      console.log(error);
      this.$router.replace("/NotFound");
    }
  }, 
  methods: {
    async addToFavorites() {
        try {
          const response = await this.axios.post(
          this.$root.store.server_url + "/user/addToFavorites",
            {
              recipeId: this.recipeId
            }
          );
          this.liked = true; 
        } catch (error) {
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

<style scoped>
.wrapper {
  display: flex;
}
.wrapped {
  width: 50%;
}
.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}

.button{
  margin-top: 20px;
    margin-bottom: 10px;
}

.badge{
  margin-top: 20px;
  margin-bottom: 10px;
  font-size: 15px;
}

</style>
