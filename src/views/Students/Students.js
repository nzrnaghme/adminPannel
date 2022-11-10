import React, { useContext, useEffect, useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Avatar from '@material-ui/core/Avatar';

import { getAllStudet } from "api/Core/Student_Manage";
import { GeneralContext } from "providers/GeneralContext";
import { deleteStudentById } from "api/Core/Student_Manage";
import { getStudentById } from "api/Core/Student_Manage";
import PopUpCustome from "components/PopUp/PopUp";
import "./students.css"

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

export default function Students() {
    const classes = useStyles();
    const [allStudents, setAllStudents] = useState([])
    const [currentPage_MainbarMyCourses, setCurrentPage_MainbarMyCourses] = useState(1);
    const { setConfirmPopupOpen, onConfirmSetter } = useContext(GeneralContext);
    const [openEditStudent, setOpenEditStudent] = useState(false)
    const [dataStudent, setDataStudent] = useState()

    const [name, setName] = useState()
    const [phone, setPhone] = useState()
    const [birth, setBirth] = useState()
    const [email, setEmail] = useState()
    const [photo, setPhoto] = useState()
    const [nationalCode, setNationalCode] = useState()



    useEffect(() => {
        getStudents();
        setCurrentPage_MainbarMyCourses(1)
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
        setAllStudents(data)
    }

    const removeStudent = (id) => {
        onConfirmSetter("مطمئن به حذف دانشجو هستید؟", async () => {
            let response = await deleteStudentById(id)
            if (response.data.success) {
                let newStudent = allStudents.filter((item) => item.id != id);
                setAllStudents(newStudent)
            }

        }, () => { })
        setConfirmPopupOpen(true)
    }

    const editStudent = (id) => {
        getAllDataUser(id)
    }

    const getAllDataUser = async (id) => {
        let response = await getStudentById(id)
        if (response.data.result) {
            setName(response.data.result.fullName)
            setPhone(response.data.result.phoneNumber)
            setBirth(response.data.result.birthDate);
            setEmail(response.data.result.email)
            setPhoto(response.data.result.profile)
            setDataStudent(response.data.result);
            setNationalCode(response.data.result.nationalId)
            setOpenEditStudent(true);
        }
    }

    const changeActivate = (id) => {
        console.log(id, "idE");
    }

    const editCourseStudent = (id) => {
        console.log(id, "idE");
    }
    console.log(photo);

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
                                    rowsCount={5}
                                    removeStudent={removeStudent}
                                    editStudent={editStudent}
                                    changeActivate={changeActivate}
                                    editCourseStudent={editCourseStudent}
                                    student
                                />}
                        </CardBody>
                        <div>

                        </div>
                    </Card>
                </GridItem>
            </GridContainer>
            {dataStudent && openEditStudent &&
                <PopUpCustome
                    open={openEditStudent}
                    handleClose={() => { setOpenEditStudent(false) }}
                    className="popUpEditStudent">
                    <GridContainer>
                        <GridItem xs={12} sm={12} md={12}>
                            <Card className="CardEditStudent">
                                <CardHeader color="primary">
                                    <h4 className={classes.cardTitleWhite}>آپدیت دانشجو</h4>
                                </CardHeader>
                                <CardBody className="bodyEditStudent">
                                    <div>
                                        <GridContainer>
                                            <GridItem xs={12} sm={12} md={6}>
                                                <CustomInput
                                                    rtlActive
                                                    labelText="نام"
                                                    value={name}
                                                    onChange={(e) => { setName(e) }}
                                                    id="username"
                                                    formControlProps={{
                                                        fullWidth: true,
                                                    }}
                                                />
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={6}>
                                                <CustomInput
                                                    rtlActive
                                                    labelText="کد ملی"
                                                    id="company-disabled"
                                                    formControlProps={{
                                                        fullWidth: true,
                                                    }}
                                                    value={nationalCode}
                                                    onChange={(e) => { setNationalCode(e) }}
                                                />
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={12}>
                                                <CustomInput
                                                    rtlActive
                                                    labelText="ایمیل"
                                                    id="email-address"
                                                    value={email}
                                                    formControlProps={{
                                                        fullWidth: true,
                                                    }}
                                                    onChange={(e) => { setEmail(e) }}
                                                />
                                            </GridItem>
                                        </GridContainer>
                                        <GridContainer>
                                            <GridItem xs={12} sm={12} md={6}>
                                                <CustomInput
                                                    rtlActive
                                                    labelText="موبایل"
                                                    id="phone"
                                                    formControlProps={{
                                                        fullWidth: true,
                                                    }}
                                                    value={phone}
                                                    onChange={(e) => { setPhone(e) }}
                                                />
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={6}>
                                                <CustomInput
                                                    labelText="تاریخ تولد"
                                                    id="birth"
                                                    formControlProps={{
                                                        fullWidth: true,
                                                    }}
                                                    value={birth}
                                                    onChange={(e) => { setBirth(e) }}
                                                    rtlActive
                                                />
                                            </GridItem>
                                        </GridContainer>
                                    </div>
                                    <div className="photoEditStudent">
                                        <Avatar src={photo} className={classes.large} />
                                    </div>
                                </CardBody>
                            </Card>
                        </GridItem>
                    </GridContainer>
                </PopUpCustome>}
        </>
    );
}
