import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
// core components/views for Admin layout
import UserProfile from "views/UserProfile/UserProfile.js";
import TableList from "views/TableList/TableList.js";
import Typography from "views/Typography/Typography.js";
import Icons from "views/Icons/Icons.js";
import Maps from "views/Maps/Maps.js";
import NotificationsPage from "views/Notifications/Notifications.js";
import DashboardPage from "views/Dashboard/Dashboard";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "داشبرد",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin",
  },
  {
    path: "/user",
    name: "اطلاعات کاربر",
    icon: Person,
    component: UserProfile,
    layout: "/admin",
  },
  {
    path: "/courses",
    name: "دوره ها",
    icon: "content_paste",
    component: TableList,
    layout: "/admin",
  },
  {
    path: "/typography",
    name: "گرافیک",
    icon: LibraryBooks,
    component: Typography,
    layout: "/admin",
  },
  {
    path: "/icons",
    name: "آیکن",
    icon: BubbleChart,
    component: Icons,
    layout: "/admin",
  },
  {
    path: "/maps",
    name: "نقشه",
    icon: LocationOn,
    component: Maps,
    layout: "/admin",
  },
  {
    path: "/notifications",
    name: "پیام ها",
    icon: Notifications,
    component: NotificationsPage,
    layout: "/admin",
  },
  
];

export default dashboardRoutes;

