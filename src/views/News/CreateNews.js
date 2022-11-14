import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Avatar } from "@mui/material";

import RegularButton from "components/CustomButtons/Button";
import PopUpCustome from "components/PopUp/PopUp";
import CustomInput from "components/CustomInput/CustomInput.js";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import photo from "assets/img/news.png"
import { GeneralContext } from "providers/GeneralContext";

import "./News.css"

import { createNews_Articles } from "api/Core/News";


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
export default function CreateNews(props) {
    const classes = useStyles();
    const {
        opeCreateNewsPopUp,
        closePopUpCreateNews,
        successCreateNews } = props;
    const { onToast, setOpenToast } = useContext(GeneralContext)
    const [photoNews, setPhotoNews] = useState()
    const [nameNews, setNameNews] = useState();
    const [categoryNews, setCategoryNews] = useState('news');
    const [descriptionNews, setDescriptionNews] = useState();

    useEffect(() => {
        setPhotoNews(photo)
    }, [])


    const handleChange = (event) => {
        setCategoryNews(event.target.value);
    };

    const createteNews = async () => {
        if (nameNews && categoryNews && photoNews && descriptionNews) {
            const data = {
                title: nameNews,
                category: categoryNews,
                image: photoNews,
                text: descriptionNews
            }
            let response = await createNews_Articles(data);
            if (response.data) {

                successCreateNews()
            }
        } else {
            onToast('لطفا اطلاعات وارد نمایید!', "error")
            setOpenToast(true)
        }

    }

    return (
        <PopUpCustome
            open={opeCreateNewsPopUp}
            handleClose={() => { closePopUpCreateNews() }}
            className="popUpShowEditNews">
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <Card className="CardShowEditNews">
                        <CardHeader color="primary">
                            <h4 className={classes.cardTitleWhite}>ایجاد خبر یا مقاله جدید</h4>
                        </CardHeader>
                        <CardBody className="bodyShowEditNews">
                            <div className="avatarPhotoNews">
                                <Avatar src={photoNews} className={classes.large} />
                            </div>
                            <div>
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={6}>
                                        <CustomInput
                                            rtlActive
                                            labelText="تیتر"
                                            value={nameNews}
                                            onChange={(e) => {
                                                setNameNews(e)
                                            }}
                                            formControlProps={{
                                                fullWidth: true,
                                            }}
                                            inputProps={{
                                                require: true
                                            }}
                                        />
                                    </GridItem>

                                    <GridItem xs={12} sm={12} md={12}>
                                        <CustomInput
                                            rtlActive
                                            labelText="توضیحات"
                                            multiline
                                            rows={5}
                                            formControlProps={{
                                                fullWidth: true,
                                            }}
                                            value={descriptionNews}
                                            onChange={(e) => {
                                                setDescriptionNews(e)
                                            }}
                                            inputProps={{
                                                require: true
                                            }}
                                        />
                                    </GridItem>
                                </GridContainer>
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={6}>
                                        <FormControl component="fieldset" style={{ width: "80%", marginTop: "20px" }}>
                                            <FormLabel component="legend" style={{ color: "gray", marginBottom: "-5px" }}>دسته بندی</FormLabel>
                                            <RadioGroup aria-label="news" name="news1" value={categoryNews} onChange={handleChange} style={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                                                <FormControlLabel value="news" control={<Radio color="primary" />} label="اخبار" />
                                                <FormControlLabel value="article" control={<Radio color="primary" />} label="مقاله" />
                                            </RadioGroup>
                                        </FormControl>
                                    </GridItem>
                                </GridContainer>

                            </div>
                            <div className="photoEditTeacher">
                                <div style={{
                                    display: "flex",
                                    justifyContent: "center"
                                }}>
                                    <RegularButton
                                        color="info"
                                        size="sm"
                                        onClick={() => { createteNews() }}>ثبت تغییرات</RegularButton>

                                    <RegularButton
                                        color="info"
                                        size="sm"
                                        onClick={() => { closePopUpCreateNews() }}>انصراف</RegularButton>
                                </div>

                            </div>
                        </CardBody>
                    </Card>
                </GridItem>
            </GridContainer>
        </PopUpCustome>
    )
}

CreateNews.propTypes = {
    opeCreateNewsPopUp: PropTypes.bool,
    closePopUpCreateNews: PropTypes.func,
    successCreateNews: PropTypes.func
};