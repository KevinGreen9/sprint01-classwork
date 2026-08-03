import './App.css';
import {TaskType, Todolist} from './Todolist';
import {AddItemForm} from "./AddItemForm.tsx";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {AddTodoAC, ChangeFilterTodoAC, ChangeNameTodoAC, RemoveTodoAC} from "./state/todolists-reducer.ts";
import {AddTaskAC, ChangeTaskStatusAC, ChangeTaskTitleAC, RemoveTaskAC} from "./state/tasks.reducer.ts";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store.ts";


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

    function removeTask( todolistId: TodolistType['id'], id: string,) {
        const action = RemoveTaskAC( todolistId, id);
        dispatch(action);
    }

    const addTask = ( todolistId: TodolistType['id'], title: string) => {
        const action = AddTaskAC(todolistId, title);
        dispatch(action);
    }

    const changeStatus = (todolistId: TodolistType["id"], taskId: string, isDone: boolean) => {
        const action = ChangeTaskStatusAC(todolistId, taskId, isDone);
        dispatch(action);
    }

    const changeSpan = (todolistId: TodolistType['id'], taskId: string, newTitle: string ) => {
        const action = ChangeTaskTitleAC(todolistId, taskId, newTitle);
        dispatch(action);
    }
    const changeTodolist = (todolistId: string, newTitle: string) => {
        const action = ChangeNameTodoAC(todolistId, newTitle);
        dispatch(action);
    }

    function changeFilter( todolistId: TodolistType['id'], filter: FilterValuesType) {
        const action = ChangeFilterTodoAC(todolistId, filter);
        dispatch(action);
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
        dispatch(action);
    }

    const addTodo = (title: TodolistType ['title']) => {
        const action =  AddTodoAC(title);
        dispatch(action);

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
