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
import { getItem } from "api/storage/storage";

// import RegularButton from "components/CustomButtons/Button";

import "./students.css";

import { getAllStudet } from "api/Core/Student_Manage";

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
        fontFamily: "bakh",
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

export default function Students() {
    const classes = useStyles();
    const userId = getItem('id')
    const [allStudents, setAllStudents] = useState([])
    const [currentPage_MainbarMyCourses, setCurrentPage_MainbarMyCourses] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    useEffect(() => {
        getStudents();
    }, [])

    const getStudents = async () => {
        let response = await getAllStudet();
        const data = response.data.result.map((item) => (
            {
                name: item.fullName,
                profile: item.profile,
                email: item.email,
                courses: item.courses.length,
                phone: item.phoneNumber,
                active: item.isActive,
                id: item._id
            }
        ));

        let v = response.data.result.filter((item) => item.course.teacher._id === userId)
        console.log(v, "1");
        setAllStudents(data)
    }

    const handleChangePage = (event, newPage) => {
        setCurrentPage_MainbarMyCourses(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setCurrentPage_MainbarMyCourses(0);
    };


    return (
        <>
            <GridContainer>

                <GridItem xs={12} sm={12} md={12}>
                    <Card>
                        <CardHeader color="primary">
                            <h4 className={classes.cardTitleWhite}>تمام دانشجویان</h4>
                        </CardHeader>
                        <CardBody>
                            {allStudents.length > 0 &&
                                <Table
                                    tableHeaderColor="primary"
                                    tableHead={["", "اسم", "ایمیل", "شماره موبایل", "تعداد دوره ها", "", ""]}
                                    tableData={allStudents}
                                    currentPage={currentPage_MainbarMyCourses}
                                    rowsCount={rowsPerPage}
                                    handleChangePage={handleChangePage}
                                    handleChangeRowsPerPage={handleChangeRowsPerPage}
                                    student
                                />}
                        </CardBody>
                        <div>

                        </div>
                    </Card>
                </GridItem>
            </GridContainer>


        </>
    );
}
