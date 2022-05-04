import axios from "axios";
import { apiUrl } from "./environment";
import { getToken } from "./helpers";

axios.defaults.baseURL = apiUrl + "/api";
const sleepDuration = 0;

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

axios.interceptors.response.use(undefined, (error) => {
  throw error.response;
});

const responseBody = (response) => response.data;

const sleep = (ms) => (response) =>
  new Promise((resolve) => setTimeout(() => resolve(response), ms));

const requests = {
  get: (url) => axios.get(url).then(sleep(sleepDuration)).then(responseBody),
  post: (url, body) =>
    axios.post(url, body).then(sleep(sleepDuration)).then(responseBody),
  postBlob: (url, body) =>
    axios
      .post(url, body, { responseType: "blob" })
      .then(sleep(sleepDuration))
      .then(responseBody),
  put: (url, body) =>
    axios.put(url, body).then(sleep(sleepDuration)).then(responseBody),
  delete: (url) =>
    axios.delete(url).then(sleep(sleepDuration)).then(responseBody),
};

const User = {
  login: (formValues) => requests.post("/auth/login", formValues),
  currentUser: () => requests.get("/auth/me"),
  logout: () => requests.post("/auth/logout"),
  list: () => requests.get(`/users`),
  find: (id) => requests.get(`/users/${id}`),
  changePassword: (id, request) =>
    requests.post(`/users/${id}/change-password`, request),
  create: (request) => requests.post(`/users`, request),
  delete: (id) => requests.delete(`/users/${id}`),
};

const Department = {
  list: () => requests.get("/departments"),
  create: (req) => requests.post("/departments", req),
  update: (id, req) => requests.put(`/departments/${id}`, req),
  delete: (id) => requests.delete(`/departments/${id}`),
  schedules: (id) => requests.get(`/departments/${id}/schedules`),
};

const Employee = {
  list: () => requests.get("/app-users"),
  create: (req) => requests.post("/app-users", req),
  update: (id, req) => requests.put(`/app-users/${id}`, req),
  delete: (id) => requests.delete(`/app-users/${id}`),
  uploadFace: (id, file) => {
    const formData = new FormData();
    formData.append("face", file);
    return requests.post(`/app-users/${id}/uploadFace`, formData);
  },
};

const Schedule = {
  update: (id, req) => requests.put(`/schedules/${id}`, req),
};

const AttendanceLog = {
  list: () => requests.get(`/attendance-logs`),
  viewCaptured: (id) => requests.get(`/captured-faces/${id}`),
};

const Report = {
  generate: (req) => requests.postBlob("/reports/generate", req),
  employee: (id, req) =>
    requests.postBlob(`/reports/generate/employees/${id}`, req),
};

const agent = {
  User,
  Department,
  Employee,
  Schedule,
  AttendanceLog,
  Report,
};

export default agent;
