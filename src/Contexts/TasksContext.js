import { createContext, useReducer, useContext } from "react";
import todoReducer from "../Reducers/TodoReducer";

// ////// other libraries
// import uuid from 'react-uuid';
// let listOfTasks = [
//     {
//         id: uuid(),
//         title: "make some coffee",
//         description: "we need to add some details here ",
//         isCompleted: false,
//     },
//     {
//         id: uuid(),
//         title: "read some Quran",
//         description: "we need to add some details here ",
//         isCompleted: false,
//     },
//     {
//         id: uuid(),
//         title: "Play some sport",
//         description: "we need to add some details here ",
//         isCompleted: false,
//     },
// ]

const TasksContext = createContext([]);
const TasksContextDispatch = createContext(null);

export const TodosProvider = ({ children }) => {
    const [todos, TodosDispatch] = useReducer(todoReducer, []);
    return (
        <TasksContextDispatch.Provider value={{ TodosDispatch }} >
            <TasksContext.Provider value={{ todos }} >
                {children}
            </TasksContext.Provider>
        </TasksContextDispatch.Provider >
    );

}

export const useTasks = () => {
    return useContext(TasksContext);
}
export const useDispatch = () => {
    return useContext(TasksContextDispatch);
}


