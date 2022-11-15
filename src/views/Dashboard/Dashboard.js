/*eslint-disable*/
import React, { useEffect, useState } from "react";
// react plugin for creating charts
// import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import AssignmentRoundedIcon from '@material-ui/icons/AssignmentRounded';
import PeopleOutlineRoundedIcon from '@material-ui/icons/PeopleOutlineRounded';
import LocalLibraryRoundedIcon from '@material-ui/icons/LocalLibraryRounded';
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
// import ArrowUpward from "@material-ui/icons/ArrowUpward";
// import AccessTime from "@material-ui/icons/AccessTime";
// core components
import Button from "components/CustomButtons/Button.js";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

// import {
//   dailySalesChart,
//   emailsSubscriptionChart,
//   completedTasksChart,
// } from "variables/charts.js";

import styles from "assets/jss/material-dashboard-react/views/rtlStyle.js";

import avatar from "assets/img/faces/admin.jpg";
import { getAllStudet } from "api/Core/Student_Manage";
import { getAllTeachers } from "api/Core/Employe_Manage";
import { getAllCourse } from "api/Core/Course";


const useStyles = makeStyles(styles);

export default function RTLPage() {
  const classes = useStyles();

  const [countStudents, setCountStudents] = useState(0);
  const [countTeachers, setCountTeachers] = useState(0);
  const [countCourses, setCountCourses] = useState(0);

  const [allStudent, setAllStudent] = useState();
  const [currentPage_MainbarStudents, setCurrentPage_MainbarStudents] = useState(0);
  const [rowsPerPageStudents, setRowsPerPagStudents] = useState(3);

  const [allTeacher, setAllTeacher] = useState();
  const [currentPage_MainbarTeacher, setCurrentPage_MainbarTeacher] = useState(0);
  const [rowsPerPageTeacher, setRowsPerPagTeacher] = useState(3);

  useEffect(() => {
    getAllUser();
    getTeacher();
    getAllCourses();
  }, [])

  const getAllUser = async () => {
    let response = await getAllStudet();
    if (response.data.result) {
      setCountStudents(response.data.result.length);
      // const sortedActivities = (response.data.result.sort((a, b) => b.registerDate - a.registerDate));
      // console.log(sortedActivities,"sortedActivities");
      setAllStudent(response.data.result)
    }
  }

  const getTeacher = async () => {
    let response = await getAllTeachers();
    if (response.data.result) {
      setCountTeachers(response.data.result.length);
      setAllTeacher(response.data.result)
    }
  }

  const getAllCourses = async () => {
    let response = await getAllCourse();
    if (response.data.result) {
      setCountCourses(response.data.result.length);

    }
  }

  const handleChangePageStudents = (event, newPage) => {
    setCurrentPage_MainbarStudents(newPage)
  }

  const handleChangeRowsPerPageStudents = (event) => {
    setRowsPerPagStudents(+event.target.value);
    setCurrentPage_MainbarStudents(0);
  };

  const handleChangePageTeacher = (event, newPage) => {
    setCurrentPage_MainbarTeacher(newPage)
  }

  const handleChangeRowsPerPageTeacher = (event) => {
    setRowsPerPagTeacher(+event.target.value);
    setCurrentPage_MainbarTeacher(0);
  };

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={6} md={4}>
          <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <PeopleOutlineRoundedIcon />
              </CardIcon>
              <p className={classes.cardCategory}>تعداد دانشجویان</p>
              <h3 className={classes.cardTitle}>
                {countStudents} <small>نفر</small>
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Update />
                هم‌اکنون
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={4}>
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <LocalLibraryRoundedIcon />
              </CardIcon>
              <p className={classes.cardCategory}>تعداد اساتید</p>
              <h3 className={classes.cardTitle}>
                {countTeachers} <small>نفر</small>
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                ۲۴ ساعت اخیر
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={4}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <AssignmentRoundedIcon />
              </CardIcon>
              <p className={classes.cardCategory}>تعداد دوره ها</p>
              <h3 className={classes.cardTitle}>
                {countCourses} <small></small>
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <LocalOffer />
                توسط گیت‌هاب
              </div>
            </CardFooter>
          </Card>
        </GridItem>

      </GridContainer>
      {/* <GridContainer>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="success">
              <ChartistGraph
                className="ct-chart"
                data={dailySalesChart.data}
                type="Line"
                options={dailySalesChart.options}
                listener={dailySalesChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>فروش روزانه</h4>
              <p className={classes.cardCategory}>
                <span className={classes.successText}>
                  <ArrowUpward className={classes.upArrowCardCategory} /> 55%
                </span>{" "}
                رشد در فروش امروز.
              </p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> ۴ دقیقه پیش
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="warning">
              <ChartistGraph
                className="ct-chart"
                data={emailsSubscriptionChart.data}
                type="Bar"
                options={emailsSubscriptionChart.options}
                responsiveOptions={emailsSubscriptionChart.responsiveOptions}
                listener={emailsSubscriptionChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>دنبال کننده‌های ایمیلی</h4>
              <p className={classes.cardCategory}>کارایی آخرین کمپین</p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> کمپین دو روز پیش ارسال شد
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="danger">
              <ChartistGraph
                className="ct-chart"
                data={completedTasksChart.data}
                type="Line"
                options={completedTasksChart.options}
                listener={completedTasksChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>وظایف انجام شده</h4>
              <p className={classes.cardCategory}>کارایی آخرین کمپین</p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> کمپین دو روز پیش ارسال شد
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer> */}
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          {allStudent && allStudent.length > 0 &&
            <Card>
              <CardHeader color="warning">
                <h4 className={classes.cardTitleWhite}>آمار دانشجویان</h4>
                <p className={classes.cardCategoryWhite}>
                  دانشجویان جدید از ۱۵ آبان ۱۳۹۶
                </p>
              </CardHeader>
              <CardBody>
                <Table
                  tableHeaderColor="warning"
                  tableHead={["", "نام", "تعداد دروس", ""]}
                  tableData={allStudent}
                  currentPage={currentPage_MainbarStudents}
                  rowsCount={rowsPerPageStudents}
                  handleChangePage={handleChangePageStudents}
                  handleChangeRowsPerPage={handleChangeRowsPerPageStudents}
                  studentPannel
                />
              </CardBody>
            </Card>}
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          {allTeacher && allTeacher.length > 0 &&
            <Card>
              <CardHeader color="success">
                <h4 className={classes.cardTitleWhite}>آمار اساتید</h4>
                <p className={classes.cardCategoryWhite}>
                  کارکنان جدید از ۱۵ آبان ۱۳۹۶
                </p>
              </CardHeader>
              <CardBody>
                <Table
                  tableHeaderColor="warning"
                  tableHead={["", "نام", "تعداد دروس", ""]}
                  tableData={allTeacher}
                  currentPage={currentPage_MainbarTeacher}
                  rowsCount={rowsPerPageTeacher}
                  handleChangePage={handleChangePageTeacher}
                  handleChangeRowsPerPage={handleChangeRowsPerPageTeacher}
                  studentPannel
                />
              </CardBody>
            </Card>}
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <Card profile>
            <CardAvatar profile>
              <a href="#pablo" onClick={(e) => e.preventDefault()}>
                <img src={avatar} alt="..." />
              </a>
            </CardAvatar>
            <CardBody profile>
              <h6 className={classes.cardCategory}>مدیرعامل / مدیرفنی</h6>
              <h4 className={classes.cardTitle}>امیرحسین بهبودی جویباری</h4>
              <p className={classes.description}>
                دانش‌آموخته‌ی مهندسی کامپیوتر از دانشگاه علم و فناوری مازندران هستم.
                شوق و علاقه‌ی بسیار زیاد به برنامه نویسی از میل بسیار زیادم به حل مسئله نشئت میگیرد.
                در کنار برنامه نویسی در بخش طراحی نیز علاقه به یادگیری و انجام فعالیت دارم.
                زمینه‌های فعالیتم به طراحی ui/ux و توسعه بخش front سایت معطوف می‌شود.
                علاوه بر این‌ها علاقه‌ی زیادی به کار در زمینه‌ی هوش مصنوعی دارم.
              </p>
              <Button color="primary" round>
                دنبال‌کردن
              </Button>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
