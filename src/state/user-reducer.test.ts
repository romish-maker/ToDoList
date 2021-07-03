import {userReducer} from "./user-reducer";

test("user reducer should increment only age", () => {

    // data
    const startState = {age: 20, childrenCounter: 2, name: 'Romish'}

    // action
    const endState = userReducer(startState, {type: "INCREMENT-AGE"})

    // expect
    expect(endState.age).toBe(21)
    expect(endState.childrenCounter).toBe(2)
    expect(endState.name).toBe('Romish')
})
test("user reducer increment only childrenCounter", () => {

    // date
    const startState = {age: 20, childrenCounter: 2, name: 'Roman'}

    // action
    const endState = userReducer(startState, {type: "INCREMENT-CHILDREN-COUNT"})

    // expect
    expect(endState.childrenCounter).toBe(3)
    expect(endState.age).toBe(20)
})
test("user reducer should change user name", () => {

    // data
    const startState = {age: 20, childrenCounter: 2, name: 'Romish'}
    const newName = 'Roman'

    // action
    const endState = userReducer(startState, {type: "CHANGE-NAME", newName: newName})

    // expect
    expect(endState.name).toBe(newName)

})