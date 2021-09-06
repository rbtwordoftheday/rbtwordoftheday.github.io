import { createWebHistory, createRouter } from "vue-router";
import Guess from "./components/Guess.vue";
import EnterInfo from "./components/EnterInfo.vue";
const routes = [
  {
    path: "/",
    name: "Guess",
    component: Guess,
  },
  {
    path: "/enterinfo",
    name: "Info",
    component: EnterInfo,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
