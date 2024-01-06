////// others
import uuid from 'react-uuid';

export default function todoReducer(currentTodo = [], action) {

    switch (action.type) {

        case "addTask": {
            if (action.payload.newTitleInput === "") {
                return;
            }
            let newTask = {
                id: uuid(),
                title: action.payload.newTitleInput,
                description: "",
                isCompleted: false
            }

            const updatedTodos = [...currentTodo, newTask];
            // setTodos(updatedTodos);
            localStorage.setItem("tasks", JSON.stringify(updatedTodos));
            // setTitleInput("");
            // openSnakbar("Task was added successfully");
            return updatedTodos;
        }

        case "deleteTask": {
            const updatedTodo = currentTodo.filter((tsk) => tsk.id !== action.payload.targetTask.id);
            localStorage.setItem("tasks", JSON.stringify(updatedTodo));
            return updatedTodo;
        }

        case "editTask": {
            const updatedTodo = currentTodo.map((tsk) => {
                if (tsk.id === action.payload.targetTask.id) {
                    tsk.title = action.payload.targetTask.title || tsk.title;
                    tsk.description = action.payload.targetTask.description || tsk.description;
                }
                return tsk;
            });
            localStorage.setItem("tasks", JSON.stringify(updatedTodo));
            return updatedTodo;
        }

        case "fetchLocalStorage": {
            let localStorageTasks = JSON.parse(localStorage.getItem("tasks"));
            if (localStorageTasks) {
                return localStorageTasks;
            } else {
                return currentTodo;
            }
        }

        case "checkTask": {
            const updatedTodo = currentTodo.map((tsk) => {
                if (tsk.id === action.payload.task.id) {
                    // tsk.isCompleted = !tsk.isCompleted; ////// this a mutation not allowed in react
                    tsk = { ...tsk, isCompleted: !tsk.isCompleted };
                }
                return tsk;
            });
            localStorage.setItem("tasks", JSON.stringify(updatedTodo));
            return updatedTodo;
        }

        default: {
            throw new Error(`Unhandled action type: ${action.type}`);
        }
    }
}