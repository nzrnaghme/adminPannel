import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

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
    root: {
        flexGrow: 1,
        maxWidth: "100%",
    },
};

const useStyles = makeStyles(styles);
export default function Support() {
    const classes = useStyles();

    return (
        <>
            <GridContainer>
                <GridItem xs={12} sm={12} md={12} >
                    <Card>
                        <CardHeader color="primary">
                            <h4 className={classes.cardTitleWhite}>پشتیبانی</h4>
                        </CardHeader>
                        <CardBody>

                        </CardBody>
                    </Card>
                </GridItem>
            </GridContainer>
        </>
    )
}