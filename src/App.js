import "./App.css";
import * as React from "react";
import ToDoListApp from "./Components/ToDoListApp";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from "./Components/Header";

///// others
import { ToastProvider } from "./Contexts/ToastContext";
import { TodosProvider } from "./Contexts/TasksContext";

///// project theme  /////
const theme = createTheme({
    palette: {
        primary: {
            main: "#eee",
        },
        secondary: {
            main: "#8b8b8b",
        },
    },
});
///// == project theme == /////



export default function App() {
    return (
        <div className="App" >
            <ThemeProvider theme={theme} >
                <TodosProvider>
                    <ToastProvider>
                        <Header />
                        <ToDoListApp />
                    </ToastProvider>
                </TodosProvider>
            </ThemeProvider>
        </div>
    );
};
