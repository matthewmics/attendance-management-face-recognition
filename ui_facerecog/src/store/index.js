import Vuex from "vuex";
import Vue from "vue";
import authStore from "./modules/authStore.js";

// Load Vuex
Vue.use(Vuex);

// Create store
export default new Vuex.Store({
  modules: {
    authStore,
  },
});