import {combineReducers, createStore} from "redux";
import {tasksReducer} from "./tasks-reducer";
import {todolistsReducer} from "./todolists-reducer";

export const rootReducers = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer
})
export type AppRootStateType = ReturnType<typeof rootReducers>

export const store = createStore(rootReducers)

// @ts-ignore
window.store = store