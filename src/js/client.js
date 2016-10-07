import { createStore, combineReducers } from 'redux';
import React from 'react';
import ReactDOM from 'react-dom';
import deepFreeze from 'deep-freeze';
import expect from 'expect';
import '../styles/index.scss';

import v4 from 'uuid-v4';

// Reducers
import { todoList } from './reducers/todoNote';
import { visibilityFilter } from './reducers/visibility';
import { notes } from './reducers/notes';

// Filter components
import { ProyectAppFooter } from './components/filters/proyectAppFooter';
import { TextSearch } from './components/filters/textSearch';
import { elementsVisibilityFilter } from './components/filters/elementsVisibilityFilter';

// TodoNote, TodosNoteList, Todos components
import { Todo, TodoList } from './components/todos/todoList';
import { ColorPicker, AddTodo, Archive } from './components/todos/todosActions';
import { getVisibleTodos } from './components/todos/getVisibleTodos';
import { TodoNotesList, AddTodoNote } from './components/todos/todoNoteList';

// Note, NoteList components
import { Note, AddNote } from './components/notes/note';
import { NotesList } from './components/notes/noteList';

const { Component } = React;

const todoApp = combineReducers({
  todoList,
  visibilityFilter,
  notes
});

const loadState = () => {
  try {
    let result = JSON.parse(localStorage.getItem('sate'));
    return result ? result : undefined;
  } catch(err) {
    return undefined;
  }
}

const saveState = (state) => {
  try {
    localStorage.setItem('sate', JSON.stringify(state));
  } catch(err) {}
}

const store = createStore(todoApp, loadState());

let initial_color = '#FFFFF';
const ProyectApp = ({ todoList, visibilityFilter, notes }) => (
  <div>
    <div>
      <div class="generalFilter">
        <ProyectAppFooter
          currentVisibilityFilter = { visibilityFilter }
          onFilterClicked = {
            (filter) => {
              store.dispatch({
                type: 'SET_VISIBILITY_FILTER',
                payload: {
                  visibilityFilter: filter,
                  search: ''
                }
              });
            }
          } />

        <TextSearch
          currentVisibilityFilter={ visibilityFilter }
          setSearch={
            (search) => {
              store.dispatch({
                type: 'SET_SEARCH',
                payload: {
                  search: search,
                  visibilityFilter: visibilityFilter.visibilityFilter
                }
              })
            }
          } />
      </div>
    </div>

    <div class="div-break"></div>

    <div class="add-notes">
      <h2>Add Notes or Todo Lists</h2>
      <AddTodoNote
        onAddNote={
          (title) => {
            store.dispatch({
              type: 'ADD_TODO_NOTE',
              payload: {
                id: v4(),
                title: title,
                visibilityFilter: 'SHOW_ALL',
                color: initial_color,
                archive: false,
                createdAt: Date(),
                updatedAt: Date()
              }
            });
          }
        }>Add todo list</AddTodoNote>

      <AddNote
        onAddNote={
          (title) => {
            store.dispatch({
              type: 'ADD_NOTE',
              payload: {
                id: v4(),
                title: title,
                color: initial_color,
                text: "",
                archive: false,
                createdAt: Date(),
                updatedAt: Date()
              }
            });
          }
        }>Add note</AddNote>
    </div>

    <div class="div-break"></div>

    <div class="notes-container">
      <h2>Your notes and Todo Lists</h2>
      <TodoNotesList
        todoList = { elementsVisibilityFilter(todoList, visibilityFilter, 'TODO') }
        onAddTodo = {
            (text,elementId) => {
              store.dispatch({
                type: 'ADD_TODO',
                payload: {
                  id: v4(),
                  text: text,
                  elementId: elementId
                }
              });
            }
          }

        setArchive = {
          (archive, elementId) => {
            store.dispatch({
              type: 'SET_DELETED',
              payload: {
                archive: archive,
                elementId: elementId
              }
            });
          }
        }

        onTodoClicked = {
          (todo, elementId) => {
            store.dispatch({
              type: 'TOGGLE_TODO',
              payload: {
                id: todo.id,
                elementId: elementId
              }
            });
         }
        }

        onArchived = {
          (todo, elementId) => {
            store.dispatch({
              type: 'DELETE_TODO',
              payload: {
                id: todo.id,
                elementId: elementId
              }
            });
          }
        }

        onFilterClicked = {
          (filter, elementId) => {
            store.dispatch({
              type: 'SET_VISIBILITY_FILTER',
              payload: { 
                elementId: elementId,
                visibilityFilter: filter 
              }
            });
          }
        }

        setColor = {
          (color, elementId) => {
            store.dispatch({
              type: 'SET_COLOR',
              payload: {
                color: color,
                elementId: elementId
              }
            });
          }
        }

        setUpdatedTime = {
          (date, elementId) => {
            store.dispatch({
              type: 'SET_UPDATED_TIME',
              payload: {
                updatedAt: date,
                elementId: elementId
              }
            });
          }
        }/>

      <NotesList
        notes={ elementsVisibilityFilter(notes,visibilityFilter, 'SHOW_NOTE') } 
        setColor={
          (color, elementId) => {
            store.dispatch({
              type: 'SET_NOTE_COLOR',
              payload: {
                color: color,
                elementId: elementId
              }
            });
          }
        }

        setText={
          (text, elementId) => {
            store.dispatch({
              type: 'SET_NOTE_TEXT',
              payload: {
                text: text,
                elementId: elementId
              }
            });
          }
        }

        setArchive={
          (archive, elementId) => {
            store.dispatch({
              type: 'SET_NOTE_DELETED',
              payload: {
                archive: archive,
                elementId: elementId
              }
            });
          }
        }

        setUpdatedTime={
          (date, elementId) => {
            store.dispatch({
              type: 'SET_UPDATED_AT',
              payload: {
                updatedAt: date,
                elementId: elementId
              }
            });
          }
        }/>
    </div>
  </div>
);

const render = () => {
  console.log(store.getState());

  ReactDOM.render(
    <ProyectApp
      { ...store.getState() }
    />,
    document.getElementById('root')
  );
};

render();
store.subscribe(render);

store.subscribe(() => {
  saveState(store.getState());
});
