import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Navbar from "components/Navbars/Navbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import routes from "routesTeacher.js";
import styles from "assets/jss/material-dashboard-react/layouts/rtlStyle.js";
import bgImage from "assets/img/sidebar-2.jpg";
import logo from "assets/img/logo.png";
import Dashboard from "views/Dashboard/DashboardTeacher";
import UserProfile from "views/UserProfile/UserProfile";
import CourseList from "views/CourseList/CourseList";
import Planning from "views/Planning/Planning"
import News from "views/News/News";
import QuestionAnswer from "views/QuestionAnswer/QuestionAnswer";
let ps;

const useStyles = makeStyles(styles);

export default function TeacherMain({ ...rest }) {
  // const userId = getItem('id')
  const classes = useStyles();
  const mainPanel = React.createRef();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const resizeFunction = () => {
    if (window.innerWidth >= 960) {
      setMobileOpen(false);
    }
  };

  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(mainPanel.current, {
        suppressScrollX: true,
        suppressScrollY: false,
      });
      document.body.style.overflow = "hidden";
    }
    window.addEventListener("resize", resizeFunction);
    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
      window.removeEventListener("resize", resizeFunction);
    };
  }, [mainPanel]);


  return (
    <div className={classes.wrapper}>

      <Sidebar
        routes={routes}
        logoText={"Norgon"}
        logo={logo}
        image={bgImage}
        handleDrawerToggle={handleDrawerToggle}
        open={mobileOpen}
        color={"blue"}
        rtlActive
        {...rest}
      />

      <div className={classes.mainPanel} ref={mainPanel}>

        <Navbar
          routes={routes}
          handleDrawerToggle={handleDrawerToggle}
          rtlActive
          {...rest}
        />

        <div className={classes.content}>
          <div className={classes.container}>
            <Switch>
              <Route path={"/teacher/dashboard"} component={Dashboard} />
              <Route path={"/teacher/user"} component={UserProfile} />
              <Route path={"/teacher/courses"} component={CourseList} />
              <Route path={"/teacher/news"} component={News} />
              <Route path={"/teacher/planning"} component={Planning} />
              <Route path={"/teacher/questionAnswer"} component={QuestionAnswer} />

              <Redirect to="/teacher/dashboard" from="/" />
            </Switch>
          </div>
        </div>
      </div>
    </div>
  );
}
