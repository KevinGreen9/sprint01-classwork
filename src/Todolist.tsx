import {FilterValuesType, TodolistType} from './App';
import React, {ChangeEvent, KeyboardEvent, useState} from "react";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type PropsType = {
    id: TodolistType["id"]
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    children?: React.ReactNode
    filter: FilterValuesType
    deleteTodolist: (todolistId: string) => void
}

export const Todolist = (props: PropsType) => {

    const [title, setTitle] = useState<string>('')
    let [error, setError] = useState<string | null>(null)
    const onKeyEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === 'Enter') {
            addTask()
        }
    }

    const addTask = () => {
        if (title.trim() !== '') {
            props.addTask(title, props.id)
            setTitle('')
        } else{
            setError('Title is required')

        }
    }

    function onChangeHandler(e: ChangeEvent<HTMLInputElement>) {
        setTitle(e.currentTarget.value)
    }


    return (
        <div>
            <h3>{props.title}</h3>
            <button onClick={() => props.deleteTodolist(props.id)}>🗑️</button>
            <div>
                <input value={title}
                       onChange={onChangeHandler}
                       onKeyDown={onKeyEnter}
                       className={error ? "error" : ""}
                />
                <button onClick={addTask}>+</button>
                {error &&  <div className={"error-message"}>{error}</div>}
            </div>
            <ul>
                {
                    props.tasks.map(t => {
                            const onClickHandler = () => props.removeTask(t.id, props.id)
                            const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                props.changeStatus(t.id, e.currentTarget.checked, props.id)
                            }
                            return (
                                <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                                    <input type="checkbox"
                                           onChange={onChangeHandler}
                                           checked={t.isDone}/>

                                    <span>{t.title}</span>
                                    <button onClick={onClickHandler}>x
                                    </button>
                                </li>
                            )
                        }
                    )
                }
            </ul>
            <div>
                <button
                    className={props.filter === "all" ? "active-filter" : ''}
                    onClick={() => {
                    props.changeFilter("all", props.id)
                }}>
                    All
                </button>
                <button
                    className={props.filter === "active" ? "active-filter" : ''}
                    onClick={() => {
                    props.changeFilter("active", props.id)
                }}>
                    Active
                </button>
                <button
                    className={props.filter === "completed" ? "active-filter" : ''}
                    onClick={() => {
                    props.changeFilter("completed", props.id)
                }}>
                    Completed
                </button>
                <div>
                    {props.children}
                </div>
            </div>
        </div>
    )
}



