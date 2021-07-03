import './App.css';
import {TaskType, Todolist} from './Todolist';
import React from "react";
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
import {AppRootState} from "./state/store";


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
    const dispatch = useDispatch()
    const todoLists = useSelector<AppRootState, Array<TodoListType>>((state) => state.todolists)

    function changeFilter(value: typeToFilter, todoListId: string) {
        const action = changeTodolistFilterAC(value, todoListId)
        dispatch(action)
    }

    let removeTodoList = (toDoListId: string) => {
        const action = removeTodoListAC(toDoListId)
        dispatch(action)
    }
    let changeTodoListTitle = (title: string, todoListId: string) => {
        const action = changeTodolistTitleAC(title, todoListId)
        dispatch(action)
    }


    function addToDoList(title: string) {
        const action = addTodolistAC(title)
        dispatch(action)
    }

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
                            return <Grid item>
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
