import agent from "../../agent";
import { getToken, setToken, clearToken } from "../../helpers";
import { router } from "../../app";

const state = {
    user: {
        id: 0,
        name: "",
        email: "",
    },
    authLoading: false,
};

const getters = {
    loggedInUser: (state) => state.user,
    authLoading: (state) => state.authLoading,
};

const actions = {
    async login({ commit }, request) {
        commit("setAuthLoading", true);
        try {
            const { user, token } = await agent.User.login(request);
            commit("setLoggedInUser", user);
            setToken(token);
            router.push("/dashboard");
        } catch (err) {
            throw err;
        } finally {
            commit("setAuthLoading", false);
        }
    },
    async currentUser({ commit }) {
        const token = getToken();
        if (!token) {
            if (router.currentRoute.path !== "/login") router.push("/login");
            return;
        }

        commit("setAuthLoading", true);
        try {
            const user = await agent.User.currentUser();
            commit("setLoggedInUser", user);

            if (router.currentRoute.path === "/login") {
                router.push("/dashboard");
            }
        } catch (err) {
            console.log(err);
            clearToken();
            window.location.reload();
        } finally {
            commit("setAuthLoading", false);
        }
    },
    async logout({ commit }) {
        commit("setAuthLoading", true);
        try {
            await agent.User.logout();
            clearToken();
            window.location.reload();
        } catch (err) {
            commit("setAuthLoading", false);
            alert("Something went wrong while trying to logout!");
            throw err;
        }
    },
};

const mutations = {
    setAuthLoading: (state, isAuthLoading) =>
        (state.authLoading = isAuthLoading),
    setLoggedInUser: (state, user) => (state.user = user),
};

export default {
    state,
    getters,
    actions,
    mutations,
};
