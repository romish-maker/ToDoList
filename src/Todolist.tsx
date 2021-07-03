import React, {ChangeEvent} from 'react';
import {typeToFilter} from "./AppWithRedux";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}


type PropsType = {
    title: string
    changeFilter: (value: typeToFilter, todoListId: string) => void
    changeTodoListTitle: (taskId: string, title: string) => void
    filter: typeToFilter
    removeTodoList: (todoListId: string) => void
    id: string
}

export function Todolist(props: PropsType) {
    const tasks = useSelector<AppRootState, Array<TaskType>>((state) => state.tasks[props.id])
    const dispatch = useDispatch()

    const removeTodoList = () => {
        props.removeTodoList(props.id)
    }

    const changeTodoListTitle = (title: string) => {
        props.changeTodoListTitle(title, props.id)
    }

    const onAllClickHandler = () => props.changeFilter("all", props.id)
    const onActiveClickHandler = () => props.changeFilter("active", props.id)
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id)


    let allTodolistsTasks = tasks
    let tasksForTodoList = allTodolistsTasks

    if (props.filter === "active") {
        tasksForTodoList = allTodolistsTasks.filter(t => !t.isDone);
    }
    if (props.filter === "completed") {
        tasksForTodoList = allTodolistsTasks.filter(t => t.isDone);
    }


    return <div>
        <h3><EditableSpan title={props.title} onChange={changeTodoListTitle}/>
            <IconButton onClick={removeTodoList}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={(title) => {
            dispatch(addTaskAC(title, props.id))
        }}/>
        <div>
            {
                tasksForTodoList.map(t => {
                    const removeTask = () => dispatch(removeTaskAC(t.id, props.id))
                    const OnChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked
                        const action = changeTaskStatusAC(t.id, props.id, newIsDoneValue)
                        dispatch(action)
                    }
                    const OnChangeTitleHandler = (newTitle: string) => {
                        dispatch(changeTaskTitleAC(t.id, newTitle, props.id))
                    }

                    return <div key={t.id} className={t.isDone ? "is-done" : ""}>
                        <Checkbox
                            checked={t.isDone}
                            onChange={OnChangeStatusHandler}
                        />
                        <EditableSpan title={t.title} onChange={OnChangeTitleHandler}/>
                        <IconButton onClick={removeTask}>
                            <Delete/>
                        </IconButton>
                    </div>
                })
            }
        </div>
        <div>
            <Button variant={props.filter === "all" ? "contained" : "text"} onClick={onAllClickHandler}>All</Button>
            <Button color={"primary"} variant={props.filter === "active" ? "contained" : "text"}
                    onClick={onActiveClickHandler}>Active</Button>
            <Button color={"secondary"} variant={props.filter === "completed" ? "contained" : "text"}
                    onClick={onCompletedClickHandler}>Completed</Button>
        </div>
    </div>
}


