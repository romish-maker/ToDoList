import {v1} from "uuid";
import {AddTodoListActionType, RemoveTodoListActionType} from "./todolists-reducer";
import {TasksStateType} from "../AppWithRedux";
import {TaskType} from "../Todolist";

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    taskID: string;
    todolistID: string
}
export type AddTaskActionType = {
    type: 'ADD-TASK'
    title: string
    todolistID: string
}
export type ChangeStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    todolistID: string
    isDone: boolean
    taskID: string
}
export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    todolistID: string
    title: string
    taskID: string
}

type ActionsTypes =
    RemoveTaskActionType |
    AddTaskActionType |
    ChangeTaskTitleActionType |
    AddTodoListActionType |
    RemoveTodoListActionType |
    ChangeStatusActionType

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsTypes): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].filter(t => t.id !== action.taskID)
            }
        }
        case 'ADD-TASK': {
            const newTask: TaskType = {id: v1(), title: action.title, isDone: false};
            return {
                ...state,
                [action.todolistID]: [newTask, ...state[action.todolistID]]
            };
        }
        case 'CHANGE-TASK-TITLE': {
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].map(t => t.id === action.taskID ? {...t, title: action.title} : t)
            };
        }
        case 'CHANGE-TASK-STATUS': {
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].map(t => t.id === action.taskID ? {
                    ...t,
                    isDone: action.isDone
                } : t)
            };
        }
        case 'ADD-TODOLIST': {
            return {
                ...state,
                [action.todolistId]: []
            }
        }
        case 'REMOVE-TODOLIST': {
            const copyState = {...state}
            delete copyState[action.id]
            return copyState
        }
        default:
            return state;
    }
}


export const removeTaskAC = (taskID: string, todolistID: string): RemoveTaskActionType => {
    return {
        type: 'REMOVE-TASK',
        todolistID,
        taskID

    }
}
export const addTaskAC = (title: string, todolistID: string): AddTaskActionType => {
    return {
        type: 'ADD-TASK',
        title,
        todolistID
    }
}
export const changeTaskStatusAC = (taskID: string,todolistID: string, isDone: boolean): ChangeStatusActionType => {
    return {
        type: 'CHANGE-TASK-STATUS',
        taskID,
        isDone,
        todolistID
    }
}
export const changeTaskTitleAC = (title: string, todolistID: string, taskID: string): ChangeTaskTitleActionType => {
    return {
        type: 'CHANGE-TASK-TITLE',
        title,
        todolistID,
        taskID
    }
}
