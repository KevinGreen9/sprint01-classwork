import {TaskStateType} from "../AppWithRedux/AppWithRedux.tsx";
import {v1} from 'uuid'
import {AddTodoActionType, RemoveTodoActionType, todolistId_1, todolistId_2} from "./todolists-reducer.ts";

type RemoveTaskType = {
    type: 'REMOVE_TASK'
    todolistId: string
    taskId: string
}
type AddTaskType = {
    type: 'ADD_TASK'
    todolistId: string
    task: {
        id: string,
        title: string,
        isDone: boolean
    }
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

type ActionsTypes = RemoveTaskType | AddTaskType | ChangeTaskStatusType | ChangeTaskTitleType | AddTodoActionType | RemoveTodoActionType

const initialState: TaskStateType = {
    [todolistId_1]: [
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Rest API", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false}
    ],
        [todolistId_2]: [
        {id: v1(), title: "Travel", isDone: true},
        {id: v1(), title: "Shopping", isDone: true},
        {id: v1(), title: "Study", isDone: false},
        {id: v1(), title: "Relax", isDone: false},
        {id: v1(), title: "Sport", isDone: false}
    ]
}

export const tasksReducer = (state: TaskStateType = initialState, action: ActionsTypes): TaskStateType => {

    switch (action.type) {
        case 'REMOVE_TASK': {
            const {todolistId, taskId} = action;
            // state - это объект { [todolistId]: TaskType[] }
            return {
                ...state,
                [todolistId]: (state[todolistId] || []).filter(task => task.id !== taskId)
            };

        }
        case 'ADD_TASK': {
            const {todolistId, task } = action;
            return {
                ...state,
                [todolistId]: [...(state[todolistId] || []), task]
            }
        }
        case 'CHANGE_TASK_STATUS': {
            const {todolistId, taskId, isDone} = action;
            return {
                ...state,
                [todolistId]: (state[todolistId] || []).map(t => t.id === taskId ? {...t, isDone: isDone} : t)
            }
            }

        case 'CHANGE_TASK_TITLE': {
            const {todolistId, taskId, title} = action;
         return {
             ...state,
             [todolistId]: (state[todolistId] || []).map(t => t.id === taskId ? {...t, title: title} : t)}
        }
        case 'ADD-TODOLIST': {
            const {todolist} = action;
            return {
                ...state,
                [todolist.id]: [] // ✅ Создаём пустой массив для нового тудулиста
            }

        }
        case 'REMOVE-TODOLIST': {
            const {id} = action;
            const newState = {...state};
            delete newState[id]; // Удаляем ключ с задачами удалённого тудулиста
            return newState;
        }
        default:
            return state;
    }
}


export const RemoveTaskAC = (todolistId: string, taskId: string): RemoveTaskType => {
    return {type: 'REMOVE_TASK',  todolistId,  taskId}
}
export const AddTaskAC = (todolistId: string, title: string): AddTaskType => {
    return {type: 'ADD_TASK',
        todolistId,
        task: {
            id: v1(),
            title: title,
            isDone: false,
        }}
}
export const ChangeTaskStatusAC = (todolistId: string, taskId: string, isDone: boolean): ChangeTaskStatusType => {
    return {type: 'CHANGE_TASK_STATUS', todolistId, taskId, isDone}
}
export const ChangeTaskTitleAC = (todolistId: string, taskId: string, title: string): ChangeTaskTitleType => {
    return {type: 'CHANGE_TASK_TITLE',  todolistId, taskId, title}
}
