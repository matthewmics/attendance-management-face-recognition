import DashboardLayout from "../components/DashboardLayout";
import Dashboard from "../components/Dashboard";
import AttendanceLogs from "../components/AttendanceLogs";
import Login from "../components/Login";

const routes = [
  {
    path: "/",
    redirect: "dashboard",
    component: DashboardLayout,
    children: [
      {
        path: "dashboard",
        component: Dashboard,
      },
      {
        path: "attendance",
        component: AttendanceLogs,
      },
    ],
  },
  {
    path: "/login",
    component: Login,
  },
];

export default routes;
