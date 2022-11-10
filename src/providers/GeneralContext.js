import { createContext } from "react";

export const GeneralContext = createContext({
    confirmMsg: null,
    confirmPopupOpen: false,
    setConfirmPopupOpen: () => { },
    confirmCallback: () => { },
    rejectCallback: () => { },
    onConfirmSetter: (msg, confirmCallback, rejectCallback) => { console.log(msg); console.log(rejectCallback); console.log(confirmCallback); },
});