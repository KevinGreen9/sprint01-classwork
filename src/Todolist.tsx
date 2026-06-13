import {FilterValuesType, TodolistType} from './App';
import React, {ChangeEvent} from "react";
import {AddItemForm} from "./AddItemForm.tsx";


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

    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <button onClick={() => props.deleteTodolist(props.id)}>🗑️</button>
           <AddItemForm addItem={addTask} />
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



