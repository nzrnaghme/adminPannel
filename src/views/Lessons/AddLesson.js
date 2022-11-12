import React, { useEffect, useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

import RegularButton from "components/CustomButtons/Button";
import PopUpCustome from "components/PopUp/PopUp";
import CustomInput from "components/CustomInput/CustomInput.js";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CustomeAutoComplete from "components/CustomInput/CustomeAutoComplete";
import CustomSelectInput from "components/CustomInput/CustomeSelectInput";
import photo from "assets/img/intro.png"
import { Avatar } from "@mui/material";

import { getAllCategory } from "api/Core/Lesson";

import "./lesson.css"
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
export default function AddLesson(props) {
    const classes = useStyles();
    const {
        openAddLessonPopUp,
        AddSuccess,
        closePopUpAdd } = props

    const [photoLesson, setPhotoLesson] = useState()
    const [nameLesson, setNameLesson] = useState();
    const [categoryLesson, setCategoryLesson] = useState();
    const [descriptionLesson, setDescriptionLesson] = useState();
    const [allCategories, setaAllCategories] = useState([])
    const [topicValue, setTopicValue] = useState("");
    const [allTopics, setAllTopics] = useState([])

    useEffect(() => {
        getAllCategories()
        setPhotoLesson(photo)
    }, [])

    const getAllCategories = async () => {
        let response = await getAllCategory();
        let rightData = response.data.result.map((item) => ({
            _id: item.id,
            fullName: item.name
        }));
        setaAllCategories(rightData)
    }

    const addLessonNew = async()=>{
        AddSuccess()
    }

    return (
        <PopUpCustome
            open={openAddLessonPopUp}
            handleClose={() => { closePopUpAdd() }}
            className="popUpEditCourse">
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <Card className="CardEditCourse">
                        <CardHeader color="primary">
                            <h4 className={classes.cardTitleWhite}>ایجاد درس</h4>
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
                                        onClick={() => { addLessonNew() }}>ثبت تغییرات</RegularButton>
                                    <RegularButton
                                        color="danger"
                                        size="sm"
                                        onClick={() => { closePopUpAdd() }}>انصراف</RegularButton>
                                </div>

                            </div>
                        </CardBody>
                    </Card>
                </GridItem>
            </GridContainer>
        </PopUpCustome>
    )
}

AddLesson.propTypes = {
    openAddLessonPopUp: PropTypes.bool,
    AddSuccess: PropTypes.func,
    closePopUpAdd: PropTypes.func,
};