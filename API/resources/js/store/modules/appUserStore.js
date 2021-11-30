import agent from "../../agent";
import { getToken, setToken, clearToken } from "../../helpers";
import { router } from "../../app";

const state = {
    paginationAppUser: null,
    appUserLoading: false,
};

const getters = {
    paginationAppUser: (state) => state.paginationAppUser,
    appUserLoading: (state) => state.appUserLoading,
};

const actions = {
    async fetchAppUsers({ commit }, page) {
        commit("setAppUserLoading", true);
        try {
            const response = await agent.AppUser.list(page);
            commit("setPaginationAppUser", response);
        } catch (err) {
            console.log(err);
        } finally {
            commit("setAppUserLoading", false);
        }
    },
};

const mutations = {
    setAppUserLoading: (state, val) => (state.appUserLoading = val),
    setPaginationAppUser: (state, val) => (state.paginationAppUser = val),
};

export default {
    state,
    getters,
    actions,
    mutations,
};
