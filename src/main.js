import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";

// Import views
import LoginView from "./views/LoginView.vue";
import RegisterView from "./views/RegisterView.vue";
import DashboardView from "./views/DashboardView.vue";
import IncidentsView from "./views/IncidentsView.vue";
import MapView from "./views/MapView.vue";
import ResourcesView from "./views/ResourcesView.vue";
import SheltersView from "./views/SheltersView.vue";
import TasksView from "./views/TasksView.vue";
import MessagesView from "./views/MessagesView.vue";
import ProfileView from "./views/ProfileView.vue";

// Create router
const routes = [
  { path: "/", redirect: "/dashboard" },
  { path: "/login", component: LoginView },
  { path: "/register", component: RegisterView },
  { path: "/dashboard", component: DashboardView },
  { path: "/incidents", component: IncidentsView },
  { path: "/map", component: MapView },
  { path: "/resources", component: ResourcesView },
  { path: "/shelters", component: SheltersView },
  { path: "/tasks", component: TasksView },
  { path: "/messages", component: MessagesView },
  { path: "/profile", component: ProfileView },
  { path: "/settings", component: ProfileView }, // Redirect to profile for now
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Create app
const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);

app.mount("#app");
