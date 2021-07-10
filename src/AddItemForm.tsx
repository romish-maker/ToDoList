import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

type addItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = React.memo((props: addItemFormPropsType) => {
    console.log("AddItemForm has called");
    const [NewTaskTitle, SetNewTaskTitle] = useState("")
    const [error, setError] = useState<string | null>(null)

    const NewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => SetNewTaskTitle(e.currentTarget.value)
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (NewTaskTitle.trim() === '') return
        if (error !== null) {
            setError(null);
        }
        const {charCode} = e;
        if (charCode === 13) {
            props.addItem(NewTaskTitle)
            SetNewTaskTitle('')
        }

    }
    const addTask = () => {
        if (NewTaskTitle.trim() !== '') {
            props.addItem(NewTaskTitle)
            SetNewTaskTitle('')
        } else {
            setError("Title is required")
        }

    }

    return <div>
        <TextField value={NewTaskTitle}
                   onChange={NewTitleChangeHandler}
                   title={"Type Value"}
                   label={"Type Value"}
                   onKeyPress={onKeyPressHandler}
                   error={!!error}
                   helperText={error}
                   style={ {marginBottom: "20px"}}
        />
        <IconButton onClick={addTask} color={"primary"}>
            <AddBox/>
        </IconButton>
    </div>
})