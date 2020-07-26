import Vue from "vue";
import App from "./App.vue";
import VueAxios from "vue-axios";
import axios from "axios";
import VueCookies from 'vue-cookies';
axios.defaults.withCredentials = true;

import routes from "./routes";
import VueRouter from "vue-router";
Vue.use(VueRouter);
const router = new VueRouter({
  routes,
});

Vue.use(VueCookies);

import Vuelidate from "vuelidate";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import {
  FormGroupPlugin,
  FormPlugin,
  FormInputPlugin,
  ButtonPlugin,
  CardPlugin,
  NavbarPlugin,
  FormSelectPlugin,
  AlertPlugin,
  ToastPlugin,
  LayoutPlugin,
  DropdownPlugin,
  FormRadioPlugin,
  BadgePlugin,
  AvatarPlugin,
  IconsPlugin,
  PopoverPlugin,
  ImagePlugin,
  FormCheckboxPlugin
} from "bootstrap-vue";
[
  FormGroupPlugin,
  FormPlugin,
  FormInputPlugin,
  ButtonPlugin,
  CardPlugin,
  NavbarPlugin,
  FormSelectPlugin,
  AlertPlugin,
  ToastPlugin,
  LayoutPlugin,
  DropdownPlugin,
  FormRadioPlugin,
  BadgePlugin,
  AvatarPlugin,
  IconsPlugin,
  PopoverPlugin,
  ImagePlugin,
  FormCheckboxPlugin
].forEach((x) => Vue.use(x));
Vue.use(Vuelidate);

axios.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function(response) {
    // Do something with response data
    return response;
  },
  function(error) {
    // Do something with response error
    return Promise.reject(error);
  }
);

Vue.use(VueAxios, axios);

Vue.config.productionTip = false;

const shared_data = {
  server_url: "http://localhost:3005",
  username: localStorage.username,
  profilePicture: localStorage.profilePicture,
  lastSearch: sessionStorage.lastSearch,
  queryResults: sessionStorage.queryResults,
  login(username, profilePicture) {
    localStorage.setItem("username", username);
    localStorage.setItem("profilePicture", profilePicture);
    this.username = username;
    this.profilePicture = profilePicture;
    console.log("login", this.username);
  },
  logout() {
    console.log("logout");
    localStorage.removeItem("username");
    sessionStorage.removeItem("lastSearch");
    sessionStorage.removeItem("queryResults");
    localStorage.removeItem("profilePicture");
    this.username = undefined;
    this.lastSearch = undefined;
    this.queryResults = undefined;
    this.profilePicture = undefined;
  },
  search(search, results){
    sessionStorage.setItem("lastSearch",search);
    sessionStorage.setItem("queryResults",JSON.stringify(results));
    this.lastSearch = search;
    this.queryResults = results;
  },
};
console.log(shared_data);
// Vue.prototype.$root.store = shared_data;

new Vue({
  router,
  data() {
    return {
      store: shared_data,
    };
  },
  methods: {
    toast(title, content, variant = null, append = false) {
      this.$bvToast.toast(`${content}`, {
        title: `${title}`,
        toaster: "b-toaster-top-center",
        variant: variant,
        solid: true,
        appendToast: append,
        autoHideDelay: 3000,
      });
    },
  },
  render: (h) => h(App),
}).$mount("#app");
