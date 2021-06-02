import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {typeToFilter} from "./App";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}


type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string, todoListId: string) => void
    changeFilter: (value: typeToFilter,todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    changeStatus: (taskId: string, isDone: boolean, todoListId: string) => void
    filter: typeToFilter
    removeTodoList: (todoListId: string) => void
    id: string
}

export function Todolist(props: PropsType) {

    const [NewTaskTitle, SetNewTaskTitle] = useState("")
    const [error, setError] = useState<string | null>(null)
    const NewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => SetNewTaskTitle(e.currentTarget.value)
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        const {charCode} = e;
        if (charCode === 13) {
            props.addTask(NewTaskTitle,props.id)
            SetNewTaskTitle('')
        }

    }
    const onAllClickHandler = () => props.changeFilter("all", props.id)
    const onActiveClickHandler = () => props.changeFilter("active", props.id)
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id)
    const addTask = () => {
        if (NewTaskTitle.trim() !== '') {
            props.addTask(NewTaskTitle, props.id)
            SetNewTaskTitle('')
        } else {
            setError("Title is required")
        }

    }
    const removeTodoList = () => {
        props.removeTodoList(props.id)
    }

    return <div>
        <h3>{props.title} <button onClick={removeTodoList}>x</button></h3>
        <div>
            <input value={NewTaskTitle}
                   onChange={NewTitleChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? "error" : ""}
            />
            <button onClick={addTask}>+</button>
            {error && <div className="error-message">{error}</div>}
        </div>
        <ul>
            {
                props.tasks.map(t => {
                    const removeTask = () => props.removeTask(t.id, props.id)
                    const OnChangeTask = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeStatus(t.id, e.currentTarget.checked, props.id)
                    }


                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <input type="checkbox"
                               checked={t.isDone}
                               onChange={OnChangeTask}
                        />
                        <span>{t.title}</span>
                        <button onClick={removeTask}>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button className=
                        {props.filter === "all" ? "active-filter" : ""} onClick={onAllClickHandler}>All
            </button>
            <button className={props.filter === "active" ? "active-filter" : ""} onClick={onActiveClickHandler}>Active
            </button>
            <button className={props.filter === "completed" ? "active-filter" : ""}
                    onClick={onCompletedClickHandler}>Completed
            </button>
        </div>
    </div>
}
