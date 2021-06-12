import './App.css';
import {TaskType, Todolist} from './Todolist';
import React, {useState} from "react";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Toolbar, Typography, Paper} from "@material-ui/core";
import {Menu} from "@material-ui/icons";


export type typeToFilter = "all" | "active" | "completed"
type TodoListType = {
    id: string
    title: string
    filter: typeToFilter
}
type TaskStateType = {
    [key: string]: TaskType[]
}

function App() {
    function removeTask(id: string, todoListId: string) {
        let tasks = tasksObj[todoListId]
        let filteredTasks = tasks.filter(t => t.id !== id)
        tasksObj[todoListId] = filteredTasks
        SetTasks({...tasksObj})
    }

    function addTask(title: string, todoListId: string) {
        if (title.trim() === '') return
        let task = {id: v1(), title: title, isDone: false}
        let tasks = tasksObj[todoListId]
        let newTasks = [task, ...tasks]
        tasksObj[todoListId] = newTasks
        SetTasks({...tasksObj})
    }

    function changeStatus(taskId: string, isDone: boolean, todoListId: string) {
        let tasks = tasksObj[todoListId]
        let task = tasks.find(t => t.id === taskId)
        if (task) {
            task.isDone = isDone
            SetTasks({...tasksObj})
        }
    }

    function changeTasksTitle(taskId: string, newTitle: string, todoListId: string) {
        let tasks = tasksObj[todoListId]
        let task = tasks.find(t => t.id === taskId)
        if (task) {
            task.title = newTitle
            SetTasks({...tasksObj})
        }
    }

    function changeFilter(value: typeToFilter, todoListId: string) {
        let todoList = todoLists.find(tl => tl.id === todoListId)
        if (todoList) {
            todoList.filter = value
        }
        setTodolist([...todoLists])
    }

    let todoListId1 = v1()
    let todoListId2 = v1()
    const [todoLists, setTodolist] = useState<Array<TodoListType>>([
        {id: todoListId1, title: "What to Learn", filter: "all"},
        {id: todoListId2, title: "What to Buy", filter: "all"},
    ]);

    let removeTodoList = (toDoListId: string) => {
        let FilteredTodolist = todoLists.filter(tl => tl.id !== toDoListId)
        setTodolist(FilteredTodolist)
        delete tasksObj[toDoListId]
        SetTasks({...tasksObj})
    }
    let changeTodoListTitle = (title: string, todoListId: string) => {
        const todoList = todoLists.find(tl => tl.id === todoListId)
        if (todoList) {
            todoList.title = title
            setTodolist([...todoLists])
        }
    }

    let [tasksObj, SetTasks] = useState<TaskStateType>({
        [todoListId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false}
        ],
        [todoListId2]: [
            {id: v1(), title: "Book", isDone: false},
            {id: v1(), title: "Milk", isDone: true}
        ],
    })

    function addToDoList(title: string) {
        const Todolist: TodoListType = {
            id: v1(),
            title: title,
            filter: "all"
        }
        setTodolist([Todolist, ...todoLists])
        SetTasks({
            ...tasksObj,
            [Todolist.id]: []
        })
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
                <Grid container style={ {padding: "10px"} }>
                    <AddItemForm addItem={addToDoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todoLists.map((tl) => {
                            let tasksForTodoList = tasksObj[tl.id]

                            if (tl.filter === "active") {
                                tasksForTodoList = tasksForTodoList.filter(t => !t.isDone);
                            }
                            if (tl.filter === "completed") {
                                tasksForTodoList = tasksForTodoList.filter(t => t.isDone);
                            }

                            return <Grid item>
                                <Paper style={{padding: "10px"}}>
                                    <Todolist
                                        key={tl.id}
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={tasksForTodoList}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeStatus={changeStatus}
                                        changeTasksTitle={changeTasksTitle}
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


export default App;
