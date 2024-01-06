
import { createContext, useState, useContext } from "react";
import SnackBar from "../Components/SnackBar";

const ToastContext = createContext({})


export const ToastProvider = function ({ children }) {
    ///// snackbar
    const [snakbarMsg, setSnakbarMsg] = useState(false);
    const [openSnakbar, setOpenSnakbar] = useState(false);

    function handelOpenSnackBar(message) {
        setSnakbarMsg(message);
        setOpenSnakbar(true);
    }
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnakbar(false);
    };

    return (
        <>
            <SnackBar open={openSnakbar} handleClose={handleClose} message={snakbarMsg} />
            <ToastContext.Provider value={handelOpenSnackBar}> {children}</ToastContext.Provider>
        </>
    );

}

////// making a custom Hook

export const useToast = () => {
    const context = useContext(ToastContext);
    if (context === undefined) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
}
