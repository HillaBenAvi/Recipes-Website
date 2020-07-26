<template>
<div class="container">
    <div v-if="recipe">
      <div class="recipe-header">
        <h1 id="title">{{ recipe.title }}</h1>
        <div class="wrapped1">
          <b-container class="recipe-info">
            <b-col>
              <div class="detail"><br>Ready in <br> {{ recipe.readyInMinutes }} minutes</div>
              <div class="detail"><br> {{ recipe.servings }} Servings</div>
              <div class="detail" v-if="recipe.aggregateLikes"><br> {{recipe.aggregateLikes}} likes</div>
              <br>
              <div class="detail" v-if="recipe.fromWhom" ><br>Who make it? {{recipe.fromWhom}} </div>
              <div class="detail" v-if="recipe.WhenToPrepare"> When to prepare? {{recipe.WhenToPrepare}} </div>        
              <b-row>
                <b-badge pill v-if="recipe.vegan" variant="success">vegan</b-badge>
                <b-badge  pill v-if="recipe.vegetarian" variant="success">vegetarian</b-badge>
                <b-badge pill v-if="recipe.glutenFree" variant="success">gluten free</b-badge>
              </b-row>
            </b-col>
            <b-col>
              <div class="wrapped">
                <img :src="recipe.image" class="recipe-image" />
              </div>
            </b-col>
          </b-container>
        </div>
      </div>
      
      <div>
        <b-container>
          <b-row>
            <b-col>
              <div class="wrapped">
                <h4>Ingredients:</h4>
                <ul>
                  <li v-for="r in recipe._ingredients" :key="r.number">
                    {{ r }}
                  </li>
                </ul>
              </div>
            </b-col>
            <b-col>
              <div class="wrapped">
                <h4>Instructions:</h4>
                <ol>
                  <li v-for="s in recipe._instructions" :key="s.number">
                    {{ s }}
                  </li>
                </ol>
              </div>
            </b-col>
          </b-row>
        </b-container>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ViewRecipe",
  props: {
      recipe: {
          type: Object,
          required: true,
      } 
  }

};
</script>

<style scoped>
.wrapped {
  width: 100%;
  text-align: left; 
  align-content: top;
  align-items: top;
}

.recipe-image {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 450px;
  border-radius: 3px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.recipe-info{
  border: 5px;
  display: flex;
}

.detail{
  text-align: center;
  margin: 15px auto;
  height: 94px;
  width: 120px;
  border: 3px dotted #03989e;
  border-radius: 40px;
  margin-right: 28px;
  display: inline-block;
  vertical-align: middle;
  background-color: #e6fff3; 
}

.row{
  border-bottom-left-radius: 15px;
  size:auto;
  margin-bottom: 15px;
  text-emphasis: initial;
}

#title{
  text-align: center;
  font-weight: bold;
  margin-bottom: 30px;
}

.badge{
  margin-left: 5px;
  font-size: 16px;
}
</style>
