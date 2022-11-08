import React from "react";
import { BrowserRouter } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import "assets/css/material-dashboard-react.css?v=1.10.0";
import { Route, Switch, Redirect } from "react-router-dom";
import Main from "layouts/Main.js";
import Auth from "layouts/Authentication.js"


const theme = createTheme({
    direction: 'rtl', // Both here and <body dir="rtl">
});
// Create rtl cache
const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin],
});

export default function App() {

    return (
        <CacheProvider value={cacheRtl}>
            <ThemeProvider theme={theme}>
                <BrowserRouter>
                    <Switch>
                        <Route path="/" component={Main} />
                        <Route path="/auth" component={Auth} />
                        <Redirect from="/" to="/dashboard" />
                    </Switch>
                </BrowserRouter>
            </ThemeProvider>
        </CacheProvider>
    )
}