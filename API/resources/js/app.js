import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./router";
import store from "./store";
//Main pages
import App from "./views/app.vue";



Vue.config.productionTip = false;
// Vue.use({
//     install: function(Vue, options){
//         Vue.prototype.$jQuery = require('jquery'); // you'll have this.$jQuery anywhere in your vue project
//     }
// })
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
