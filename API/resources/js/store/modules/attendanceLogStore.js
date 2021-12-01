import agent from "../../agent";
import { getToken, setToken, clearToken } from "../../helpers";
import { router } from "../../app";

const state = {
    paginationAttendanceLogs: null,
    attendanceLogsLoading: false,
};

const getters = {
    paginationAttendanceLogs: (state) => state.paginationAttendanceLogs,
    attendanceLogsLoading: (state) => state.attendanceLogsLoading,
};

const actions = {
    async fetchAttendanceLogs({ commit }, page) {
        commit("setAttendanceLogsLoading", true);
        try {
            const response = await agent.AttendanceLog.list(page);
            commit("setPaginationAttendanceLogs", response);
        } catch (error) {
            console.log(error);
        } finally {
            commit("setAttendanceLogsLoading", false);
        }
    },
};

const mutations = {
    setAttendanceLogsLoading: (state, val) =>
        (state.attendanceLogsLoading = val),
    setPaginationAttendanceLogs: (state, val) =>
        (state.paginationAttendanceLogs = val),
};

export default {
    state,
    getters,
    actions,
    mutations,
};
