import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Main from "layouts/Main.js";

export default function Routes() {
    return (
        <Switch>
            <Route path="/" component={Main} />
            <Redirect from="/" to="/dashboard" />
        </Switch>
    )
}