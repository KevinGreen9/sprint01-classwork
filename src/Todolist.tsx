import {FilterValuesType, TodolistType} from './App';
import React, {ChangeEvent} from "react";
import {AddItemForm} from "./AddItemForm.tsx";
import {EditableSpan} from "./EdittableSpan.tsx";


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
    changeSpan: (taskId: string, newTitle: string, todolistId: string) => void
    changeTodolist: ( newTodolist: string, todolistId: string) => void
    children?: React.ReactNode
    filter: FilterValuesType
    deleteTodolist: (todolistId: string) => void

}

export const Todolist = (props: PropsType) => {

    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }
    const onChangeTodolistHandler = (newTodolist: string) => {
        props.changeTodolist(props.id, newTodolist)
    }

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} onChange={onChangeTodolistHandler}/>
            </h3>

            <button onClick={() => props.deleteTodolist(props.id)}>🗑️</button>
            <AddItemForm addItem={addTask}/>
            <ul>
                {
                    props.tasks.map(t => {
                            const onClickButtonHandler = () => props.removeTask(t.id, props.id)
                            const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                props.changeStatus(t.id, e.currentTarget.checked, props.id)
                            }
                            const onChangeSpanHandler = (newValue: string) => {
                                props.changeSpan(t.id, newValue, props.id)
                            }
                            return (
                                <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                                    <input type="checkbox"
                                           onChange={onChangeInputHandler}
                                           checked={t.isDone}/>
                                    <EditableSpan title={t.title} onChange={onChangeSpanHandler}/>
                                    <button onClick={onClickButtonHandler}>x
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



