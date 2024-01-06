import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

let customStyles = {
  background: "#2a2b2f",
  color: "#eee",
}

export default function EditTaskModal({ handleClose, confirmEdit, updateTaskFields, openToast, task }) {

  ///// modal props
  const handleClickClose = () => {
    handleClose("edit");
  };

  function confirmEditTask() {
    handleClose("edit");
    confirmEdit();
  }
  return (
    <Dialog open={openToast} onClose={handleClickClose}  >
      <DialogTitle style={customStyles}>Edit</DialogTitle>
      <DialogContent style={customStyles}>
        <DialogContentText style={{ ...customStyles }} color="success"
        >
          You can now edit your task title and description.
        </DialogContentText>
        <TextField autoFocus margin="dense" id="task-title" label="Task Title" type="text"
          value={task.title}
          onChange={(event) => {
            updateTaskFields({ ...task, title: event.target.value })
          }}
          fullWidth
          variant="standard"
          style={{ borderBottom: "1px solid #777", color: "#4CAF50 !important" }}
        />

        <TextField
          autoFocus
          margin="dense"
          id="task-description"
          label="task description"
          type="text"
          value={task.description}
          onChange={(event) => {
            updateTaskFields({ ...task, description: event.target.value })
          }}
          fullWidth
          variant="standard"
          style={{ borderBottom: "1px solid #777", color: "#4CAF50" }}
        />
      </DialogContent>
      <DialogActions style={customStyles}>
        <Button
          onClick={handleClickClose}
          variant="outlined"
          color="error"
        >
          Cancel
        </Button>
        <Button
          onClick={confirmEditTask}
          variant="outlined"
          color="success"
        >
          Edit
        </Button>
      </DialogActions>
    </Dialog >
  );
}
