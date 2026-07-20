import {FilterValuesType, TodolistType} from "../App.tsx";

type RemoveTodoActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}
type AddTodoActionType = {
    type: 'ADD-TODOLIST'
    payload: TodolistType
}
type ChangeTodoNameActionType = {
    type: 'CHANGE-TODOLIST'
    id: string
    title: string
}
type ChangeTodoFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterValuesType
}

type ActionsTypes = RemoveTodoActionType | AddTodoActionType | ChangeTodoFilterActionType | ChangeTodoNameActionType


export const todolistsReducer = (state: TodolistType[], action: ActionsTypes): TodolistType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(t => t.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            return [...state, action.payload]
        }
        case 'CHANGE-TODOLIST': {
            return state.map(t => t.id === action.id ? {...t, title: action.title} : t)
        }
        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(t => t.id === action.id ? {...t, filter: action.filter} : t)
        }

        default:
            throw new Error("I don't can to find the action type ");
    }


}

export const RemoveTodoAC = (todolistId: string): RemoveTodoActionType => {
    return {type: 'REMOVE-TODOLIST', id: todolistId}
}
export const AddTodoAC = ( payload: TodolistType): AddTodoActionType => {
    return {type: 'ADD-TODOLIST', payload: payload}
}
export const ChangeNameTodoAC = (todolistId: string, title: string): ChangeTodoNameActionType => {
    return {type: 'CHANGE-TODOLIST', id: todolistId, title: title}
}
export const ChangeFilterTodoAC = (todolistId: string, filter: FilterValuesType): ChangeTodoFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', id: todolistId, filter: filter}
}
