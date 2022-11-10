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
import { getItem } from "api/storage/storage";
import PopUpAction from "components/PopUp/PopUpAction";
import { GeneralContext } from "providers/GeneralContext";


const theme = createTheme({
    direction: 'rtl', // Both here and <body dir="rtl">
});
// Create rtl cache
const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin],
});

export default function App() {
    const userId = getItem('id')
    const [confirm, setConfirm] = React.useState({});
    const [open, setOpen] = React.useState(false);

    const onConfirmSetter = (
        msg,
        confirmCallback,
        rejectCallback,
    ) => setConfirm({ msg, confirmCallback, rejectCallback });

    return (
        <GeneralContext.Provider value={{
            confirmPopupOpen: open,
            setConfirmPopupOpen: setOpen,
            confirmMsg: confirm.msg,
            confirmCallback: confirm.confirmCallback,
            rejectCallback: confirm.rejectCallback,
            onConfirmSetter,
        }} >
            <CacheProvider value={cacheRtl}>
                <ThemeProvider theme={theme}>
                    <BrowserRouter>
                        <PopUpAction />
                        <Switch>
                            {userId ?
                                <Route path="/admin" component={Main} /> :
                                <Route path="/auth" component={Auth} />}
                            {userId ?
                                <Redirect from="/" to="/admin/dashboard" /> :
                                <Redirect from="/" to="/auth/login-page" />}
                        </Switch>
                    </BrowserRouter>
                </ThemeProvider>
            </CacheProvider>
        </GeneralContext.Provider>
    )
}