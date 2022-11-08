import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Main from "layouts/Main.js";
import UserProfile from "views/UserProfile/UserProfile";

export default function Routes() {
    return (
        <Switch>
            <Route path="/" component={Main} />
            <Route path="/user-profile" component={UserProfile} />
            <Redirect from="/" to="/dashboard" />
        </Switch>
    )
}