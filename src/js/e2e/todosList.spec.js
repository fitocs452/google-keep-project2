import { todoList } from '../reducers/todoNote';
import { getFormattedDate } from  '../functions/functions'

import deepFreeze from 'deep-freeze';
import expect from 'expect';
import v4 from 'uuid-v4';

const testAddTodoNote = () => {
  let id = v4();

  const stateBefore = [];
  const action = {
    type: 'ADD_TODO_NOTE',
    payload: {
      archive: false,
      color: '#ffffff',
      createdAt: getFormattedDate(),
      id: id,
      title: 'test',
      updatedAt: getFormattedDate(),
      visibilityFilter:"SHOW_ALL"
    }
  }

  const stateAfter = [{
    archive: false,
    color: "#ffffff",
    createdAt: getFormattedDate(),
    id: id,
    title:'test',
    todos: [],
    updatedAt: getFormattedDate(),
    visibilityFilter:"SHOW_ALL"
  }];

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(
    todoList(stateBefore, action)
  ).toEqual(stateAfter);
}

const testAddTodo = () => {
  let id = v4();
  let todoId = v4();

  const stateBefore = [{
    archive: false,
    color: "#ffffff",
    createdAt: getFormattedDate(),
    id: id,
    title:'test',
    todos: [],
    updatedAt: getFormattedDate(),
    visibilityFilter:"SHOW_ALL"
  }];

  const action = {
    type: 'ADD_TODO',
    payload: {
      id: todoId,
      text: 'test',
      elementId: id
    }
  }

  const stateAfter = [{
    archive: false,
    color: "#ffffff",
    createdAt: getFormattedDate(),
    id: id,
    title:'test',
    todos: [{
        completed: false,
        elementId: id,
        id: todoId,
        text: "test"
    }],
    updatedAt: getFormattedDate(),
    visibilityFilter:"SHOW_ALL"
  }];

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(
    todoList(stateBefore, action)
  ).toEqual(stateAfter);
}

const testArchiveTodoNoteList = () => {
  let id = v4();
  let todoId = v4();

  const stateBefore = [{
    archive: false,
    color: "#ffffff",
    createdAt: getFormattedDate(),
    id: id,
    title:'test',
    todos: [],
    updatedAt: getFormattedDate(),
    visibilityFilter:"SHOW_ALL"
  }];

  const action = {
    type: 'SET_ARCHIVED',
    payload: {
      archive: true,
      elementId: id
    }
  }

  const stateAfter = [{
    archive: true,
    color: "#ffffff",
    createdAt: getFormattedDate(),
    id: id,
    title:'test',
    todos: [],
    updatedAt: getFormattedDate(),
    visibilityFilter:"SHOW_ALL"
  }];

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(
    todoList(stateBefore, action)
  ).toEqual(stateAfter);
}

testAddTodoNote();
testAddTodo();
testArchiveTodoNoteList();

console.log("All note list tests passed!");
export {  };
