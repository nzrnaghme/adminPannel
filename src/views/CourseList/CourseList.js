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
import { removeCourseById } from "api/Core/Course";
import { getCourseById } from "api/Core/Course";
import EditCourse from "./EditCourse";
import ListOfStudents from "./ListOfStudent";
import CreateCourse from "./CreateCourse";
import AddStudentToCourse from "./AddStudentToCourse";

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
  const [courseDetail, setCourseDetail] = useState()
  const [openPopUpEditCourse, setOpenPopUpEditCourse] = useState(false)

  const [idForStudents, setIdForStudents] = useState()
  const [openPopUpStudentsCourse, setOpenPopUpStudentsCourse] = useState(false)

  const [openPopUpCreateCourse, setOpenPopUpCreateCourse] = useState(false)

  const [openPopUpaddStudent, setOpenPopUpaddStudent] = useState(false)



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
          countStudent: item.students.length,
          id: item._id
        }
      ));
      setAllCourse(data)
    }
  }

  const removeCourse = async (id) => {
    let response = await removeCourseById(id)
    if (response.data.result) {
      let newCourse = allCourse.filter((item) => item.id != id);
      setAllCourse(newCourse)
    }
  }

  const editCourse = async (id) => {
    let response = await getCourseById(id);
    if (response.data.result) {
      setCourseDetail(response.data.result)
      setOpenPopUpEditCourse(true)
    }
  }

  const showStudents = (id) => {
    setIdForStudents(id)
    setOpenPopUpStudentsCourse(true)
  }

  const createCourse = () => {
    setOpenPopUpCreateCourse(true)
  }

  const addStudentToCourse = (idCourse) => {
    setOpenPopUpaddStudent(true)
    setIdForStudents(idCourse)
  }


  return (
    <>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12} >
          <div className="btnAdd">
            <RegularButton color="success" onClick={() => { createCourse() }}>افزودن دوره</RegularButton>
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
                  tableHead={["عنوان", "استاد", "شروع دوره", "قیمت", "گنجایش", "تعداد دانشجویان دوره", ""]}
                  tableData={allCourse}
                  currentPage={currentPage_MainbarMyCourses}
                  rowsCount={5}
                  removeCourse={removeCourse}
                  editCourse={editCourse}
                  showStudents={showStudents}
                  addStudentToCourse={addStudentToCourse}
                  courses
                />}
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>

      {openPopUpEditCourse && courseDetail &&
        <EditCourse
          dataCourse={courseDetail}
          openEditCoursePopUp={openPopUpEditCourse}
          closePopUpEdit={() => { setOpenPopUpEditCourse(false) }}
          EditSuccess={() => {
            getCourses()
            setOpenPopUpEditCourse(false)
          }} />}

      {openPopUpStudentsCourse && idForStudents &&
        <ListOfStudents
          userIdCourse={idForStudents}
          openListStudentPopUp={openPopUpStudentsCourse}
          closePopUpList={() => { setOpenPopUpStudentsCourse(false) }}
          RemoveSuccess={() => {
            getCourses()
            setOpenPopUpStudentsCourse(false)
          }}
        />}

      {openPopUpCreateCourse &&
        <CreateCourse
          openCreateCoursePopUp={openPopUpCreateCourse}
          CreateSuccess={() => {
            getCourses();
            setOpenPopUpCreateCourse(false)
          }}
          closePopUpCreate={() => {
            setOpenPopUpCreateCourse(false)
          }} />
      }
      {openPopUpaddStudent && idForStudents &&
        <AddStudentToCourse
          openAddStudentPopUp={openPopUpaddStudent}
          userIdCourse={idForStudents}
          closePopUpAdd={() => {
            setOpenPopUpaddStudent(false)
          }}
          AddSuccess={() => {
            getCourses();
            setOpenPopUpaddStudent(false)
          }}
        />
      }
    </>
  );
}
