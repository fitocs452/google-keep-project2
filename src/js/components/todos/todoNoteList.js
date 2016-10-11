import React from 'react';
import ReactDOM from 'react-dom';

import { TodoList } from './todoList';
import { ColorPicker, Archive, AddTodo } from './todosActions';
import { getVisibleTodos } from './getVisibleTodos'

import { Footer } from '../filters/footer';
import { FilterLink } from '../filters/filterLink';

const AddTodoNote = ({ onAddNote, children }) => {
  let input;

  return (
    <div>
      <input type="text" ref={ node => input = node } placeholder={ children } onKeyDown={
          (e) => {
            if(e.keyCode !== 13) {
              return;
            }

            onAddNote(input.value);
            input.value = "";
        }
      }
      />
    </div>
  );
}

const TodoNotesList = ({ todoList, onAddTodo, onTodoClicked, onFilterClicked, onArchived, setColor, setArchive, setUpdatedTime }) => (
      <span class="notes">
        {
          todoList.map(todoNote => (
            <div
            class="note"
            style={ {backgroundColor: todoNote.color }}
              key={ todoNote.id } >
              <TodoNote
                  title={ todoNote.title } />

              <ColorPicker
                setColor={ setColor }
                color={ todoNote.color }
                elementId={ todoNote.id }
                setUpdatedTime={ setUpdatedTime }/>

              <Archive
                setArchive={setArchive }
                setUpdatedTime={ setUpdatedTime }
                elementId={ todoNote.id }/>

              <AddTodo
                onAddTodo={ onAddTodo }
                elementId={ todoNote.id }
                setUpdatedTime={ setUpdatedTime } >Add ToDo</AddTodo>

              <TodoList
                todos={ getVisibleTodos( todoNote.todos, todoNote.visibilityFilter ) }
                onTodoClicked={ onTodoClicked }
                setUpdatedTime={ setUpdatedTime }
                onArchived={ onArchived }
                elementId={ todoNote.id } />

              <Footer
                currentVisibilityFilter={ todoNote.visibilityFilter } 
                onFilterClicked={ onFilterClicked }
                elementId={ todoNote.id }/>

              <p>createdAt: { todoNote.createdAt }</p>
              <p>updatedAt: { todoNote.updatedAt }</p>
            </div>
          ))
        }
      <div class="clear"></div>
      </span>
    );

const TodoNote = ({ title }) => (
  <div class="title">
    { title }
  </div>
);

export { TodoNotesList, AddTodoNote, TodoNote };

