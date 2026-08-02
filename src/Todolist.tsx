import {FilterValuesType, TodolistType} from './AppWithReducer.tsx';
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
    removeTask: (todolistId: string, taskId: string, ) => void
    changeFilter: (todolistId: string, value: FilterValuesType) => void
    addTask: (todolistId: string, title: string) => void
    changeStatus: (todolistId: string, taskId: string, isDone: boolean ) => void
    changeSpan: (todolistId: string, taskId: string, newTitle: string ) => void
    changeTodolist: (todolistId: string, newTodolist: string ) => void
    filter: FilterValuesType
    deleteTodolist: (todolistId: string) => void

}

export const Todolist = (props: PropsType) => {

    const addTask = (title: string) => {
        props.addTask(props.id, title )
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
                            const onClickButtonHandler = () => props.removeTask (props.id, t.id)
                            const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                props.changeStatus(props.id, t.id, e.currentTarget.checked)
                            }
                            const onChangeSpanHandler = (newValue: string) => {
                                props.changeSpan(props.id, t.id, newValue)
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
                        props.changeFilter( props.id,"all")
                    }}>
                    All
                </Button>
                <Button
                    color={'primary'}
                    variant={props.filter === "active" ? "contained" : 'text'}
                    onClick={() => {
                        props.changeFilter(props.id,"active")
                    }}>
                    Active
                </Button>
                <Button
                    color={'secondary'}
                    variant={props.filter === "completed" ? "contained" : 'text'}
                    onClick={() => {
                        props.changeFilter(props.id,"completed" )
                    }}>
                    Completed
                </Button>
            </div>
        </div>
    )
}



