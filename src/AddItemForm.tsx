import {ChangeEvent, KeyboardEvent, useState} from "react";

export type CreateSampleType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: CreateSampleType) {
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
        setError(null)
        if (e.key === 'Enter') {
            addTask()
        }
    }
    return <div>
        <input value={title}
               onChange={onChangeHandler}
               onKeyDown={onKeyEnter}
               className={error ? "error" : ""}
        />
        <button onClick={addTask}>+</button>
        {error && <div className={"error-message"}>{error}</div>}
    </div>
}