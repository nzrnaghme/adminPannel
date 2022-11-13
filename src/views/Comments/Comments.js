import React, { useEffect, useState, useContext } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
// import TabPanel from '@material-ui/lab/TabPanel';
import Tab from '@material-ui/core/Tab';
import ForumIcon from '@material-ui/icons/Forum';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import MessageIcon from '@material-ui/icons/Message';
import FeedbackIcon from '@material-ui/icons/Feedback';

import { GeneralContext } from "providers/GeneralContext";
import Table from "components/Table/Table.js";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

import ShowDataComment from "./ShowDataComment";
import AnswerComment from "./AnswerComment";

import { getComment } from "api/Core/Comment"
import { verifyComment } from "api/Core/Comment";


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
    root: {
        flexGrow: 1,
        maxWidth: "100%",
    },
};

const useStyles = makeStyles(styles);

export default function Comments() {
    const { onToast, setOpenToast } = useContext(GeneralContext);

    const classes = useStyles();
    const [value, setValue] = useState(1);
    const [currentPage_MainbarMyCourses, setCurrentPage_MainbarMyCourses] = useState(0);

    const [allComments, setAllComments] = useState();
    const [notVerifiedComment, setNotVerifiedComment] = useState();
    const [VerifiedComment, setVerifiedComment] = useState();
    const [answerComment, setAnswerComment] = useState();

    const [openPopUpShowDataComment, setOpenPopUpShowDataComment] = useState(false)
    const [dataComment, setDataComment] = useState()

    const [openAnswerPopUp, setOpenAnswerPopUp] = useState(false)

    useEffect(() => {
        getAllComments()
        setCurrentPage_MainbarMyCourses(1)
    }, [])

    const getAllComments = async () => {
        let response = await getComment();
        if (response.data) {
            setAllComments(response.data)
            setNotVerifiedComment(response.data.filter((item) => item.verified === false))
            setVerifiedComment(response.data.filter((item) => item.verified === true))
            setAnswerComment(response.data.filter((item) => item.answer))
        }
    }


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const changeVerified = async (id, verififed) => {
        if (verififed === false) {
            const data = {
                id
            }
            let response = await verifyComment(data);
            if (response.data) {
                onToast('کامنت تایید شد', 'success');
                setOpenToast(true)
                getAllComments()
            }
        }
    }


    return (
        <>
            <GridContainer>
                <GridItem xs={12} sm={12} md={12} >
                    <Card>
                        <CardHeader color="primary">
                            <h4 className={classes.cardTitleWhite}>کامنت ها</h4>
                        </CardHeader>
                        <CardBody>
                            <div className={classes.root}>

                                <Tabs
                                    value={value}
                                    onChange={handleChange}
                                    variant="fullWidth"
                                    indicatorColor="primary"
                                    textColor="primary"
                                    aria-label="icon label tabs example"
                                >
                                    <Tab icon={<MessageIcon />} value={1} label="تمام کامنت‌ها" />
                                    <Tab icon={<DoneAllIcon />} value={2} label="تایید شده" />
                                    <Tab icon={<ForumIcon />} value={3} label="پاسخ داده‌شده" />
                                    <Tab icon={<FeedbackIcon />} value={4} label="در انتظار تایید" />
                                </Tabs>

                                {value === 1 &&
                                    <>
                                        {allComments && allComments.length > 0 &&
                                            <Table
                                                tableHeaderColor="primary"
                                                tableHead={["اسم کاربر", "ایمیل کاربر", "تاریخ کامنت", "متن کامنت", "", ""]}
                                                tableData={allComments}
                                                currentPage={currentPage_MainbarMyCourses}
                                                rowsCount={5}
                                                answerToComment={(id) => {
                                                    let correntComment = allComments.filter((item) => item._id === id)
                                                    setDataComment(correntComment)
                                                    setOpenAnswerPopUp(true)
                                                }}
                                                changeVerified={changeVerified}
                                                showAllData={(id) => {
                                                    let correntComment = allComments.filter((item) => item._id === id)
                                                    setDataComment(correntComment)
                                                    setOpenPopUpShowDataComment(true);
                                                }}
                                                allComment
                                                verified
                                            />}
                                    </>
                                }

                                {value === 2 &&
                                    <>
                                        {VerifiedComment && VerifiedComment.length > 0 &&
                                            <Table
                                                tableHeaderColor="primary"
                                                tableHead={["اسم کاربر", "ایمیل کاربر", "تاریخ کامنت", "متن کامنت", "", ""]}
                                                tableData={VerifiedComment}
                                                currentPage={currentPage_MainbarMyCourses}
                                                rowsCount={5}
                                                answerToComment={(id) => {
                                                    let correntComment = allComments.filter((item) => item._id === id)
                                                    setDataComment(correntComment)
                                                    setOpenAnswerPopUp(true)
                                                }}
                                                showAllData={(id) => {
                                                    let correntComment = allComments.filter((item) => item._id === id)
                                                    setDataComment(correntComment)
                                                    setOpenPopUpShowDataComment(true);
                                                }}
                                                changeVerified={changeVerified}
                                                allComment
                                                verified
                                            />}
                                    </>
                                }

                                {value === 4 &&
                                    <>
                                        {notVerifiedComment && notVerifiedComment.length > 0 &&
                                            <Table
                                                tableHeaderColor="primary"
                                                tableHead={["اسم کاربر", "ایمیل کاربر", "تاریخ کامنت", "متن کامنت", ""]}
                                                tableData={notVerifiedComment}
                                                currentPage={currentPage_MainbarMyCourses}
                                                rowsCount={5}
                                                changeVerified={changeVerified}
                                                showAllData={(id) => {
                                                    let correntComment = allComments.filter((item) => item._id === id)
                                                    setDataComment(correntComment)
                                                    setOpenPopUpShowDataComment(true);
                                                }}
                                                allComment
                                                verified
                                            />}
                                    </>
                                }

                                {value === 3 &&
                                    <>
                                        {answerComment && answerComment.length > 0 &&
                                            <Table
                                                tableHeaderColor="primary"
                                                tableHead={["اسم کاربر", "ایمیل کاربر", "تاریخ کامنت", "متن کامنت", "پاسخ کامنت", "", ""]}
                                                tableData={answerComment}
                                                currentPage={currentPage_MainbarMyCourses}
                                                rowsCount={5}
                                                changeVerified={changeVerified}
                                                showAllData={(id) => {
                                                    let correntComment = allComments.filter((item) => item._id === id)
                                                    setDataComment(correntComment)
                                                    setOpenPopUpShowDataComment(true);
                                                }}
                                                allComment
                                            />}
                                    </>
                                }
                            </div>
                        </CardBody>
                    </Card>
                </GridItem>
            </GridContainer>

            {openPopUpShowDataComment && dataComment &&
                <ShowDataComment
                    openDataCommentPopUp={openPopUpShowDataComment}
                    dataComment={dataComment[0]}
                    closePopUpDataComment={() => {
                        setOpenPopUpShowDataComment(false);
                        setDataComment('')
                    }} />
            }

            {openAnswerPopUp && dataComment &&
                <AnswerComment
                    openAnswerCommentPopUp={openAnswerPopUp}
                    closePopUpAnswerComment={() => {
                        setOpenAnswerPopUp(false)
                    }}
                    dataComment={dataComment[0]}
                    setAnswerComment={() => {
                        onToast('جواب به کامنت ثبت شد.', "success")
                        setOpenToast(true)
                        getAllComments();
                        setOpenAnswerPopUp(false)
                    }}
                />
            }
        </>
    )
}