import React, { useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Card from "components/Card/Card";
import CardHeader from "components/Card/CardHeader";
import CardFooter from "components/Card/CardFooter";
import Button from "components/CustomButtons/Button.js";
import styles from "assets/jss/material-dashboard-react/views/registerPageStyle.js";
import CardBody from "components/Card/CardBody";
import CustomInput from "components/CustomInput/CustomInput.js";
// @material-ui/icons
import Face from "@material-ui/icons/Face";



const useStyles = makeStyles(styles);
export default function LoginPage() {
    const classes = useStyles();
    const [check, setCheck] = useState(false)


    const handleToggle = (value) => {
        setCheck(value.target.checked)
    };

    const login = () => {

    }

    return (
        <div className={classes.container}>
            <GridContainer justify="center">
                <GridItem xs={12} sm={6} md={4}>
                    <form onSubmit={login}>
                        <Card>
                            <CardHeader
                                className={`${classes.cardHeader} ${classes.textCenter}`} color="info">
                                <h4 className={classes.cardTitle}>ورود کارمندان</h4>
                                <div className={classes.socialLine}>
                                    {[
                                        "fa fa-facebook-square",
                                        "fa fa-twitter",
                                        "fa fa-google-plus"
                                    ].map((prop, key) => {
                                        return (
                                            <Button
                                                color="transparent"
                                                justIcon
                                                key={key}
                                                className={classes.customButtonClass}
                                            >
                                                <i className={prop} />
                                            </Button>
                                        );
                                    })}
                                </div>
                            </CardHeader>
                            <CardBody>
                                <CustomInput
                                    rtlActive
                                    labelText="ایمیل"
                                    id="name"
                                    formControlProps={{
                                        fullWidth: true,
                                        className: classes.formControlClassName
                                    }}
                                    inputProps={{
                                        required: true,
                                        name: "name",
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <Face className={classes.inputAdornmentIcon} />
                                            </InputAdornment>
                                        )
                                    }}
                                />
                                <CustomInput
                                    rtlActive
                                    labelText="رمز عبور"
                                    id="password"
                                    formControlProps={{
                                        fullWidth: true,
                                        className: classes.formControlClassName
                                    }}
                                    // error={errors}
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
                                <FormControlLabel
                                    classes={{
                                        root:
                                            classes.checkboxLabelControl +
                                            " " +
                                            classes.checkboxLabelControlClassName,
                                        label: classes.checkboxLabel
                                    }}
                                    control={
                                        <Checkbox
                                            size="small"
                                            style={{ color: "#043D72" }}
                                            onChange={handleToggle}
                                            checked={check}
                                        />
                                    }
                                    label={
                                        <span>
                                            مرا بخاطر بسپار
                                        </span>
                                    }
                                />
                            </CardBody>
                            <CardFooter className={classes.justifyContentCenter}>
                                <Button type="submit" color="info" simple size="lg" block>ورود</Button>
                            </CardFooter>
                        </Card>
                    </form>
                </GridItem>
            </GridContainer>

        </div>
    );
}
