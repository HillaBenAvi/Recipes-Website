<template>
  <div class="container">
    <b-col>
      <b-row>
        <img class="image" src="../assets/pageNotFound.jpg" >
      </b-row>
      <b-row>
      <router-link class="router-link" to="/" exact>Return to Home</router-link>
      </b-row>
    </b-col>
  </div>
</template>

<style>

.image{
  width: 700px;
  display: table-cell;
  margin: 0 auto;
  vertical-align: middle;
  margin-top: 20px;
}
.router-link{
  font-weight: bold;
  display: table-cell;
  margin: 0 auto;
  vertical-align: middle;
  font-size: 20px;
}

</style>