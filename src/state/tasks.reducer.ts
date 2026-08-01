import {TaskStateType} from "../App.tsx";
import {TaskType} from "../Todolist.tsx";

type RemoveTaskType = {
    type: 'REMOVE_TASK'
    todolistId: string
    taskId: string
}
type AddTaskType = {
    type: 'ADD_TASK'
    todolistId: string
    payload: TaskType
}
type ChangeTaskStatusType = {
    type: 'CHANGE_TASK_STATUS'
    todolistId: string
    taskId: string
    isDone: boolean
}
type ChangeTaskTitleType = {
    type: 'CHANGE_TASK_TITLE'
    todolistId: string
    taskId: string
    title: string
}

type ActionsTypes = RemoveTaskType | AddTaskType | ChangeTaskStatusType | ChangeTaskTitleType

export const tasksReducer = (state: TaskStateType, action: ActionsTypes): TaskStateType => {

    switch (action.type) {
        case 'REMOVE_TASK': {
            const {todolistId, taskId} = action;
            // state - это объект { [todolistId]: TaskType[] }
            return {
                ...state,
                [todolistId]: state[todolistId].filter(task => task.id !== taskId)
            };

        }
        case 'ADD_TASK': {
            const {todolistId, payload} = action;
            return {
                ...state,
                [todolistId]: [...state[todolistId],  payload]
            }
        }
        case 'CHANGE_TASK_STATUS': {
            const {todolistId, taskId, isDone} = action;
            return {
                ...state,
                [todolistId]: state[todolistId].map(t => t.id === taskId ? {...t, isDone: isDone} : t)
            }
            }

        case 'CHANGE_TASK_TITLE': {
            const {todolistId, taskId, title} = action;
         return {
             ...state,
             [todolistId]: state[todolistId].map(t => t.id === taskId ? {...t, title: title} : t)}
        }
        default:
            throw new Error("I don't can to find the action type ");
    }
}


export const RemoveTaskAC = (todolistId: string, taskId: string): RemoveTaskType => {
    return {type: 'REMOVE_TASK', todolistId: todolistId, taskId: taskId}
}
export const AddTaskAC = (todolistId: string, payload: TaskType): AddTaskType => {
    return {type: 'ADD_TASK', todolistId: todolistId, payload: payload}
}
export const ChangeTaskStatusAC = (todolistId: string,taskId: string, isDone: boolean): ChangeTaskStatusType => {
    return {type: 'CHANGE_TASK_STATUS', todolistId: todolistId, taskId: taskId, isDone: isDone}
}
export const ChangeTaskTitleAC = (todolistId: string,taskId: string, title: string): ChangeTaskTitleType => {
    return {type: 'CHANGE_TASK_TITLE', todolistId: todolistId, taskId: taskId, title: title}
}
