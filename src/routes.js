import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import PeopleIcon from '@material-ui/icons/People';
import AssignmentIcon from '@material-ui/icons/Assignment';
// core components/views for Admin layout
import UserProfile from "views/UserProfile/UserProfile.js";
import CourseList from "views/CourseList/CourseList.js";
import Teachers from "views/Teachers/Teachers.js";
import Icons from "views/Icons/Icons.js";
import Maps from "views/Maps/Maps.js";
import NotificationsPage from "views/Notifications/Notifications.js";
import DashboardPage from "views/Dashboard/Dashboard";
import LessonList from "views/Lessons/Lessons";

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
    component: CourseList,
    layout: "/admin",
  },
  {
    path: "/Teachers",
    name: "اساتید",
    icon: LocalLibraryIcon,
    component: Teachers,
    layout: "/admin",
  },
  {
    path: "/students",
    name: "دانشجویان",
    icon: PeopleIcon,
    component: Icons,
    layout: "/admin",
  },
  {
    path: "/lessons",
    name: "درس ها",
    icon: AssignmentIcon,
    component: LessonList,
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

