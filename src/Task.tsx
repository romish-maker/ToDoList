import React, {ChangeEvent, useCallback} from "react";
import {useDispatch} from "react-redux";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskType} from "./Todolist";

type TaskPropsType = {
    todolistID: string
    task: TaskType
}
export const Task = React.memo((props:TaskPropsType) => {
    const dispatch = useDispatch()

    const removeTask = () => dispatch(removeTaskAC(props.task.id, props.todolistID))

    const OnChangeStatusHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked
        dispatch(changeTaskStatusAC(props.task.id, props.todolistID, newIsDoneValue))
    }, [dispatch, props])
    const OnChangeTitleHandler = useCallback((newTitle: string) => {
        dispatch(changeTaskTitleAC(newTitle, props.todolistID, props.task.id))
    },[dispatch,props])

    return <div key={props.task.id} className={props.task.isDone ? "is-done" : ""}>
        <Checkbox
            checked={props.task.isDone}
            onChange={OnChangeStatusHandler}
        />
        <EditableSpan title={props.task.title} onChange={OnChangeTitleHandler}/>
        <IconButton onClick={removeTask}>
            <Delete/>
        </IconButton>
    </div>
})