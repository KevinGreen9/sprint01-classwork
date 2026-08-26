import './App.css';
import {TaskType, Todolist} from './Todolist';
import {AddItemForm} from "./AddItemForm.tsx";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {AddTodoAC, ChangeFilterTodoAC, ChangeNameTodoAC, RemoveTodoAC} from "./state/todolists-reducer.ts";
import {AddTaskAC, ChangeTaskStatusAC, ChangeTaskTitleAC, RemoveTaskAC} from "./state/tasks.reducer.ts";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store.ts";
import {useCallback} from "react";


export type FilterValuesType = "all" | "active" | "completed";

export type TodolistType = {
    id: string,
    title: string,
    filter: FilterValuesType
}

export type TaskStateType = {
    [todolistId: string]: TaskType[]
}

export const AppWithRedux = () => {
    const dispatch = useDispatch();

    const todolists = useSelector<AppRootState, TodolistType[]>( state => state.todolists);
    const tasks = useSelector<AppRootState, TaskStateType>( state => state.tasks);

    const  removeTask = useCallback(( todolistId: TodolistType['id'], id: string,) => {
        const action = RemoveTaskAC( todolistId, id);
        dispatch(action);
    }, [dispatch])

    const addTask = useCallback(( todolistId: TodolistType['id'], title: string) => {
        const action = AddTaskAC(todolistId, title);
        dispatch(action);
    }, [dispatch])

    const changeStatus = useCallback((todolistId: TodolistType["id"], taskId: string, isDone: boolean) => {
        const action = ChangeTaskStatusAC(todolistId, taskId, isDone);
        dispatch(action);
    }, [dispatch])

    const changeSpan = useCallback ((todolistId: TodolistType['id'], taskId: string, newTitle: string ) => {
        const action = ChangeTaskTitleAC(todolistId, taskId, newTitle);
        dispatch(action);
    }, [dispatch])
    const changeTodolist = useCallback ((todolistId: string, newTitle: string) => {
        const action = ChangeNameTodoAC(todolistId, newTitle);
        dispatch(action);
    }, [dispatch])

    const  changeFilter = useCallback(( todolistId: TodolistType['id'], filter: FilterValuesType) => {
        const action = ChangeFilterTodoAC(todolistId, filter);
        dispatch(action);
    }, [dispatch])


    const deleteTodolist = useCallback ((todolistId: TodolistType['id']) => {
        const action =  RemoveTodoAC(todolistId);
        dispatch(action);
    }, [dispatch])

    const addTodo = useCallback ((title: TodolistType ['title']) => {
        const action =  AddTodoAC(title);
        dispatch(action);

    }, [dispatch])


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
                            let tasksForTodolist = tasks[tl.id] || [];
                            return (
                                <Grid key={tl.id}>
                                    <Paper style={{padding: '10px'}}>
                                        <Todolist
                                            deleteTodolist={deleteTodolist}
                                            key={tl.id}
                                            id={tl.id}
                                            title={tl.title}
                                            tasks={tasksForTodolist}
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
