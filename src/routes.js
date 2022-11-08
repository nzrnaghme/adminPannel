import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import Unarchive from "@material-ui/icons/Unarchive";
// core components/views for Admin layout
import UserProfile from "views/UserProfile/UserProfile.js";
import TableList from "views/TableList/TableList.js";
import Typography from "views/Typography/Typography.js";
import Icons from "views/Icons/Icons.js";
import Maps from "views/Maps/Maps.js";
import NotificationsPage from "views/Notifications/Notifications.js";
import UpgradeToPro from "views/UpgradeToPro/UpgradeToPro.js";
import DashboardPage from "views/Dashboard/Dashboard";
import Authentication from "layouts/Authentication";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "داشبرد",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/rtl",
  },
  {
    path: "/user",
    name: "اطلاعات کاربر",
    icon: Person,
    component: UserProfile,
    layout: "/rtl",
  },
  {
    path: "/table",
    name: "جدول",
    icon: "content_paste",
    component: TableList,
    layout: "/rtl",
  },
  {
    path: "/typography",
    name: "گرافیک",
    icon: LibraryBooks,
    component: Typography,
    layout: "/rtl",
  },
  {
    path: "/icons",
    name: "آیکن",
    icon: BubbleChart,
    component: Icons,
    layout: "/rtl",
  },
  {
    path: "/maps",
    name: "نقشه",
    icon: LocationOn,
    component: Maps,
    layout: "/rtl",
  },
  {
    path: "/notifications",
    name: "پیام ها",
    icon: Notifications,
    component: NotificationsPage,
    layout: "/rtl",
  },
  {
    path: "/upgrade-to-pro",
    name: "Upgrade To PRO",
    icon: Unarchive,
    component: UpgradeToPro,
    layout: "/rtl",
  },
  {
    path: "/auth/sign-in",
    name: "ورود",
    icon: Unarchive,
    component: Authentication,
    layout: "/auth",
  },
];

export default dashboardRoutes;
