<template>
  <div id="app">
    <div>
      <img src="./assets/yummy.png" width=100%/>
    </div>
    <b-navbar class="navbar" id="nav" toggleable="lg" type="info" >
      <b-navbar-brand :to="{ name: 'main' }">Home Page</b-navbar-brand>|
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item :to="{ name: 'search' }">Search  |</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav>
          <b-nav-item :to="{ name: 'about' }">About</b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto">
          <b-nav-item v-if="$root.store.username">Hello {{$root.store.username}}</b-nav-item>
          <b-nav-item v-else>Hello guest</b-nav-item>
          <b-avatar :src="$root.store.profilePicture"></b-avatar>
        </b-navbar-nav>
          
        <b-navbar-nav>

        <b-nav-item-dropdown right v-if="$root.store.username">
          <!-- Using 'button-content' slot -->
          <template v-slot:button-content>
            <em>Personal Options</em>
          </template>
          <b-dropdown-item :to="{name: 'favorite'}">Your Favorite Recipes</b-dropdown-item>
          <b-dropdown-item  :to="{ name: 'personal' }">Your Personal Recipes</b-dropdown-item>
          <b-dropdown-item :to="{ name: 'family' }">Your Family Recipes</b-dropdown-item>
          <b-dropdown-item @click="Logout">Logout</b-dropdown-item>
        </b-nav-item-dropdown>
        <b-navbar-nav v-else>
          <b-nav-item :to="{ name: 'register' }">Register</b-nav-item>
          <b-nav-item :to="{ name: 'login' }">Login</b-nav-item>
        </b-navbar-nav>
        </b-navbar-nav>
      </b-collapse>

    </b-navbar>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  methods: {
    Logout() {
      this.$root.store.logout();
      this.$root.toast("Logout", "User logged out successfully", "success");

      this.$router.push("/").catch(() => {
        this.$forceUpdate();
      });
    }
  }
};
</script>

<style lang="scss">
@import "@/scss/form-style.scss";

#app {
  font-family: "Lucida Sans Unicode", "Lucida Grande", sans-serif; 
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
  background-image: url("./assets/mainBack.png");
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center;

}

#nav {
  padding: 5px;
  width: 100%;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#helloText{
  padding: 20px;
  font-weight: bold;
  color: #2c3e50;
}

.navbar{
  background-color:#b5edf0; 
}

</style>
