import { createStore, combineReducers, applyMiddleware } from 'redux';
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

// Undo and Redo
import undoable from 'redux-undo';
import { ActionCreators } from 'redux-undo';

// Middleware
import { crashReporter } from './middleware/crashReporter';
import { logger } from './middleware/logger';

// Custom Function: Format Date
import { getFormattedDate } from  './functions/functions'

const { Component } = React;

const todoApp = combineReducers({
  todoList,
  visibilityFilter,
  notes
});

const loadState = () => {
  try{
    let result = JSON.parse(localStorage.getItem('sate'));; 
    return result ? {past: [], present: result } : undefined;
  }catch(err){
    return undefined;
  }
}
const saveState = (state) => {
  try{
    localStorage.setItem('sate', JSON.stringify(state.present));
  }catch(err){

  }
}

const store = createStore(undoable(todoApp), loadState(), applyMiddleware(logger, crashReporter));

let initial_color = '#ffffff';
const render = () => {
  console.log(store.getState());

  ReactDOM.render(
    <ProyectApp
      { ...store.getState().present }
    />,
    document.getElementById('root')
  );
};

const ProyectApp = ({ todoList, visibilityFilter, notes }) => (

  <div>
    <div style={{width:'100%', padding:'10px'}}>

      <div class="app-title-container">
        <span class="app-title">Google Keep</span>
      </div>

      <div class="text-search-container">
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

      <div class="undo-redo-container">
        <button class="fa fa-undo button" onClick={
          () => {
            store.dispatch(ActionCreators.undo());
          }
        }></button>

        <button class="fa fa-repeat button" onClick={
          () => {
            store.dispatch(ActionCreators.redo());
          }
        }></button>
      </div>
    </div>

    <div>
      <div>
        <ProyectAppFooter
          currentVisibilityFilter = { visibilityFilter  ?  visibilityFilter  : 'SHOW_ALL' }
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
      </div>
    </div>

    <div style={{border: '3px solid peru'}}>
      {/* Add notes */}
      <div class="add-notes">
        <h2><span class="fa fa-plus" style={{fontSize:'20px'}}></span>Notes / To Do List</h2>
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
                  createdAt: getFormattedDate(),
                  updatedAt: getFormattedDate()
                }
              });
            }
          }>Add todo list</AddTodoNote>
        <div style={{marginTop:'10px', marginBottom:'10px'}}></div>
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
                  createdAt: getFormattedDate(),
                  updatedAt: getFormattedDate()
                }
              });
            }
          }>Add note</AddNote>
      </div>


      {/*Notes container*/}
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
                type: 'SET_TODO_VISIBILITY_FILTER',
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
          notes={ elementsVisibilityFilter(notes, visibilityFilter, 'SHOW_NOTE') }
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

    <div class="div-break"></div>


  </div>
);

render();
store.subscribe(render);

store.subscribe(() => {
  saveState(store.getState());
});
