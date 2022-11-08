import Card from "components/Card/Card";
import CardHeader from "components/Card/CardHeader.js";
import { makeStyles } from "@material-ui/core/styles";
import "./signIn.css"
import React from "react";

const styles = {
    cardCategoryWhite: {
        color: "rgba(255,255,255,.62)",
        margin: "0",
        fontSize: "14px",
        marginTop: "0",
        marginBottom: "0",
    },
    cardTitleWhite: {
        color: "#FFFFFF",
        marginTop: "0px",
        minHeight: "auto",
        fontWeight: "300",
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: "3px",
        textDecoration: "none",
    },
};
const useStyles = makeStyles(styles);

export default function Authentication() {
    const classes = useStyles();
    return (
        <Card className="signIn">
            <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>ورود ادمین</h4>
              
            </CardHeader>
        </Card>
    )
}