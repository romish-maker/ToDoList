import {TodoListType, typeToFilter} from "../AppWithRedux";
import {v1} from "uuid";

export type RemoveTodoListActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}
export type AddTodoListActionType = {
    type: 'ADD-TODOLIST'
    title: string
    todolistId: string
}
export type ChangeTodoListTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}
export type ChangeTodoListFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: typeToFilter // may be error, carefully
}
type ActionsTypes =
    RemoveTodoListActionType
    | AddTodoListActionType
    | ChangeTodoListTitleActionType
    | ChangeTodoListFilterActionType

const initialState: Array<TodoListType> = []

export const todolistsReducer = (state: Array<TodoListType> = initialState, action: ActionsTypes): Array<TodoListType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.id)

        }
        case 'ADD-TODOLIST': {
            return [{
                id: action.todolistId,
                title: action.title,
                filter: "all"
            }, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            const titleForTodoList = state.map(t => t.id === action.id
                ? {...t, title: action.title}
                : t);
            return [...titleForTodoList]
        }
        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        }
        default:
            return state;
    }
}


export const removeTodoListAC = (todolistId: string): RemoveTodoListActionType => {
    return {
        type: 'REMOVE-TODOLIST',
        id: todolistId
    }
}
export const addTodolistAC = (title: string): AddTodoListActionType => {
    return {
        type: 'ADD-TODOLIST',
        title: title,
        todolistId: v1()
    }
}
export const changeTodolistTitleAC = (title: string, id: string): ChangeTodoListTitleActionType => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        title: title,
        id: id
    }
}
export const changeTodolistFilterAC = (filter: typeToFilter, id: string): ChangeTodoListFilterActionType => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        id: id,
        filter: filter
    }
}