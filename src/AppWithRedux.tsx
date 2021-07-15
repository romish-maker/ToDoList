import './App.css';
import {TaskType, Todolist} from './Todolist';
import React, {useCallback} from "react";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodoListAC
} from "./state/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";


export type typeToFilter = "all" | "active" | "completed"
export type TodoListType = {
    id: string
    title: string
    filter: typeToFilter
}
export type TasksStateType = {
    [key: string]: TaskType[]
}

function AppWithRedux() {
    console.log("App");
    const dispatch = useDispatch()
    const todoLists = useSelector<AppRootStateType, Array<TodoListType>>((state) => state.todolists)

    const changeFilter = useCallback((value: typeToFilter, todoListId: string) => {
        const action = changeTodolistFilterAC(value, todoListId)
        dispatch(action)
    },[dispatch])
    const removeTodoList = useCallback((toDoListId: string) => {
        const action = removeTodoListAC(toDoListId)
        dispatch(action)
    },[dispatch])
    const  changeTodoListTitle = useCallback((title: string, todoListId: string) => {
        const action = changeTodolistTitleAC(title, todoListId)
        dispatch(action)
    },[dispatch])
    const addToDoList = useCallback((title: string) => {
        const action = addTodolistAC(title)
        dispatch(action)
    },[dispatch])

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={""} color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6" className={""}>
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "10px"}}>
                    <AddItemForm addItem={addToDoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todoLists.map((tl) => {
                            return <Grid item key={tl.id}>
                                <Paper style={{padding: "10px"}}>
                                    <Todolist
                                        key={tl.id}
                                        id={tl.id}
                                        title={tl.title}
                                        changeFilter={changeFilter}
                                        changeTodoListTitle={changeTodoListTitle}
                                        filter={tl.filter}
                                        removeTodoList={removeTodoList}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}


export default AppWithRedux;
