import DashboardLayout from "../views/DashboardLayout";
import Dashboard from "../views/Dashboard";
import AttendanceLogs from "../views/AttendanceLogs";
import User from "../views/User";
import Login from "../views/Login";

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
            {
                path: "users",
                component: User,
            },
        ],
    },
    {
        path: "/login",
        component: Login,
    },
];

export default routes;
