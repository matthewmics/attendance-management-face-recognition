import axios from "axios";
import { getToken } from "./helpers";
import { apiUrl, httpRequestSleepDuration } from "./env";

axios.defaults.baseURL = apiUrl + "/api";
const sleepDuration = httpRequestSleepDuration;
console.log(sleepDuration);

axios.interceptors.request.use(
    (config) => {
        const token = getToken();
        if (token) {
            config.headers.Authorization = "Bearer " + token;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

const responseBody = (response) => response.data;

const sleep = (ms) => (response) =>
    new Promise((resolve) => setTimeout(() => resolve(response), ms));

const requests = {
    get: (url) => axios.get(url).then(sleep(sleepDuration)).then(responseBody),
    post: (url, body) =>
        axios.post(url, body).then(sleep(sleepDuration)).then(responseBody),
    put: (url, body) =>
        axios.put(url, body).then(sleep(sleepDuration)).then(responseBody),
    delete: (url) =>
        axios.delete(url).then(sleep(sleepDuration)).then(responseBody),
};

const User = {
    login: (formValues) => requests.post("/auth/login", formValues),
    currentUser: () => requests.get("/auth/me"),
    logout: () => requests.post("/auth/logout"),
};

const AppUser = {
    list: (page) => requests.get(`/app-users?page=${page}`),
};

const agent = {
    User,
    AppUser,
};

export default agent;
