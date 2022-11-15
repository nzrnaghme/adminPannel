import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LocationOn from "@material-ui/icons/LocationOn";
import PeopleIcon from '@material-ui/icons/People';
// core components/views for Admin layout
import UserProfile from "views/UserProfile/UserProfile.js";
import CourseList from "views/CourseList/CourseList.js";
import Icons from "views/Icons/Icons.js";
import Planning from "views/Planning/Planning.js";
import DashboardPage from "views/Dashboard/Dashboard";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "داشبرد",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/teacher",
  },
  {
    path: "/user",
    name: "اطلاعات کاربر",
    icon: Person,
    component: UserProfile,
    layout: "/teacher",
  },
  {
    path: "/courses",
    name: "دوره ها",
    icon: "content_paste",
    component: CourseList,
    layout: "/teacher",
  },
  {
    path: "/students",
    name: "دانشجویان",
    icon: PeopleIcon,
    component: Icons,
    layout: "/teacher",
  },

  {
    path: "/planning",
    name: "برنامه روزانه",
    icon: LocationOn,
    component: Planning,
    layout: "/teacher",
  },
  
];

export default dashboardRoutes;

