import React from "react";
// import { Switch, Route, Redirect } from "react-router-dom";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Navbar from "components/Navbars/Navbar.js";
// import Footer from "components/Footer/Footer.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import routes from "routes.js";
import styles from "assets/jss/material-dashboard-react/layouts/rtlStyle.js";
import bgImage from "assets/img/sidebar-2.jpg";
import logo from "assets/img/reactlogo.png";
import Dashboard from "views/Dashboard/Dashboard";
import UserProfile from "views/UserProfile/UserProfile";
import TableList from "views/TableList/TableList";
// import { getItem } from "api/storage/storage";

let ps;

// const switchRoutes = (
//   <Switch>
//     {routes.map((prop, key) => {
//       return (
//         <>
//           {prop.layout === "/admin" &&
//             <Route
//               path={prop.layout + prop.path}
//               component={prop.component}
//               key={key}
//             />}
//         </>
//       );
//     })}
//     <Redirect to="/" />
//   </Switch>
// );


const useStyles = makeStyles(styles);

export default function Main({ ...rest }) {
  // const userId = getItem('id')
  const classes = useStyles();
  const mainPanel = React.createRef();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // const getRoute = () => {
  //   console.log(window.location.pathname !== "/auth/sign-in" && userId, "window.location.pathname !==");
  //   return (window.location.pathname !== "/auth/sign-in" && userId);
  // };

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
        {/* On the /maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}

        <div className={classes.content}>
          <div className={classes.container}>

            {window.location.pathname === "/admin/dashboard" &&
              <Dashboard />}
            {window.location.pathname === "/admin/user" &&
              <UserProfile />}
            {window.location.pathname === "/admin/courses" &&
              <TableList />}
              

          </div>
        </div>

        {/* {getRoute() ? <Footer /> : null} */}
      </div>
    </div>
  );
}
