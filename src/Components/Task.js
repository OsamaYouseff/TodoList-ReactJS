///// material UI components
import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
// import Icon from "@mui/material/Icon";

///// icons
import CheckIcon from "@mui/icons-material/Check";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";

///// others & contexts & reducers
import { useDispatch } from "../Contexts/TasksContext";
import { useToast } from "../Contexts/ToastContext";

export default function Task({ task, openEditToast, openDeleteToast, setTargetTask }) {
  //// states & contexts
  const { TodosDispatch } = useDispatch();
  const openSnakbar = useToast();


  ///// functions & events
  function handelCheckChange() {
    TodosDispatch({ type: "checkTask", payload: { task } });

    if (task.isCompleted) {
      openSnakbar("Task was checked successfully");
    } else {
      openSnakbar("Task was unchecked successfully");
    }
  }

  function handleOpenEditToast() {
    setTargetTask(task);
    openEditToast();
  }
  function handleOpenDeleteToast() {
    setTargetTask(task);
    openDeleteToast();
  }

  return (
    <>
      <Card id={task.id} style={{ height: "250px", background: "transparent", boxShadow: "2px 3px 6px #181818", overflow: "hidden", borderRadius: "8px" }} >
        <CardContent
          className="task-card"
          sx={{
            minWidth: 150,
            minHeight: 120,
            height: 120,
          }}
          style={{
            width: "100%",
            backgroundColor: task.isCompleted ? "rgb(19 143 186 / 0.2)" : "rgb(19 143 186 / 0.8)",
            textDecoration: task.isCompleted ? "line-through" : "none",
            // boxShadow: "0px 2px 6px #181818 ",
            height: "100%",
            gap: "10px",
            color: "#f05c5c",

          }}
        >
          <Grid
            container spacing={2}
            style={{
              color: "#fff",
              height: "100%"
            }}
          >
            <Grid
              className="text-container"
              style={{
                display: "grid",
                gap: "10px",
              }}
            >
              {/* task name */}
              <Typography
                variant="h5"
                sx={{
                  fontSize: 24,
                  margin: 0,
                }}
                // color="text.secondary"
                gutterBottom
              >
                {task.title}
              </Typography>
              {/* == task name == */}

              <Divider style={{ background: "#777", height: "1px" }} />

              {/* task details */}
              <Typography
                variant="h6"
                sx={{
                  fontSize: 15,
                  width: "100%",
                  textAlign: "center"

                }}
                // color="text.secondary"
                gutterBottom
              >
                {
                  task.description
                }

              </Typography>
              {/* == task details == */}
            </Grid>
            <Grid
              className="icons-container"
              style={{
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "flex-end",
                gap: "10px",

              }}
            >
              <IconButton
                className="icon-btn"
                aria-label="Check"
                onClick={
                  handelCheckChange
                }
                style={{
                  color: task.isCompleted
                    ? "#eee"
                    : "green",
                  background: task.isCompleted
                    ? "green"
                    : " #eee",
                  boxShadow: "rgb(23 23 23) 3px 3px 6px",
                }}
              >
                <CheckIcon />
              </IconButton>
              <IconButton
                className={
                  "icon-btn"
                }
                aria-label="Edit"
                onClick={
                  handleOpenEditToast
                }
                style={{
                  color: "blue",
                  background: " #eee",
                  boxShadow: "rgb(23 23 23) 3px 3px 6px",
                }}
              >
                <ModeEditIcon />
              </IconButton>
              <IconButton
                className={
                  "icon-btn"
                }
                aria-label="Delete"
                onClick={
                  handleOpenDeleteToast
                }
                style={{
                  color: "red",
                  background: " #eee",
                  boxShadow: "rgb(23 23 23) 3px 3px 6px",
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
        </CardContent>
      </Card >
    </>
  );
}