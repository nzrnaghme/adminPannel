import React, { useEffect, useState, useContext } from "react";

import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

import Table from "components/Table/Table.js";
import RegularButton from "components/CustomButtons/Button";
import PopUpCustome from "components/PopUp/PopUp";
import CustomInput from "components/CustomInput/CustomInput.js";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CustomSelectInput from "components/CustomInput/CustomeSelectInput";
import { Avatar } from "@mui/material";
import CustomeAutoComplete from "components/CustomInput/CustomeAutoComplete";
import { GeneralContext } from "providers/GeneralContext";

import "./lesson.css"

import { getAllCategory } from "api/Core/Lesson";
import { removeCourseById } from "api/Core/Course";
import { updateLesson } from "api/Core/Lesson";

const styles = (theme) => ({
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
    large: {
        width: theme.spacing(18),
        height: theme.spacing(18),
    },
});

const useStyles = makeStyles(styles);

export default function EditLEsson(props) {
    const classes = useStyles();
    const {
        openEditLessonPopUp,
        EditSuccess,
        closePopUpEdit,
        dataLesson,
        courseByIdLesson } = props
    const { setConfirmPopupOpen, onConfirmSetter } = useContext(GeneralContext);
    const [photoLesson, setPhotoLesson] = useState()
    const [nameLesson, setNameLesson] = useState();
    const [categoryLesson, setCategoryLesson] = useState();
    const [descriptionLesson, setDescriptionLesson] = useState();
    const [allCategories, setaAllCategories] = useState([])
    const [topicValue, setTopicValue] = useState("");
    const [allTopics, setAllTopics] = useState([])

    const [allCoursesLesson, setAllCoursesLessons] = useState([])
    const [currentPage_MainbarMyCourses, setCurrentPage_MainbarMyCourses] = useState(1);

    useEffect(() => {
        getAllCategories()
    }, [])

    useEffect(() => {
        if (dataLesson && courseByIdLesson) {
            setNameLesson(dataLesson.lessonName);
            setCategoryLesson(dataLesson.category);
            setDescriptionLesson(dataLesson.description);
            setAllTopics(dataLesson.topics);
            setPhotoLesson(dataLesson.image);
            setAllCoursesLessons(courseByIdLesson);
            setCurrentPage_MainbarMyCourses(1)
        }
    }, [dataLesson, courseByIdLesson])


    const getAllCategories = async () => {
        let response = await getAllCategory();
        let rightData = response.data.result.map((item) => ({
            _id: item.id,
            fullName: item.name
        }));
        setaAllCategories(rightData)
    }

    const updateDataLesson = async () => {
        const data = {
            lessonName: nameLesson,
            topics: allTopics,
            description: descriptionLesson,
            image: photoLesson,
            category: categoryLesson,
            id: dataLesson._id
        }
        let response = await updateLesson(data);
        if (response.data.result) {
            EditSuccess()
        }

    }

    const removeCourse = async (id) => {
        let response = await removeCourseById(id)
        if (response.data.result) {
            let newCourse = allCoursesLesson.filter((item) => item._id != id)
            setAllCoursesLessons(newCourse)
        }
    }

    return (
        <PopUpCustome
            open={openEditLessonPopUp}
            handleClose={() => { closePopUpEdit() }}
            className="popUpEditCourse">
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <Card className="CardEditCourse">
                        <CardHeader color="primary">
                            <h4 className={classes.cardTitleWhite}>آپدیت درس</h4>
                        </CardHeader>
                        <CardBody className="bodyEditCourse">
                            <div className="avatarPhotoLesson">
                                <Avatar src={photoLesson} className={classes.large} />
                            </div>
                            <div>
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={6}>
                                        <CustomInput
                                            rtlActive
                                            labelText="نام درس"
                                            value={nameLesson}
                                            onChange={(e) => { setNameLesson(e) }}

                                            formControlProps={{
                                                fullWidth: true,
                                            }}
                                        />
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={6}>

                                        {allCategories && allCategories.length > 0 && <CustomSelectInput
                                            labelText="دسته بندی"
                                            value={categoryLesson}
                                            options={allCategories}
                                            handleChange={(e) => {
                                                setCategoryLesson(e.target.value)
                                            }}

                                        />}

                                    </GridItem>

                                </GridContainer>

                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={12}>

                                        <CustomeAutoComplete
                                            labelText="موضوعات"
                                            values={allTopics}
                                            currValue={topicValue}
                                            handleChange={(e) => {
                                                setTopicValue(e.target.value)
                                            }}
                                            handleKeyUp={(e) => {
                                                if (e.keyCode == 32) {
                                                    setAllTopics((oldState) => [...oldState, e.target.value]);
                                                    setTopicValue("");
                                                }
                                            }}
                                            handleDelete={(item, index) => {
                                                console.log(allTopics, "allTopics");
                                                let deleteTopic = allTopics.find((item) => item.name === item)
                                                console.log(item, "item", deleteTopic);
                                                let arr = [...allTopics]
                                                arr.splice(index, 1)
                                                setAllTopics(arr)
                                            }}
                                        />

                                    </GridItem>
                                </GridContainer>
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={12}>
                                        <CustomInput
                                            multiline
                                            rows={5}
                                            rtlActive
                                            labelText="توضیحات"
                                            value={descriptionLesson}
                                            onChange={(e) => { setDescriptionLesson(e) }}

                                            formControlProps={{
                                                fullWidth: true,
                                            }}
                                        />
                                    </GridItem>
                                </GridContainer>
                            </div>
                            <CardHeader color="info" className="headerCourse">
                                <h4 className={classes.cardTitleWhite}>تمام دوره های درس</h4>
                            </CardHeader>
                            {allCoursesLesson && allCoursesLesson.length > 0 &&
                                <Table
                                    tableHeaderColor="primary"
                                    tableHead={["عنوان", "شروع دوره", "پابان دوره", "قیمت", ""]}
                                    tableData={allCoursesLesson}
                                    currentPage={currentPage_MainbarMyCourses}
                                    rowsCount={5}
                                    removeCourse={(id) => {
                                        onConfirmSetter("آیا برای حذف دوره اطمینان دارید؟", () => {
                                            removeCourse(id)
                                        })
                                        setConfirmPopupOpen(true)
                                    }}
                                    coursesFromLesson
                                />}
                            <div className="btnEditCourse">
                                <div style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    // position: "absolute",
                                    bottom: 20,
                                    cursor: "pointer",

                                }}>
                                    <RegularButton
                                        color="info"
                                        size="sm"
                                        onClick={() => { updateDataLesson(dataLesson._id) }}>ثبت تغییرات</RegularButton>
                                    <RegularButton
                                        color="danger"
                                        size="sm"
                                        onClick={() => { closePopUpEdit() }}>انصراف</RegularButton>
                                </div>

                            </div>
                        </CardBody>
                    </Card>
                </GridItem>
            </GridContainer>
        </PopUpCustome>
    )
}

EditLEsson.propTypes = {
    openEditLessonPopUp: PropTypes.bool,
    EditSuccess: PropTypes.func,
    closePopUpEdit: PropTypes.func,
    dataLesson: PropTypes.object,
    courseByIdLesson: PropTypes.array
};