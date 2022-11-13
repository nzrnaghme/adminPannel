import React, { useContext, useState } from "react";

import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
import InputAdornment from "@material-ui/core/InputAdornment";

import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Avatar from '@material-ui/core/Avatar';
import PopUpCustome from "components/PopUp/PopUp";
import RegularButton from "components/CustomButtons/Button";
import { GeneralContext } from "providers/GeneralContext";

// @material-ui/icons
import RecentActorsIcon from '@material-ui/icons/RecentActors';
import CalendarToday from '@material-ui/icons/CalendarToday';
import Call from '@material-ui/icons/Call';
import PersonIcon from '@material-ui/icons/Person';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import { registerUser } from "api/Core/Login_Register";
import photoPic from "assets/img/photo.png"

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
export default function InsertStudent(props) {
    const classes = useStyles();
    const {
        InsertSuccess,
        openPopUpInsertStudent,
        closePopUp
    } = props;
    const { setOpenToast, onToast } = useContext(GeneralContext);

    const [nameNew, setNameNew] = useState()
    const [phoneNew, setPhoneNew] = useState()
    const [birthNew, setBirthNew] = useState()
    const [emailNew, setEmailNew] = useState()
    const [passNew, setPassNew] = useState()
    const [nationalIdNew, setNationalCodeNew] = useState()

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
            setOpenToast(true)
            onToast("دانشجو اضافه شد", "success")
            InsertSuccess()
        }
    }

    return (
        <PopUpCustome
            open={openPopUpInsertStudent}
            handleClose={() => { closePopUp() }}
            className="popUpCreateStudent">
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <Card className="CardEditStudent">
                        <CardHeader color="primary">
                            <h4 className={classes.cardTitleWhite}>افزودن دانشجو</h4>
                        </CardHeader>
                        <CardBody className="bodyCreateStudent">
                            <div>
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={6}>
                                        <CustomInput
                                            rtlActive
                                            labelText="نام"
                                            value={nameNew}
                                            onChange={(e) => { setNameNew(e) }}
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
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <RecentActorsIcon className={classes.inputAdornmentIcon} />
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
                                            labelText="ایمیل"
                                            value={emailNew}
                                            formControlProps={{
                                                fullWidth: true,
                                            }}
                                            onChange={(e) => { setEmailNew(e) }}
                                            inputProps={{
                                                required: true,
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
                                            value={passNew}
                                            formControlProps={{
                                                fullWidth: true,
                                            }}
                                            onChange={(e) => { setPassNew(e) }}
                                            inputProps={{
                                                required: true,
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
                                        onClick={() => {

                                            closePopUp()
                                        }}
                                    >انصراف</RegularButton>
                                </div>

                            </div>
                        </CardBody>
                    </Card>
                </GridItem>
            </GridContainer>
        </PopUpCustome>
    )
}

InsertStudent.propTypes = {
    closePopUp: PropTypes.func,
    openPopUpInsertStudent: PropTypes.bool,
    InsertSuccess: PropTypes.func
};
