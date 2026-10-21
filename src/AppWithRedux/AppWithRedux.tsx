import '../App.css';
import {TaskType, Todolist} from '../Todolist.tsx';
import {AddItemForm} from "../AddItemForm/AddItemForm.tsx";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {useAppWithRedux} from "./hooks/useAppWithRedux.tsx";


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
   const {
       todolists,
       tasks,
       deleteTodolist,
       removeTask,
       changeFilter,
       addTask,
       changeStatus,
       changeSpan,
       changeTodolist,
       addTodo
   }=useAppWithRedux()

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
