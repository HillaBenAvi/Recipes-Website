<template>
  <div class="container">
    <b-col id="seach">
    <img src="../assets/search.png" class="title" width=350px />
    <b-row>
    <b-col class="search-params">
    <div class="search-query">
    <div>What would you like to cook?</div>
    <b-form-input v-model="searchQuery" type="text"/>
    </div>
    <br>
    </b-col>
    <b-col>
    <b-form-group label="How many results do you want to get?">
      <b-form-radio-group id="radio-group-2" v-model="resultsNumber" name="radio-sub-component">
        <b-form-radio value="5">5</b-form-radio>
        <b-form-radio value="10">10</b-form-radio>
        <b-form-radio value="15">15</b-form-radio>
      </b-form-radio-group>
    </b-form-group>
    </b-col>
    </b-row>
    <b-row cols="3">
      <multiselect class="multiselect" v-model="selectedCuisines" :options="this.cuisines" :multiple="true" :close-on-select="false" placeholder="Cuisines" :preselect-first="true" ></multiselect>
      <multiselect class="multiselect" v-model="selectedDiet" :options="this.diets" :multiple="true" :close-on-select="false" placeholder="Diets" :preselect-first="true"></multiselect>
      <multiselect class="multiselect" v-model="selectedIntolerances" :options="this.intolerances" :multiple="true" :close-on-select="false" placeholder="Intolerances" :preselect-first="true"></multiselect>
    </b-row>

    <b-form-checkbox class="checkbox" v-model="sortByLikes">
          Sort the results by popularity
    </b-form-checkbox>

    <b-form-checkbox class="checkbox" v-model="sortByTime">
          Sort the results by making time
    </b-form-checkbox>

<b-row>
     <b-button class="button" v-on:click="search">Search</b-button>
     </b-row>
    <MultipleRecipePreviewList v-if=" !this.noResults " class="list" :recipes="sortedRecipes" recipeType='recipe'></MultipleRecipePreviewList>
    <h1 v-else> no recipes for you! </h1>
  </b-col>
  </div>
</template>

<script> 
import Multiselect from 'vue-multiselect'
import cuisines from "../assets/cuisine";
import diets from "../assets/diet";
import intolerances from "../assets/intolerances";
import MultipleRecipePreviewList from "../components/MultipleRecipePreviewList";
export default {
  name: "SearchPage",
  components: {
    MultipleRecipePreviewList,
    Multiselect
  },
  data() {
    return {
      searchQuery: '', 
      resultsNumber:'5', 
      selectedCuisines:[],
      cuisines: [],
      selectedDiet:[],
      diets: [],
      selectedIntolerances:[],
      intolerances: [],
      recipes:[],  
      sortByLikes: false,
      sortByTime: false,
      noResults:false
    }
  },
  mounted(){
    this.recipes = []; 
    if(this.$root.store.queryResults){
      let retrievedData = sessionStorage.getItem("queryResults");
      this.recipes = JSON.parse(retrievedData);
    }
    this.cuisines.push(...cuisines);
    this.diets.push(...diets);
    this.intolerances.push(...intolerances);
  },
  methods: {
    async search() {
      try {
        var selectedCuisinesString = ""; 
        this.selectedCuisines.map((cuisine) =>{
          selectedCuisinesString += cuisine;
          selectedCuisinesString += " ";
        });
        
        var selectedDietString = ""; 
        this.selectedDiet.map((diet) =>{
          selectedDietString += diet;
          selectedDietString += " ";
        });

        var selectedIntolerancesString = ""; 
        this.selectedIntolerances.map((intolerance) =>{
          selectedIntolerancesString += intolerance;
          selectedIntolerancesString += " ";
        });

        const response = await this.axios.get(
        this.$root.store.server_url + "/recipe/search/query/"+this.searchQuery+"/amount/"+this.resultsNumber, 
        {
          params:{
          cuisine: selectedCuisinesString, 
          diet: selectedDietString, 
          intolerance: selectedIntolerancesString
        }}
        );
        const recipes = response.data.recipes;

        if(recipes.length === 0){
          this.noResults = true; 
        }
        else{
          this.noResults = false; 
        }

        this.recipes = [];
        this.recipes.push(...recipes);

        if(this.$root.store.username){
          var ids = recipes.map(function (recipe) {
            return recipe.id;
          });
          try{
            const infoResponse = await this.axios.get(
            this.$root.store.server_url + "/user/getRecipeInfo/ids/["+ ids + "]"
            );
            recipes.map((recipe) =>{
              recipe.watched = infoResponse.data[recipe.id].watched; 
              recipe.favorite = infoResponse.data[recipe.id].favorite;
            });
            this.$root.store.search(this.searchQuery, recipes);
          }
          catch (error) {
            console.log(error.message);
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
      } catch (error) {
        console.log(error);
        this.$router.replace("/NotFound");
      }
    },//search
  },

  computed:{
    sortedRecipes(){
      var recipesToRender = this.recipes; 
      if(this.sortByLikes){
        recipesToRender = recipesToRender.slice(0).sort((a, b) => b.aggregateLikes-a.aggregateLikes);
      }
      if (this.sortByTime){
        recipesToRender = recipesToRender.slice(0).sort((a, b) => a.readyInMinutes-b.readyInMinutes);
      }
      return recipesToRender; 
    }
  }
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style scoped>
.title{
  display: table-cell;
  margin: 0 auto;
  vertical-align: middle;
  padding-top: 20px;
}

.button{
  display: table-cell;
  margin: 0 auto;
  vertical-align: middle;
}
.checkbox{
  margin-left: 400px; 
  padding-top: 5px;
}

.search-query{
  margin-left: 230px; 
}

h1{
  color: #FFA07A;
  font-weight: bold;
  margin-left: 350px; 
}

</style>
