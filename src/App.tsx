// import {useState} from 'react';
// import './App.css';
// import {TaskType, Todolist} from './Todolist';
// import {v1} from 'uuid'
// import {AddItemForm} from "./AddItemForm.tsx";
// import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
// import MenuIcon from '@mui/icons-material/Menu';
//
//
// export type FilterValuesType = "all" | "active" | "completed";
//
// export type TodolistType = {
//     id: string,
//     title: string,
//     filter: FilterValuesType
// }
//
// export type TaskStateType = {
//     [todolistId: string]: TaskType[]
// }
//
// export const App = () => {
//     const todolistId_1 = v1();
//     const todolistId_2 = v1();
//
//     const [todolists, setTodolists] = useState<TodolistType[]>([{
//         id: todolistId_1, title: "What to learn", filter: 'all'
//     },
//         {id: todolistId_2, title: "What to want?", filter: 'all'}
//     ]);
//
//     const [tasks, setTasks] = useState<TaskStateType>({
//         [todolistId_1]: [
//             {id: v1(), title: "HTML&CSS", isDone: true},
//             {id: v1(), title: "JS", isDone: true},
//             {id: v1(), title: "ReactJS", isDone: false},
//             {id: v1(), title: "Rest API", isDone: false},
//             {id: v1(), title: "GraphQL", isDone: false}
//         ],
//         [todolistId_2]: [
//             {id: v1(), title: "Travel", isDone: true},
//             {id: v1(), title: "Shopping", isDone: true},
//             {id: v1(), title: "Study", isDone: false},
//             {id: v1(), title: "Relax", isDone: false},
//             {id: v1(), title: "Sport", isDone: false}
//         ]
//     });
//
//     function removeTask(id: string, todolistId: TodolistType['id']) {
//         setTasks({...tasks, [todolistId]: tasks [todolistId].filter(t => t.id != id)});
//     }
//
//     const addTask = (title: string, todolistId: TodolistType['id']) => {
//         let task = {id: v1(), title: title, isDone: false};
//         setTasks({...tasks, [todolistId]: [...tasks[todolistId], task]});
//     }
//
//     const changeStatus = (taskId: string, isDone: boolean, todolistId: TodolistType['id']) => {
//         setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, isDone: isDone} : t)})
//     }
//     const changeSpan = (taskId: string, newTitle: string, todolistId: TodolistType['id']) => {
//         setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, title: newTitle} : t)})
//     }
//     const changeTodolist = (todolistId: string, newTitle: string) => {
//         setTodolists(todolists.map(tl =>
//             tl.id === todolistId ? {...tl, title: newTitle} : tl
//         ))
//     }
//
//     function changeFilter(filter: FilterValuesType, todolistId: TodolistType['id']) {
//         setTodolists(todolists.map(tl =>
//             tl.id === todolistId ? {...tl, filter} : tl
//         ));
//     }
//
//     function getFilteredTasks(tasks: TaskType[], filter: FilterValuesType) {
//         switch (filter) {
//             case 'active':
//                 return tasks.filter(t => !t.isDone);
//             case 'completed':
//                 return tasks.filter(t => t.isDone);
//             case 'all':
//             default:
//                 return tasks;
//         }
//     }
//
//     const deleteTodolist = (todolistId: TodolistType['id']) => {
//         setTodolists(todolists.filter(tl => tl.id !== todolistId));
//     }
//
//     const addTodo = (title: TodolistType ['title']) => {
//         const newTodo: TodolistType = {
//             id: v1(),
//             title: title,
//             filter: "all"
//         }
//         setTodolists([...todolists, newTodo])
//         setTasks({...tasks, [newTodo.id]: []})
//     }
//
//
//     return (
//         <div className="App">
//                 <AppBar position="static">
//                     <Toolbar>
//                         <IconButton
//                             edge="start"
//                             color="inherit"
//                             aria-label="menu"
//                         >
//                             <MenuIcon/>
//                         </IconButton>
//                         <Typography variant="h6">
//                             News
//                         </Typography>
//                         <Button color={"inherit"}>Login</Button>
//                     </Toolbar>
//                 </AppBar>
//
//                 <Container fixed>
//                     <Grid container style={{padding: '20px'}}>
//                         <AddItemForm addItem={(title: string) => {
//                             addTodo(title);
//                         }}/>
//                     </Grid>
//                     <Grid  container spacing={3}>
//                         {todolists.map(tl => {
//                             const filteredTasks = getFilteredTasks(tasks[tl.id], tl.filter)
//                             return (
//                                 <Grid key={tl.id}>
//                                     <Paper style={{padding: '10px'}}>
//                                         <Todolist
//                                             deleteTodolist={deleteTodolist}
//                                             key={tl.id}
//                                             id={tl.id}
//                                             title={tl.title}
//                                             tasks={filteredTasks}
//                                             removeTask={removeTask}
//                                             changeFilter={changeFilter}
//                                             addTask={addTask}
//                                             changeStatus={changeStatus}
//                                             changeSpan={changeSpan}
//                                             changeTodolist={changeTodolist}
//                                             filter={tl.filter}
//                                         ></Todolist>
//                                     </Paper>
//                                 </Grid>
//                             )
//                         })
//                         }
//                     </Grid>
//
//                 </Container>
//         </div>
//     );
// }
