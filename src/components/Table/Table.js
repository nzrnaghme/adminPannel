import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Avatar from '@material-ui/core/Avatar';
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from '@material-ui/core/TablePagination';
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import MenuBookIcon from '@material-ui/icons/MenuBook';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import { formatDate } from "constants/usefulFunc";
// core components
import styles from "assets/jss/material-dashboard-react/components/tableStyle.js";
import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";
import TextsmsIcon from '@material-ui/icons/Textsms';
import PersonIcon from '@material-ui/icons/Person';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import "./index.css"



const useStyles = makeStyles(styles);

export default function CustomTable(props) {


  const classes = useStyles();
  const {
    rowsCount,
    tableHead,
    tableData,
    tableHeaderColor,
    currentPage,
    handleChangePage,
    handleChangeRowsPerPage,
    showStudents,
    removeCourse,
    editCourse,
    courses,
    teacher,
    editTeacher,
    changeActivate,
    removeTeacher,
    student,
    removeStudent,
    editStudent,
    editCourseStudent,
    editLessons,
    removeLessons,
    lessons,
    myCourses,
    removeCourseFromStudent,
    addStudentToCourse,
    currentStudent,
    AllStudentInsertCourse,
    coursesFromLesson,
    addCourseToLesson,
    allComment,
    answerToComment,
    changeVerified,
    verified,
    showAllData,
    removeNews,
    allNewsShow,
    editNews } = props;

  return (
    <div className={classes.tableResponsive}>
      <Table className={classes.table}>
        {tableHead !== undefined ? (
          <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
            <TableRow className={classes.tableHeadRow}>
              {tableHead.map((prop, key) => {
                return (
                  <TableCell
                    className={classes.tableCell + " " + classes.tableHeadCell}
                    key={key}
                  >
                    {prop}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
        ) : null}
        <TableBody>
          {courses && tableData ? tableData.slice(currentPage * rowsCount, currentPage * rowsCount + rowsCount).map((row, index) => (
            <TableRow key={index} className={classes.tableBodyRow}>
              <TableCell className={classes.tableCell}>{row.title}</TableCell>
              <TableCell className={classes.tableCell}>{row.teacher}</TableCell>
              <TableCell className={classes.tableCell}>{(row.date)}</TableCell>
              <TableCell className={classes.tableCell}>{row.cost > 0 ? `${row.cost} ت` : 'رایگان!'}</TableCell>
              <TableCell className={classes.tableCell}>{row.capacity}</TableCell>
              <TableCell className={classes.tableCell}>{row.countStudent}</TableCell>
              <TableCell
                className={classes.tableCell}>
                <Tooltip
                  id="tooltip-top"
                  title="دانشجویان"
                  placement="top"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <IconButton
                    aria-label="Edit"
                    className={classes.tableActionButton}
                    onClick={() => {
                      showStudents(row.id)
                    }}
                  >
                    <PersonIcon
                      className={
                        classes.tableActionButtonIcon + " " + classes.PersonIcon
                      }
                    />
                  </IconButton>
                </Tooltip>

                <Tooltip
                  id="tooltip-top"
                  title="ویرایش"
                  placement="top"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <IconButton
                    aria-label="Edit"
                    className={classes.tableActionButton}
                    onClick={() => {
                      editCourse(row.id)
                    }}
                  >
                    <Edit
                      className={
                        classes.tableActionButtonIcon + " " + classes.edit
                      }
                    />
                  </IconButton>
                </Tooltip>
                <Tooltip
                  id="tooltip-top-start"
                  title="حذف"
                  placement="top"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <IconButton
                    aria-label="Close"
                    className={classes.tableActionButton}
                    onClick={() => {
                      removeCourse(row.id)
                    }}
                  >
                    <Close
                      className={
                        classes.tableActionButtonIcon + " " + classes.close
                      }
                    />
                  </IconButton>
                </Tooltip>

                <Tooltip
                  id="tooltip-top-start"
                  title="اضافه کردن دانشجو"
                  placement="top"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <IconButton
                    aria-label="Close"
                    className={classes.tableActionButton}
                    onClick={() => {
                      addStudentToCourse(row.id)
                    }}
                  >
                    <AddCircleOutlineIcon
                      className={
                        classes.tableActionButtonIcon + " " + classes.Add
                      }
                    />
                  </IconButton>
                </Tooltip>

              </TableCell>
            </TableRow>
          )) : ''}
          {teacher && tableData ? tableData.slice(currentPage * rowsCount, currentPage * rowsCount + rowsCount).map((row, index) => (
            <TableRow key={index} className={classes.tableBodyRow}>
              <TableCell className={classes.tableCell}>
                <Avatar src={row.profile} className={classes.large} />
              </TableCell>
              <TableCell className={classes.tableCell}>{row.name}</TableCell>
              <TableCell className={classes.tableCell}>{row.email}</TableCell>
              <TableCell className={classes.tableCell}>{row.phone}</TableCell>
              <TableCell className={classes.tableCell}>{row.courses}</TableCell>
              <TableCell className={classes.tableCell}>
                <div onClick={() => { changeActivate(row.id, row.active) }} className={row.active === true ? classes.ActiveTeacher : classes.deActiveTeacher}>
                  <p style={{ color: "white", paddingTop: 3 }}>{row.active === true ? "فعال" : "غیرفعال"}</p>
                </div>
              </TableCell>
              <TableCell
                className={classes.tableCell}>
                <Tooltip
                  id="tooltip-top"
                  title="ویرایش"
                  placement="top"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <IconButton
                    aria-label="Edit"
                    className={classes.tableActionButton}
                    onClick={() => {
                      editTeacher(row.id)
                    }}
                  >
                    <Edit
                      className={
                        classes.tableActionButtonIcon + " " + classes.edit
                      }
                    />
                  </IconButton>
                </Tooltip>
                <Tooltip
                  id="tooltip-top"
                  title="حذف"
                  placement="top"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <IconButton
                    aria-label="Edit"
                    className={classes.tableActionButton}
                    onClick={() => {
                      removeTeacher(row.id)
                    }}
                  >
                    <Close
                      className={
                        classes.tableActionButtonIcon + " " + classes.close
                      }
                    />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          )) : ''}
          {student && tableData ? tableData.slice(currentPage * rowsCount, currentPage * rowsCount + rowsCount).map((row, index) => (
            <TableRow key={index} className={classes.tableBodyRow}>
              <TableCell className={classes.tableCell}>
                <Avatar src={row.profile} className={classes.large} />
              </TableCell>
              <TableCell className={classes.tableCell}>{row.name}</TableCell>
              <TableCell className={classes.tableCell}>{row.email}</TableCell>
              <TableCell className={classes.tableCell}>{row.phone}</TableCell>
              <TableCell className={classes.tableCell}>{row.courses}</TableCell>
              <TableCell className={classes.tableCell}>
                <div onClick={() => { changeActivate(row.id, row.active) }} className={row.active === true ? classes.ActiveTeacher : classes.deActiveTeacher}>
                  <p style={{ color: "white", paddingTop: 3 }}>{row.active === true ? "فعال" : "غیرفعال"}</p>
                </div>
              </TableCell>
              <TableCell
                className={classes.tableCell}>
                <Tooltip
                  id="tooltip-top"
                  title="دوره ها"
                  placement="top"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <IconButton
                    aria-label="Edit"
                    className={classes.tableActionButton}
                    onClick={() => {
                      editCourseStudent(row.id)
                    }}
                  >
                    <MenuBookIcon
                      className={
                        classes.tableActionButtonIcon + " " + classes.courseShow
                      }
                    />
                  </IconButton>
                </Tooltip>
                <Tooltip
                  id="tooltip-top"
                  title="ویرایش"
                  placement="top"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <IconButton
                    aria-label="Edit"
                    className={classes.tableActionButton}
                    onClick={() => {
                      editStudent(row.id)
                    }}
                  >
                    <Edit
                      className={
                        classes.tableActionButtonIcon + " " + classes.edit
                      }
                    />
                  </IconButton>
                </Tooltip>
                <Tooltip
                  id="tooltip-top-start"
                  title="حذف"
                  placement="top"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <IconButton
                    aria-label="Close"
                    className={classes.tableActionButton}
                    onClick={() => {
                      removeStudent(row.id)
                    }}
                  >
                    <Close
                      className={
                        classes.tableActionButtonIcon + " " + classes.close
                      }
                    />
                  </IconButton>
                </Tooltip>

              </TableCell>
            </TableRow>
          )) : ''}
          {lessons && tableData ? tableData.slice(currentPage * rowsCount, currentPage * rowsCount + rowsCount).map((row, index) => (
            <TableRow key={index} className={classes.tableBodyRow}>
              <TableCell className={classes.tableCell}>
                <Avatar src={row.profile} className={classes.large} />
              </TableCell>
              <TableCell className={classes.tableCell}>{row.name}</TableCell>
              <TableCell className={classes.tableCell}>{row.category}</TableCell>
              <TableCell className={classes.tableCell}>{row.description.substring(0, 15) + '...'}</TableCell>
              <TableCell className={classes.tableCell}>{row.courses}</TableCell>
              <TableCell
                className={classes.tableCell}>

                <Tooltip
                  id="tooltip-top"
                  title="ویرایش"
                  placement="top"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <IconButton
                    aria-label="Edit"
                    className={classes.tableActionButton}
                    onClick={() => {
                      editLessons(row.id)
                    }}
                  >
                    <Edit
                      className={
                        classes.tableActionButtonIcon + " " + classes.edit
                      }
                    />
                  </IconButton>
                </Tooltip>
                <Tooltip
                  id="tooltip-top-start"
                  title="حذف"
                  placement="top"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <IconButton
                    aria-label="Close"
                    className={classes.tableActionButton}
                    onClick={() => {
                      removeLessons(row.id)
                    }}
                  >
                    <Close
                      className={
                        classes.tableActionButtonIcon + " " + classes.close
                      }
                    />
                  </IconButton>
                </Tooltip>

                <Tooltip
                  id="tooltip-top-start"
                  title="اضافه کردن دوره"
                  placement="top"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <IconButton
                    aria-label="Close"
                    className={classes.tableActionButton}
                    onClick={() => {
                      addCourseToLesson(row.id, row.profile)
                    }}
                  >
                    <AddCircleOutlineIcon
                      className={
                        classes.tableActionButtonIcon + " " + classes.Add
                      }
                    />
                  </IconButton>
                </Tooltip>

              </TableCell>
            </TableRow>
          )) : ''}

          {myCourses && tableData ? tableData.slice(currentPage * rowsCount, currentPage * rowsCount + rowsCount).map((row, index) => (
            <TableRow key={index} className={classes.tableBodyRow}>
              <TableCell className={classes.tableCell}>{row.title}</TableCell>
              <TableCell className={classes.tableCell}>{row.teacher.fullName}</TableCell>
              <TableCell className={classes.tableCell}>{formatDate(row.endDate)}</TableCell>
              <TableCell className={classes.tableCell}>{row.cost > 0 ? `${row.cost} ت` : 'رایگان!'}</TableCell>
              <TableCell className={classes.tableCell}>{formatDate(row.startDate)}</TableCell>
              <TableCell
                className={classes.tableCell}>
                <Tooltip
                  id="tooltip-top-start"
                  title="حذف دانشجو"
                  placement="top"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <IconButton
                    aria-label="Close"
                    className={classes.tableActionButton}
                    onClick={() => {
                      removeCourseFromStudent(row._id)
                    }}
                  >
                    <Close
                      className={
                        classes.tableActionButtonIcon + " " + classes.close
                      }
                    />
                  </IconButton>
                </Tooltip>

              </TableCell>
            </TableRow>
          )) : ''}

          {currentStudent && tableData ? tableData.slice(currentPage * rowsCount, currentPage * rowsCount + rowsCount).map((row, index) => (
            <TableRow key={index} className={classes.tableBodyRow}>
              <TableCell className={classes.tableCell}>
                <Avatar src={row.profile} className={classes.large} />
              </TableCell>
              <TableCell className={classes.tableCell}>{row.fullName}</TableCell>
              <TableCell className={classes.tableCell}>{row.email}</TableCell>

              <TableCell
                className={classes.tableCell}>
                <Tooltip
                  id="tooltip-top-start"
                  title="حذف"
                  placement="top"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <IconButton
                    aria-label="Add"
                    className={classes.tableActionButton}
                    onClick={() => {
                      removeStudent(row._id)
                    }}
                  >
                    <Close
                      className={
                        classes.tableActionButtonIcon + " " + classes.close
                      }
                    />
                  </IconButton>
                </Tooltip>

              </TableCell>
            </TableRow>
          )) : ''}

          {AllStudentInsertCourse && tableData ? tableData.slice(currentPage * rowsCount, currentPage * rowsCount + rowsCount).map((row, index) => (
            <TableRow key={index} className={classes.tableBodyRow}>
              <TableCell className={classes.tableCell}>
                <Avatar src={row.profile} className={classes.large} />
              </TableCell>
              <TableCell className={classes.tableCell}>{row.fullName}</TableCell>
              <TableCell className={classes.tableCell}>{row.email}</TableCell>
              <TableCell className={classes.tableCell}>{row.courses.length}</TableCell>

              <TableCell className={classes.tableCell}>
                <div className={row.isActive === true ? classes.ActiveTeacher : classes.deActiveTeacher}>
                  <p style={{ color: "white", paddingTop: 3 }}>{row.isActive === true ? "فعال" : "غیرفعال"}</p>
                </div>
              </TableCell>
              <TableCell
                className={classes.tableCell}>
                <Tooltip
                  id="tooltip-top-start"
                  title="اضافه کردن دانشجو"
                  placement="top"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <IconButton
                    aria-label="Add"
                    className={classes.tableActionButton}
                    onClick={() => {
                      addStudentToCourse(row._id)
                    }}
                  >
                    <GroupAddIcon
                      className={
                        classes.tableActionButtonIcon + " " + classes.Insert
                      }
                    />
                  </IconButton>
                </Tooltip>

              </TableCell>
            </TableRow>
          )) : ''}

          {coursesFromLesson && tableData ? tableData.slice(currentPage * rowsCount, currentPage * rowsCount + rowsCount).map((row, index) => (
            <TableRow key={index} className={classes.tableBodyRow}>
              <TableCell className={classes.tableCell}>{row.title}</TableCell>
              <TableCell className={classes.tableCell}>{formatDate(row.startDate)}</TableCell>
              <TableCell className={classes.tableCell}>{formatDate(row.endDate)}</TableCell>
              <TableCell className={classes.tableCell}>{row.cost > 0 ? `${row.cost} ت` : 'رایگان!'}</TableCell>
              <TableCell
                className={classes.tableCell}>
                <Tooltip
                  id="tooltip-top-start"
                  title="حذف"
                  placement="top"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <IconButton
                    aria-label="Close"
                    className={classes.tableActionButton}
                    onClick={() => {
                      removeCourse(row._id)
                    }}
                  >
                    <Close
                      className={
                        classes.tableActionButtonIcon + " " + classes.close
                      }
                    />
                  </IconButton>
                </Tooltip>

              </TableCell>
            </TableRow>
          )) : ''}

          {allComment && tableData ? tableData.slice(currentPage * rowsCount, currentPage * rowsCount + rowsCount).map((row, index) => (
            <TableRow key={index} className={classes.tableBodyRow} style={{ cursor: "pointer" }}>
              <TableCell className={classes.tableCell} onClick={() => { showAllData(row._id) }}>{row.username}</TableCell>
              <TableCell className={classes.tableCell} onClick={() => { showAllData(row._id) }}>{row.email}</TableCell>
              <TableCell className={classes.tableCell} onClick={() => { showAllData(row._id) }}>{formatDate(row.createDate)}</TableCell>
              <TableCell className={classes.tableCell} onClick={() => { showAllData(row._id) }}>{row.comment.substring(0, 15) + "..."}</TableCell>
              {row.answer && !verified && <TableCell className={classes.tableCell}>{row.answer.substring(0, 15) + "..."}</TableCell>}
              <TableCell className={classes.tableCell}>
                <div onClick={(e) => {
                  e.preventDefault();
                  changeVerified(row._id, row.verified)
                }} className={row.verified === true ? classes.ActiveTeacher : classes.deActiveTeacher}>
                  <p style={{ color: "white", paddingTop: 3 }}>{row.verified === true ? "تایید شده" : "تایید نشده"}</p>
                </div>
              </TableCell>
              {!row.answer && row.verified && <TableCell
                className={classes.tableCell}>
                <Tooltip
                  id="tooltip-top-start"
                  title="پاسخ به کامنت"
                  placement="top"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <IconButton
                    aria-label="Close"
                    className={classes.tableActionButton}
                    onClick={() => {
                      answerToComment(row._id)
                    }}
                  >
                    <TextsmsIcon
                      className={
                        classes.tableActionButtonIcon + " " + classes.Insert
                      }
                    />
                  </IconButton>
                </Tooltip>
              </TableCell>}
              {row.answer && row.verified && <TableCell
                className={classes.tableCell}>
                <Tooltip
                  id="tooltip-top-start"
                  title="کامنت تایید شده و جواب داده شده"
                  placement="top"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <IconButton
                    aria-label="Close"
                    className={classes.tableActionButton}
                    onClick={() => { showAllData(row._id) }}
                  >
                    <DoneAllIcon
                      className={
                        classes.tableActionButtonIcon + " " + classes.Add
                      }
                    />
                  </IconButton>
                </Tooltip>
              </TableCell>}
            </TableRow>
          )) : ''}

          {allNewsShow && tableData ? tableData.slice(currentPage * rowsCount, currentPage * rowsCount + rowsCount).map((row, index) => (
            <TableRow key={index} className={classes.tableBodyRow}>
              <TableCell className={classes.tableCell}>
                <Avatar src={row.image} className={classes.large} />
              </TableCell>
              <TableCell className={classes.tableCell}>{row.title.substring(0, 15) + '...'}</TableCell>
              <TableCell className={classes.tableCell}>{row.text.substring(0, 15) + '...'}</TableCell>
              <TableCell className={classes.tableCell}>{row.category === "news" ? "اخبار" : "مقاله"}</TableCell>
              <TableCell
                className={classes.tableCell}>

                <Tooltip
                  id="tooltip-top"
                  title="ویرایش"
                  placement="top"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <IconButton
                    aria-label="Edit"
                    className={classes.tableActionButton}
                    onClick={() => {
                      editNews(row._id)
                    }}
                  >
                    <Edit
                      className={
                        classes.tableActionButtonIcon + " " + classes.edit
                      }
                    />
                  </IconButton>
                </Tooltip>
                <Tooltip
                  id="tooltip-top-start"
                  title="حذف"
                  placement="top"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <IconButton
                    aria-label="Close"
                    className={classes.tableActionButton}
                    onClick={() => {
                      removeNews(row._id)
                    }}
                  >
                    <Close
                      className={
                        classes.tableActionButtonIcon + " " + classes.close
                      }
                    />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          )) : ''}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10]}
        component="div"
        count={tableData.length}
        rowsPerPage={rowsCount}
        page={currentPage}
        onPageChange={handleChangePage}
        labelRowsPerPage=""
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );

}

CustomTable.defaultProps = {
  tableHeaderColor: "gray",
};

CustomTable.propTypes = {
  tableHeaderColor: PropTypes.oneOf([
    "warning",
    "primary",
    "danger",
    "success",
    "info",
    "rose",
    "gray",
  ]),
  tableHead: PropTypes.arrayOf(PropTypes.string),
  tableData: PropTypes.any,
  currentPage: PropTypes.number,
  rowsCount: PropTypes.number,
  handleChangePage: PropTypes.func,
  handleChangeRowsPerPage: PropTypes.func,

  courses: PropTypes.bool,
  removeCourse: PropTypes.func,
  editCourse: PropTypes.func,
  showStudents: PropTypes.func,
  addStudentToCourse: PropTypes.func,

  teacher: PropTypes.bool,
  editTeacher: PropTypes.func,
  changeActivate: PropTypes.func,
  removeTeacher: PropTypes.func,

  student: PropTypes.bool,
  editStudent: PropTypes.func,
  removeStudent: PropTypes.func,
  editCourseStudent: PropTypes.func,

  lessons: PropTypes.bool,
  editLessons: PropTypes.func,
  removeLessons: PropTypes.func,
  addCourseToLesson: PropTypes.func,

  myCourses: PropTypes.bool,
  removeCourseFromStudent: PropTypes.func,

  currentStudent: PropTypes.bool,

  AllStudentInsertCourse: PropTypes.bool,

  coursesFromLesson: PropTypes.bool,

  allComment: PropTypes.bool,
  answerToComment: PropTypes.func,
  changeVerified: PropTypes.func,
  verified: PropTypes.bool,
  showAllData: PropTypes.func,

  removeNews: PropTypes.func,
  editNews: PropTypes.func,
  allNewsShow: PropTypes.bool
};
