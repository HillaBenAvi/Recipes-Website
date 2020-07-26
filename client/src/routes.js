import Main from "./pages/MainPage";
import NotFound from "./pages/NotFoundPage";

const routes = [
  {
    path: "/",
    name: "main",
    component: Main,
  },
  {
    path: "/register",
    name: "register",
    component: () => import("./pages/RegisterPage"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("./pages/LoginPage"),
  },
  {
    path: "/search",
    name: "search",
    component: () => import("./pages/SearchPage"),
  },
  {
    path: "/recipe/:recipeId",
    name: "recipe",
    component: () => import("./pages/RecipeViewPage"),
  },
  {
    path: "/PersonalRecipePreviewPage",
    name: "personal",
    component: () => import("./pages/PersonalRecipePreviewPage"),
  },
  {
    path: "/FamilyRecipePreviewPage",
    name: "family",
    component: () => import("./pages/FamilyRecipePreviewPage"),
  },
  {
    path: "/FamilyRecipeViewPage/:recipeId",
    name: "familyRecipe",
    component: () => import("./pages/FamilyRecipeViewPage"),
  },
  {
    path: "/PersonalRecipeViewPage/:recipeId",
    name: "personalRecipe",
    component: () => import("./pages/PersonalRecipeViewPage"),
  },
  {
    path: "/FavoriteRecipePreviewPage",
    name: "favorite",
    component: () => import("./pages/FavoriteRecipePreviewPage"),
  },
  {
    path: "/AboutPage",
    name: "about",
    component: () => import("./pages/AboutPage"),
  },
  {
    path: "*",
    name: "notFound",
    component: NotFound,
  },
];

export default routes;
