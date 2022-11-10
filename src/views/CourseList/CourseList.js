import React, { useEffect, useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import RegularButton from "components/CustomButtons/Button";

import { getAllCourse } from "api/Core/Course";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0",
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF",
    },
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1",
    },
  },
};

const useStyles = makeStyles(styles);

export default function CourseList() {
  const classes = useStyles();
  const [allCourse, setAllCourse] = useState([])
  const [currentPage_MainbarMyCourses, setCurrentPage_MainbarMyCourses] = useState(1);
  useEffect(() => {
    getCourses();
    setCurrentPage_MainbarMyCourses(1)
  }, [])

  const getCourses = async () => {
    let response = await getAllCourse();
    if (response.data.result) {
      const data = response.data.result.map((item) => (
        {
          title: item.title,
          teacher: item.teacher.fullName,
          date: item.startDate.split("T")[0],
          cost: item.cost,
          capacity: item.students.length + item.capacity,
          id: item._id
        }
      ));
      setAllCourse(data)
    }
  }

  const removeCourse = (id) => {
    console.log(id, "idR");
  }

  const editCourse = (id) => {
    console.log(id, "idE");
  }

  const showStudents = (id) => {
    console.log(id, "idS");
  }


  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12} >
        <div className="btnAdd">
          <RegularButton color="success">افزودن دوره</RegularButton>
        </div>
      </GridItem>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>تمام دوره ها</h4>

          </CardHeader>
          <CardBody>
            {allCourse.length > 0 &&
              <Table
                tableHeaderColor="primary"
                tableHead={["عنوان", "استاد", "شروع دوره", "قیمت", "گنجایش", ""]}
                tableData={allCourse}
                currentPage={currentPage_MainbarMyCourses}
                rowsCount={5}
                removeCourse={removeCourse}
                editCourse={editCourse}
                showStudents={showStudents}
                courses
              />}
          </CardBody>
          <div>

          </div>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
