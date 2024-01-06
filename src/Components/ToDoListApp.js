//// styles files
import * as React from "react";

///// Material UI components
import "./ToDoListApp.css";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import ToggleGroup from "./ToggleGroup";
import Grid from "@mui/material/Unstable_Grid2";
import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField';


///// custom components & contexts
import Task from "./Task";
import DeleteTaskModal from "./DeleteTaskModal";
import EditTaskModal from "./EditTaskModal";
import { useState, useEffect, useMemo } from "react";
import { useTasks, useDispatch } from "../Contexts/TasksContext";
import { useToast } from "../Contexts/ToastContext";

export default function ToDoListApp() {
  ///// states & contexts & reducers
  const { todos } = useTasks();
  const { TodosDispatch } = useDispatch();
  const [titleInput, setTitleInput] = useState("");
  const [filter, setFilter] = useState("all"); ///// "all", "incomplete", "completed"
  const [showDelModal, setShowDelModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [targetTask, setTargetTask] = useState({});
  const openSnakbar = useToast();

  ///// functions
  ////// only call this function when the page loads
  useEffect(() => {
    TodosDispatch({ type: "fetchLocalStorage" });
  }, []);

  function handleFilter(type) {
    setFilter(type);
  }
  ///// Modals & events

  /// add tasks handler ///
  function addNewTask() {
    TodosDispatch({ type: "addTask", payload: { newTitleInput: titleInput } });
    setTitleInput("");
    openSnakbar("Task was added successfully");
  }

  /// == add tasks handlers == ///

  /// delete tasks handlers ///

  function handelDeleteTask() {
    TodosDispatch({ type: "deleteTask", payload: { newTitleInput: titleInput, targetTask: targetTask } });
    openSnakbar("Task was deleted successfully");
  }
  function openDeleteToast() {
    setShowDelModal(true);
  }
  /// == delete tasks handlers ==


  //// edit tasks handlers ////
  function confirmEditTask() {
    TodosDispatch({ type: "editTask", payload: { targetTask: targetTask } });
    openSnakbar("Task was Edited successfully");
  }

  function openEditToast() {
    setShowEditModal(true);
  }
  ////== edit tasks handlers ==
  function handleClose(type) {
    if (type === "del") {
      setShowDelModal(false);
    }
    if (type === "edit") {
      setShowEditModal(false);
    }
  }
  ///// target task state
  function setNewTargetTask(task) {
    setTargetTask(task);
  }

  function updateTaskFields(task) {
    setTargetTask({ ...task });
  }

  ///// list rendering for tasks & filtration tasks
  let filteredTasks = todos ?? [];
  ///// use Memo it's a hook that returns a memoized value without any need to recalculate the value each time the component re-renders
  ///// you decide what time is suitable to recalculate the value or not by adding it in '[]' in the useMemo

  const completed = useMemo(() => {
    return todos.filter((tsk) => tsk.isCompleted);

  }, [todos]);

  const incomplete = useMemo(() => {
    return todos.filter((tsk) => !tsk.isCompleted);
  }, [todos]);

  if (filter === "completed") {
    filteredTasks = completed;
  }
  else if (filter === "incomplete") {
    filteredTasks = incomplete;
  }
  //// list rendering
  filteredTasks = filteredTasks.map((tsk) => {
    return <Task key={tsk.id} task={tsk} openDeleteToast={openDeleteToast} openEditToast={openEditToast} setTargetTask={setNewTargetTask} />
  })
  return (
    <React.Fragment >
      {/* Dialogs modals */}
      <DeleteTaskModal openToast={showDelModal} handleClose={handleClose} handelDelete={handelDeleteTask} />
      <EditTaskModal openToast={showEditModal} handleClose={handleClose} confirmEdit={confirmEditTask} updateTaskFields={updateTaskFields} task={targetTask} />
      {/* Dialogs modals */}

      <CssBaseline />
      <Container maxWidth="xl">
        <Card className="card" sx={{ minWidth: 150, minHeight: 150 }} >
          <CardContent
            style={{
              width: "100%",
              justifyContent: "center",
              height: "86vh",
            }}
          >
            {/* filter buttons */}
            <ToggleGroup handelFilter={handleFilter} />
            {/* == filter buttons == */}
            {/* tasks container */}
            <div className="Tasks-container" >
              {/* task card */}
              {filteredTasks}
              {/* == task card == */}
            </div>
            {/* == tasks container == */}


            {/* add new task btn + input  */}
            <Grid
              container
              spacing={2}
              style={{
                color: "#fff",
                margin: "5px 0px",
                borderRadius: "10px",
                overFlow: "hidden !important",
                Scale: "0.4",
              }}
            >
              <Grid
                xs={3}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  textAlign: "start",
                  gap: "10px",
                }}
              >
                <Button variant="contained" color="primary" onClick={addNewTask}
                  style={{ width: "100%", height: "100%", border: "1px solid #777", color: "#eee", background: "#181818" }}
                  disabled={titleInput.length <= 0}
                >
                  Add
                </Button>
              </Grid>
              <Grid
                xs={9}
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                  gap: "10px",
                  color: "#eee important"
                }}
              >
                <TextField className="task-input" id="outlined-basic" style={{ width: "100%" }} onChange={(event) => { setTitleInput(event.target.value); }}
                  value={titleInput} label="Enter a new task" variant="outlined" />

              </Grid>
            </Grid>
            {/* == add new task btn + input  == */}
          </CardContent>
        </Card>
      </Container>
    </React.Fragment >
  );
}