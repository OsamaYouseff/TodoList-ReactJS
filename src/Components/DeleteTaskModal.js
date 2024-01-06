import * as React from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';


let customStyles = {
    background: "#2a2b2f",
    color: "white",
}

export default function DeleteTaskModal({ handleClose, handelDelete, openToast }) {

    ///// events
    const handleClickClose = () => {
        handleClose("del");
    };

    function deleteTask() {
        handleClose("del");
        handelDelete();
    }

    return (
        <Dialog
            open={openToast} keepMounted
            onClose={handleClickClose}
            aria-describedby="alert-dialog-slide-description"
            style={{ borderRadius: "10px", overflow: "hidden" }}

        >
            <DialogTitle style={customStyles} >{"Are you sure you want to delete this task?"}</DialogTitle>
            <DialogContent style={customStyles}>
                <DialogContentText style={customStyles} id="alert-dialog-slide-description">
                    If you delete this task, it will be permanently deleted.
                </DialogContentText>
            </DialogContent>
            <DialogActions style={customStyles}>
                <Button onClick={handleClickClose} variant="outlined" color="success" >Cancel</Button>
                <Button onClick={deleteTask} variant="outlined" color="error">Delete</Button>
            </DialogActions>
        </Dialog >
    );
}
