import Vuex from "vuex";
import Vue from "vue";
import authStore from "./modules/authStore.js";
import appUserStore from "./modules/appUserStore.js";

// Load Vuex
Vue.use(Vuex);

// Create store
export default new Vuex.Store({
    modules: {
        authStore,
        appUserStore,
    },
});
