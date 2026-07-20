import {userReducer} from "./user-reducer.ts";
import { test, expect } from 'vitest';

test('user reducer should increment  only age', () => {
    const startState = {age: 12, childrenCount: 0, name: 'li'};
    const endState = userReducer(startState, {type: 'INCREMENT-AGE'});

    expect(endState.age).toBe(13);
    expect(endState.childrenCount).toBe(0);


})

test('user reducer should increment  only children count', () => {
    const startState = {age: 12, childrenCount: 0, name: 'li'};
    const endState = userReducer(startState, {type: 'INCREMENT-CHILDREN-COUNT'});

    expect(endState.childrenCount).toBe(1);
    expect(endState.age).toBe(12);
})

test('user reducer should change name of user', () => {
    const startState = {age: 12, childrenCount: 0, name: 'li'};
    const newName = 'Ivan'
    const endState = userReducer(startState, {type: 'CHANGE-NAME', newName: newName});

    expect(endState.name).toBe(newName);

})