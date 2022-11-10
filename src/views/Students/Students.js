import React, { useContext, useEffect, useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Icon from "@material-ui/core/Icon";
import InputAdornment from "@material-ui/core/InputAdornment";
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
import RegularButton from "components/CustomButtons/Button";
import { updateStudetInform } from "api/Core/Student_Manage";
import { deActiveStudentManage } from "api/Core/Student_Manage";
import { activeStudentManage } from "api/Core/Student_Manage";
import photoPic from "assets/img/photo.png"
import { registerUser } from "api/Core/Login_Register";
// @material-ui/icons
import RecentActorsIcon from '@material-ui/icons/RecentActors';
import CalendarToday from '@material-ui/icons/CalendarToday';
import Call from '@material-ui/icons/Call';
import PersonIcon from '@material-ui/icons/Person';
import MailOutlineIcon from '@material-ui/icons/MailOutline';

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
    const [nationalId, setNationalCode] = useState()

    const [openInsertStudent, setOpenInsertStudent] = useState(false)
    const [nameNew, setNameNew] = useState()
    const [phoneNew, setPhoneNew] = useState()
    const [birthNew, setBirthNew] = useState()
    const [emailNew, setEmailNew] = useState()
    const [passNew, setPassNew] = useState()
    // const [photoNew, setPhotoNew] = useState(photoPic)
    const [nationalIdNew, setNationalCodeNew] = useState()

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

    const changeActivate = async (id, active) => {
        if (active) {
            deActiveStudent(id)
        } else activeStudent(id)
    }

    const deActiveStudent = async (id) => {
        let response = await deActiveStudentManage(id)
        if (response.data.result) getStudents();
    }

    const activeStudent = async (id) => {
        let response = await activeStudentManage(id)
        if (response.data.result) getStudents()
    }

    const editCourseStudent = (id) => {
        console.log(id, "idE");
    }

    const updateDataStudent = async (id) => {
        const data = {
            id,
            fullName: name,
            email,
            phoneNumber: phone,
            birthDate: birth,
            nationalId,
            profile: photo
        }
        let response = await updateStudetInform(data)
        if (response.data.result) {
            setOpenEditStudent(false);
            getStudents();
        }
    }

    const insertStudent = async () => {
        const data = {
            fullName: nameNew,
            email: emailNew,
            phoneNumber: phoneNew,
            birthDate: birthNew,
            nationalId: nationalIdNew,
            profile: photoPic,
            password: passNew
        }
        let response = await registerUser(data);
        if (response.data.result) {
            setNameNew('');
            setEmailNew('');
            setPassNew('');
            setPhoneNew('');
            setNationalCodeNew('');
            setBirthNew('')
            setOpenInsertStudent(false);
            getStudents()
        }
    }


    return (
        <>
            <GridContainer>
                <GridItem xs={12} sm={12} md={12} >
                    <div className="btnAdd">
                        <RegularButton
                            color="success"
                            onClick={() => { setOpenInsertStudent(true) }}>افزودن دانشجو
                        </RegularButton>
                    </div>
                </GridItem>
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
                                                    value={nationalId}
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
                                        <div style={{
                                            display: "flex",
                                            flexDirection: "row",
                                            position: "absolute",
                                            bottom: 20,
                                            cursor: "pointer"
                                        }}>
                                            <RegularButton
                                                color="info"
                                                size="sm"
                                                onClick={() => { updateDataStudent(dataStudent._id) }}>ثبت تغییرات</RegularButton>
                                            <RegularButton
                                                color="danger"
                                                size="sm"
                                                onClick={() => { setOpenEditStudent(false) }}>انصراف</RegularButton>
                                        </div>

                                    </div>
                                </CardBody>
                            </Card>
                        </GridItem>
                    </GridContainer>
                </PopUpCustome>}

            {openInsertStudent &&
                <PopUpCustome
                    open={openInsertStudent}
                    handleClose={() => { setOpenInsertStudent(false) }}
                    className="popUpEditStudent">
                    <GridContainer>
                        <GridItem xs={12} sm={12} md={12}>
                            <Card className="CardEditStudent">
                                <CardHeader color="primary">
                                    <h4 className={classes.cardTitleWhite}>افزودن دانشجو</h4>
                                </CardHeader>
                                <CardBody className="bodyEditStudent">
                                    <div>
                                        <GridContainer>
                                            <GridItem xs={12} sm={12} md={6}>
                                                <CustomInput
                                                    rtlActive
                                                    labelText="نام"
                                                    value={nameNew}
                                                    onChange={(e) => { setNameNew(e) }}
                                                    id="username"
                                                    formControlProps={{
                                                        fullWidth: true,
                                                    }}
                                                    inputProps={{
                                                        required: true,
                                                        endAdornment: (
                                                            <InputAdornment position="end">
                                                                <PersonIcon className={classes.inputAdornmentIcon} />
                                                            </InputAdornment>
                                                        )
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
                                                    value={nationalIdNew}
                                                    onChange={(e) => {
                                                        if (/^[0-9]+$/i.test(e)) {
                                                            setNationalCodeNew(e)
                                                        } else setNationalCodeNew('')
                                                    }}
                                                    inputProps={{
                                                        maxLength: 10,
                                                        minLength: 10,
                                                        required: true,
                                                        name: "nationalCode",
                                                        endAdornment: (
                                                            <InputAdornment position="end">
                                                                <RecentActorsIcon className={classes.inputAdornmentIcon} />
                                                            </InputAdornment>
                                                        )
                                                    }}
                                                />
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={6}>
                                                <CustomInput
                                                    rtlActive
                                                    labelText="ایمیل"
                                                    id="email-address"
                                                    value={emailNew}
                                                    formControlProps={{
                                                        fullWidth: true,
                                                    }}
                                                    onChange={(e) => { setEmailNew(e) }}
                                                    inputProps={{
                                                        required: true,
                                                        name: "emai",
                                                        endAdornment: (
                                                            <InputAdornment position="end">
                                                                <MailOutlineIcon className={classes.inputAdornmentIcon} />
                                                            </InputAdornment>
                                                        )
                                                    }}
                                                />
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={6}>
                                                <CustomInput
                                                    rtlActive
                                                    labelText="رمز عبور"
                                                    id="pass"
                                                    value={passNew}
                                                    formControlProps={{
                                                        fullWidth: true,
                                                    }}
                                                    onChange={(e) => { setPassNew(e) }}
                                                    inputProps={{
                                                        required: true,
                                                        name: "password",
                                                        type: "password",
                                                        endAdornment: (
                                                            <InputAdornment position="end">
                                                                <Icon className={classes.inputAdornmentIcon}>
                                                                    lock_outline
                                                                </Icon>
                                                            </InputAdornment>
                                                        )
                                                    }}
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
                                                    value={phoneNew}
                                                    onChange={(e) => {
                                                        if (/^[0-9]+$/i.test(e)) {
                                                            setPhoneNew(e)
                                                        } else setPhoneNew('')
                                                    }}
                                                    inputProps={{
                                                        inputMode: "tel",
                                                        required: true,
                                                        name: "phoneNumber",
                                                        maxLength: 11,
                                                        minLength: 11,
                                                        endAdornment: (
                                                            <InputAdornment position="end">
                                                                <Call className={classes.inputAdornmentIcon} />
                                                            </InputAdornment>
                                                        )
                                                    }}
                                                />
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={6}>
                                                <CustomInput
                                                    labelText="تاریخ تولد"
                                                    id="birth"
                                                    formControlProps={{
                                                        fullWidth: true,
                                                    }}
                                                    mask={"$$$$/$$/$$"}
                                                    maskChar={"$"}
                                                    value={birthNew}
                                                    onChange={(e) => { setBirthNew(e) }}
                                                    rtlActive
                                                    inputProps={{
                                                        required: true,
                                                        name: "birthDate",
                                                        endAdornment: (
                                                            <InputAdornment position="end">
                                                                <CalendarToday className={classes.inputAdornmentIcon} />
                                                            </InputAdornment>
                                                        )
                                                    }}
                                                />
                                            </GridItem>
                                        </GridContainer>
                                    </div>
                                    <div className="photoEditStudent">
                                        <Avatar src={photoPic} className={classes.large} />
                                        <div style={{
                                            display: "flex",
                                            flexDirection: "row",
                                            position: "absolute",
                                            bottom: 20,
                                            cursor: "pointer"
                                        }}>
                                            <RegularButton
                                                color="info"
                                                size="sm"
                                                onClick={() => { insertStudent() }}>ثبت تغییرات</RegularButton>
                                            <RegularButton
                                                color="danger"
                                                size="sm"
                                                onClick={() => { setOpenInsertStudent(false) }}>انصراف</RegularButton>
                                        </div>

                                    </div>
                                </CardBody>
                            </Card>
                        </GridItem>
                    </GridContainer>
                </PopUpCustome>
            }
        </>
    );
}
