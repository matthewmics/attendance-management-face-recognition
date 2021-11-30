import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./router";
import store from "./store";

//Main pages
import App from "./views/app.vue";

Vue.config.productionTip = false;

Vue.use(VueRouter);

const router = new VueRouter({
    routes,
    mode: "history",
});

const app = new Vue({
    el: "#app",
    components: { App },
    router,
    store,
});

export { router };
