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
import { getAllTeachers } from "api/Core/Employe_Manage";

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

export default function Teachers() {
  const classes = useStyles();
  const [allTeachers, setAllTeachers] = useState([])
  const [currentPage_MainbarMyCourses, setCurrentPage_MainbarMyCourses] = useState(1);

  useEffect(() => {
    getTeachers();
    setCurrentPage_MainbarMyCourses(1)
  }, [])



  const getTeachers = async () => {
    let response = await getAllTeachers();
    const data = response.data.result.map((item) => (
      {
        name: item.fullName,
        profile: item.profile,
        email: item.email,
        courses: item.courses.length,
        active: item.isActive,
        phone: item.phoneNumber,
        id: item._id
      }
    ));
    setAllTeachers(data)
  }

  const editTeacher = (id) => {
    console.log(id, "idE");
  }

  const changeActivate = (id) => {
    console.log(id, "idE");
  }


  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12} >
        <div className="btnAdd">
          <RegularButton color="success">افزودن استاد</RegularButton>
        </div>
      </GridItem>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>تمام اساتید</h4>

          </CardHeader>
          <CardBody>
            {allTeachers.length > 0 &&
              <Table
                tableHeaderColor="primary"
                tableHead={["", "اسم", "ایمیل", "شماره موبایل", "تعداد دوره ها", "", ""]}
                tableData={allTeachers}
                currentPage={currentPage_MainbarMyCourses}
                rowsCount={5}
                editTeacher={editTeacher}
                changeActivate={changeActivate}
                teacher
              />}
          </CardBody>
          <div>

          </div>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
