import React, { useContext, useEffect, useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

import RegularButton from "components/CustomButtons/Button";
import PopUpCustome from "components/PopUp/PopUp";
import CustomInput from "components/CustomInput/CustomInput.js";
import Avatar from '@material-ui/core/Avatar';
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { updateStudetInform } from "api/Core/Student_Manage";
import { GeneralContext } from "providers/GeneralContext";
import CustomeDatePicker from "components/CustomeDatePicker/CustomeDatePicker"
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

export default function EditStudent(props) {
    var jalaali = require('jalaali-js')
    const classes = useStyles();
    const {
        openEditStudentPopUp,
        EditSuccess,
        closePopUpEdit,
        dataStudent } = props
    const { setOpenToast, onToast } = useContext(GeneralContext);

    const [name, setName] = useState()
    const [phone, setPhone] = useState()
    const [date, setDate] = useState()
    const [email, setEmail] = useState()
    const [photo, setPhoto] = useState()
    const [nationalId, setNationalCode] = useState()

    const [birth, setBirth] = useState();

    useEffect(() => {
        setName(dataStudent.fullName)
        setPhone(dataStudent.phoneNumber)
        setBirth(dataStudent.birthDate)
        setEmail(dataStudent.email)
        setPhoto(dataStudent.profile)
        setNationalCode(dataStudent.nationalId);
        var datePirsian = dataStudent.birthDate.split("/")
        var dateEnglish = jalaali.toGregorian(Number(datePirsian[0]), Number(datePirsian[1]), Number(datePirsian[2]))
        setDate(new Date(`${dateEnglish.gy}/${dateEnglish.gm}/${dateEnglish.gd}`))
    }, [dataStudent])


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
            setOpenToast(true)
            onToast("کاربر آپدیت شد", "success")
            EditSuccess();
        }
    }

    return (
        <PopUpCustome
            open={openEditStudentPopUp}
            handleClose={() => { closePopUpEdit() }}
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

                                            formControlProps={{
                                                fullWidth: true,
                                            }}
                                        />
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={6}>
                                        <CustomInput
                                            rtlActive
                                            labelText="کد ملی"

                                            formControlProps={{
                                                fullWidth: true,
                                            }}
                                            value={nationalId}
                                            onChange={(e) => { setNationalCode(e) }}
                                        />
                                    </GridItem>

                                </GridContainer>
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={12}>
                                        <CustomInput
                                            rtlActive
                                            labelText="ایمیل"

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

                                            formControlProps={{
                                                fullWidth: true,
                                            }}
                                            value={phone}
                                            onChange={(e) => { setPhone(e) }}
                                        />
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={6}>
                                        <CustomeDatePicker
                                            className="enterInputPanel"
                                            label="تاریخ تولد"
                                            maxDate={new Date()}
                                            onChange={(e) => {
                                                setDate(e);
                                                setBirth(`${e.year}/${e.month.number}/${e.day}`)
                                            }}
                                            value={date} />
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
EditStudent.propTypes = {
    openEditStudentPopUp: PropTypes.bool,
    EditSuccess: PropTypes.func,
    closePopUpEdit: PropTypes.func,
    dataStudent: PropTypes.object
};