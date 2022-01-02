import agent from "../../agent";
import { getToken, setToken, clearToken } from "../../helpers";
import { router } from "../../app";

const state = {
    isModalOpenAppUserForm: false,
};

const getters = {
    isModalOpenAppUserForm: (state) => state.isModalOpenAppUserForm,
};

const actions = {
    setModalOpenAppUserForm({ commit }, val) {
        commit("setModalOpenAppUserForm", val);
    },
};

const mutations = {
    setModalOpenAppUserForm: (state, val) =>
        (state.isModalOpenAppUserForm = val),
};

export default {
    state,
    getters,
    actions,
    mutations,
};
