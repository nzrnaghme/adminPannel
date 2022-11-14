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
import routes from "routes.js";
import styles from "assets/jss/material-dashboard-react/layouts/rtlStyle.js";
import bgImage from "assets/img/sidebar-2.jpg";
import logo from "assets/img/reactlogo.png";
import Dashboard from "views/Dashboard/Dashboard";
import UserProfile from "views/UserProfile/UserProfile";
import CourseList from "views/CourseList/CourseList";
import Teachers from "views/Teachers/Teachers";
import Icons from "views/Icons/Icons";
import Students from "views/Students/Students"
import LessonList from "views/Lessons/Lessons";
import Comments from "views/Comments/Comments";
import News from "views/News/News";
import Planning from "views/Planning/Planning"
let ps;

const useStyles = makeStyles(styles);

export default function Main({ ...rest }) {
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
        color={"green"}
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
              <Route path={"/admin/dashboard"} component={Dashboard} />
              <Route path={"/admin/user"} component={UserProfile} />
              <Route path={"/admin/courses"} component={CourseList} />
              <Route path={"/admin/Teachers"} component={Teachers} />
              <Route path={"/admin/icons"} component={Icons} />
              <Route path={"/admin/students"} component={Students} />
              <Route path={"/admin/lessons"} component={LessonList} />
              <Route path={"/admin/comments"} component={Comments} />
              <Route path={"/admin/news"} component={News} />
              <Route path={"/admin/planning"} component={Planning} />
              <Redirect to="/admin/dashboard" from="/" />
            </Switch>
          </div>
        </div>
      </div>
    </div>
  );
}
