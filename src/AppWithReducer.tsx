import {useReducer} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid'
import {AddItemForm} from "./AddItemForm.tsx";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {AddTodoAC, ChangeFilterTodoAC, ChangeNameTodoAC, RemoveTodoAC, todolistsReducer} from "./state/todolists-reducer.ts";
import {AddTaskAC, ChangeTaskStatusAC, ChangeTaskTitleAC, RemoveTaskAC, tasksReducer} from "./state/tasks.reducer.ts";


export type FilterValuesType = "all" | "active" | "completed";

export type TodolistType = {
    id: string,
    title: string,
    filter: FilterValuesType
}

export type TaskStateType = {
    [todolistId: string]: TaskType[]
}

export const AppWithReducer = () => {
    const todolistId_1 = v1()
    const todolistId_2 = v1();

    const [todolists, dispatchToTodolistsReducer] = useReducer(todolistsReducer, [
        {id: todolistId_1, title: "What to learn", filter: 'all'},
        {id: todolistId_2, title: "What to want?", filter: 'all'}
    ]);

    const [tasks, dispatchToTasksReducer] = useReducer(tasksReducer, {
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
    });

    function removeTask( todolistId: TodolistType['id'], id: string,) {
        const action = RemoveTaskAC( todolistId, id);
        dispatchToTasksReducer(action);
    }

    const addTask = ( todolistId: TodolistType['id'], title: string) => {
        const action = AddTaskAC(todolistId, title);
        dispatchToTasksReducer(action);
    }

    const changeStatus = (todolistId: TodolistType["id"], taskId: string, isDone: boolean) => {
        const action = ChangeTaskStatusAC(todolistId, taskId, isDone);
        dispatchToTasksReducer(action);
    }

    const changeSpan = (todolistId: TodolistType['id'], taskId: string, newTitle: string ) => {
        const action = ChangeTaskTitleAC(todolistId, taskId, newTitle);
        dispatchToTasksReducer(action);
    }
    const changeTodolist = (todolistId: string, newTitle: string) => {
        const action = ChangeNameTodoAC(todolistId, newTitle);
        dispatchToTodolistsReducer(action);
    }

    function changeFilter( todolistId: TodolistType['id'], filter: FilterValuesType) {
        const action = ChangeFilterTodoAC(todolistId, filter);
        dispatchToTodolistsReducer(action);
    }

    function getFilteredTasks(tasks: TaskType[], filter: FilterValuesType) {
        switch (filter) {
            case 'active':
                return tasks.filter(t => !t.isDone);
            case 'completed':
                return tasks.filter(t => t.isDone);
            case 'all':
            default:
                return tasks;
        }
    }

    const deleteTodolist = (todolistId: TodolistType['id']) => {
        const action =  RemoveTodoAC(todolistId);
        dispatchToTasksReducer(action);
        dispatchToTodolistsReducer(action);
    }

    const addTodo = (title: TodolistType ['title']) => {
        const action =  AddTodoAC(title);
        dispatchToTasksReducer(action);
        dispatchToTodolistsReducer(action);

    }


    return (
        <div className="App">
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6">
                            News
                        </Typography>
                        <Button color={"inherit"}>Login</Button>
                    </Toolbar>
                </AppBar>

                <Container fixed>
                    <Grid container style={{padding: '20px'}}>
                        <AddItemForm addItem={(title: string) => {
                            addTodo(title);
                        }}/>
                    </Grid>
                    <Grid  container spacing={3}>
                        {todolists.map(tl => {
                            const filteredTasks = getFilteredTasks(tasks[tl.id], tl.filter)
                            return (
                                <Grid key={tl.id}>
                                    <Paper style={{padding: '10px'}}>
                                        <Todolist
                                            deleteTodolist={deleteTodolist}
                                            key={tl.id}
                                            id={tl.id}
                                            title={tl.title}
                                            tasks={filteredTasks}
                                            removeTask={removeTask}
                                            changeFilter={changeFilter}
                                            addTask={addTask}
                                            changeStatus={changeStatus}
                                            changeSpan={changeSpan}
                                            changeTodolist={changeTodolist}
                                            filter={tl.filter}
                                        ></Todolist>
                                    </Paper>
                                </Grid>
                            )
                        })
                        }
                    </Grid>

                </Container>
        </div>
    );
}
