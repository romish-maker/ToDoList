import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type addItemFormPropsType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: addItemFormPropsType) {

    const [NewTaskTitle, SetNewTaskTitle] = useState("")
    const [error, setError] = useState<string | null>(null)

    const NewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => SetNewTaskTitle(e.currentTarget.value)
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
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
        <input value={NewTaskTitle}
               onChange={NewTitleChangeHandler}
               onKeyPress={onKeyPressHandler}
               className={error ? "error" : ""}
        />
        <button onClick={addTask}>+</button>
        {error && <div className="error-message">{error}</div>}
    </div>
}