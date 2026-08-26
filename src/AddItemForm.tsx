import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import { IconButton, TextField} from "@mui/material";
import {ControlPoint} from "@mui/icons-material";

export type CreateSampleType = {
    addItem: (title: string) => void
}

export const  AddItemForm = React.memo ((props: CreateSampleType)=> {
    const [title, setTitle] = useState<string>('')
    let [error, setError] = useState<string | null>(null)

    function onChangeHandler(e: ChangeEvent<HTMLInputElement>) {
        setTitle(e.currentTarget.value)
    }

    const addTask = () => {
        if (title.trim() !== '') {
            props.addItem(title)
            setTitle('')
        } else {
            setError('Title is required')

        }
    }

    const onKeyEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        if(error !== null) {
           setError(null)
       }
        if (e.key === 'Enter') {
            addTask()
        }
    }
    return <div>
        <TextField value={title}
                   variant={"outlined"}
                   label={'Type value'}
                   onChange={onChangeHandler}
                   onKeyDown={onKeyEnter}
                   error={!!error}
                   helperText={error}
        />
        <IconButton onClick={addTask}>
            <ControlPoint color={'primary'}/>
        </IconButton>
    </div>
}
)