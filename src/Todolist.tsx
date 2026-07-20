import {FilterValuesType, TodolistType} from './App';
import  {ChangeEvent} from "react";
import {AddItemForm} from "./AddItemForm.tsx";
import {EditableSpan} from "./EdittableSpan.tsx";
import {Button, Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";


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
    changeTodolist: (newTodolist: string, todolistId: string) => void
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

    const deleteTodolistHandler = () => {
        props.deleteTodolist(props.id)
    }

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} onChange={onChangeTodolistHandler}/>
                <IconButton onClick={deleteTodolistHandler}>
                    <Delete/>
                </IconButton>
            </h3>

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
                                    <Checkbox
                                           onChange={onChangeInputHandler}
                                           checked={t.isDone}/>
                                    <EditableSpan title={t.title} onChange={onChangeSpanHandler}/>
                                    <IconButton onClick={onClickButtonHandler}>
                                        <Delete/>
                                    </IconButton>
                                </li>
                            )
                        }
                    )
                }
            </ul>
            <div>
                <Button
                    color={'success'}
                    variant={props.filter === "all" ? "contained" : 'text'}
                    onClick={() => {
                        props.changeFilter("all", props.id)
                    }}>
                    All
                </Button>
                <Button
                    color={'primary'}
                    variant={props.filter === "active" ? "contained" : 'text'}
                    onClick={() => {
                        props.changeFilter("active", props.id)
                    }}>
                    Active
                </Button>
                <Button
                    color={'secondary'}
                    variant={props.filter === "completed" ? "contained" : 'text'}
                    onClick={() => {
                        props.changeFilter("completed", props.id)
                    }}>
                    Completed
                </Button>
            </div>
        </div>
    )
}



