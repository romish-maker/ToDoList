import React, {ChangeEvent, useCallback, useState} from "react";
import { TextField } from "@material-ui/core";

type EditableSpanPropType = {
    title: string
    onChange: (newTitle: string) => void
}

export const EditableSpan = React.memo((props: EditableSpanPropType) => {
    console.log("EditableSpan has called");
    const [editMode, setEditMode] = useState(false);
    const [title, setTitle] = useState("");

    const activateEditMode = useCallback(() => {
        setEditMode(true);
        setTitle(props.title);
    },[props])
    const activateViewMode = useCallback(() => {
        setEditMode(false);
        props.onChange(title)
    },[props, title])
    const OnChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    return editMode ?
        <TextField
            value={title}
            onBlur={activateViewMode}
            autoFocus
            onChange={OnChangeTitleHandler}
        />
        : <span onDoubleClick={activateEditMode}>{props.title}</span>
})