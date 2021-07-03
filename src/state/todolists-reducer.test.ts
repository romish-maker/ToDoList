import {v1} from "uuid";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodoListAC,
    todolistsReducer
} from "./todolists-reducer";
import {TodoListType, typeToFilter} from "../App";


let todolistId1: string
let todolistId2: string
let startState: Array<TodoListType>


beforeEach(() => {
    todolistId1 = v1()
    todolistId2 = v1()

    startState = [
        {id: todolistId1, title: "What to Learn", filter: "all"},
        {id: todolistId2, title: "What to Buy", filter: "all"}
    ]
})

test("correct todolist should be removed", () => {
    // action
    const endState = todolistsReducer(startState, removeTodoListAC(todolistId1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})
test("correct todolist shoul be added", () => {
    const newTodolistTitle = 'New Title'

    const endState = todolistsReducer(startState, addTodolistAC(newTodolistTitle))

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(newTodolistTitle)
    expect(endState[0].filter).toBe("all")
    expect(endState[0].id).toBeDefined()
})

test('correct todolist should change its name', () => {
    let newTodolistTitle = "New Todolist";


    const endState = todolistsReducer(startState, changeTodolistTitleAC(newTodolistTitle, todolistId2));

    expect(endState[0].title).toBe("What to Learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {

    let newFilter: typeToFilter = "completed";

    const endState = todolistsReducer(startState, changeTodolistFilterAC(newFilter, todolistId2));

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});



