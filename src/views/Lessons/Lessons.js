import React, { useEffect, useRef, useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { getAllLesson } from "api/Core/Lesson";
import { getAllCategory } from "api/Core/Lesson";

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

export default function LessonList() {
    const classes = useStyles();
    const [allLessons, setAllLessons] = useState([])
    const allCategories = useRef([])

    const [currentPage_MainbarMyCourses, setCurrentPage_MainbarMyCourses] = useState(1);
    useEffect(() => {
        getAllCategories()
        getLessons();
        setCurrentPage_MainbarMyCourses(1)
    }, [])

    const getAllCategories = async () => {
        let response = await getAllCategory()
        allCategories.current = response.data.result
    }

    const checkCategory = (id) => {
        let category = allCategories.current.find(item => item.id === id)
        return category.name
    }

    const getLessons = async () => {
        let response = await getAllLesson();
        if (response.data.result) {
            const data = response.data.result.map((item) => (
                {
                    category: checkCategory(item.category),
                    profile: item.image,
                    name: item.lessonName,
                    description: item.description,
                    courses: item.courses.length,
                    id: item._id
                }
            ));
            setAllLessons(data)
        }
    }

    const removeLessons = (id) => {
        console.log(id, "idR");
    }

    const editLessons = (id) => {
        console.log(id, "idE");
    }



    return (
        <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
                <Card>
                    <CardHeader color="primary">
                        <h4 className={classes.cardTitleWhite}>تمام دروس</h4>

                    </CardHeader>
                    <CardBody>
                        {allLessons.length > 0 &&
                            <Table
                                tableHeaderColor="primary"
                                tableHead={["", "اسم", "دسته بندی", "توضیحات", "تعداد دوره", ""]}
                                tableData={allLessons}
                                currentPage={currentPage_MainbarMyCourses}
                                rowsCount={5}
                                removeLessons={removeLessons}
                                editLessons={editLessons}
                                lessons
                            />}
                    </CardBody>
                    <div>

                    </div>
                </Card>
            </GridItem>
        </GridContainer>
    );
}
