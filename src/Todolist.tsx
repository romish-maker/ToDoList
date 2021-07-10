import React, {useCallback} from 'react';
import {typeToFilter} from "./AppWithRedux";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {addTaskAC} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";
import {Task} from "./Task";

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

export const Todolist = React.memo((props: PropsType) => {
    console.log("Todolist has called");
    const tasks = useSelector<AppRootState, Array<TaskType>>((state) => state.tasks[props.id])
    const dispatch = useDispatch()

    const addTask = useCallback((title: string) => {
        dispatch(addTaskAC(title, props.id))
    }, [dispatch,props])

    const removeTodoList = (() => {
        props.removeTodoList(props.id)
    })
    const changeTodoListTitle = useCallback((title: string) => {
        props.changeTodoListTitle(title, props.id)
    }, [props])

    const onAllClickHandler = useCallback(() => props.changeFilter("all", props.id),[props])
    const onActiveClickHandler = useCallback(() => props.changeFilter("active", props.id),[props])
    const onCompletedClickHandler = useCallback(() => props.changeFilter("completed", props.id),[props])


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
        <AddItemForm addItem={addTask}/>
        <div>
            {
                tasksForTodoList.map(t => <Task key={t.id} todolistID={props.id} task={t}/>)
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
})


