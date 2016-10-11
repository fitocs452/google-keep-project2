import React from 'react';
import ReactDOM from 'react-dom';

import { Footer } from '../filters/footer';
import { FilterLink } from '../filters/filterLink';

// Custom Function: Format Date
import { getFormattedDate } from  '../../functions/functions'


const Todo = ({ text, completed, onTodoClicked, onArchived, todo, elementId, setUpdatedTime }) => (
  <li>
    <input type="checkbox" onClick={
      () => {
        onTodoClicked(todo, elementId);
        setUpdatedTime(getFormattedDate(), elementId); 
      }
    }/>

    <div class="todo" style={{ textDecoration: completed ? 'line-through' : 'none' }}>
      { text }
    </div>

    <div class="fa fa-remove" onClick= { () => {
        onArchived(todo, elementId);
        setUpdatedTime(getFormattedDate(), elementId);
    }}>

    </div>
  </li>
);

const TodoList = ({ todos, onTodoClicked, elementId, onArchived, setUpdatedTime }) => (
  <ul>
    {
      todos.map(todo => (
        <Todo
          key={ todo.id }
          { ...todo }
          onTodoClicked={ onTodoClicked }
          onArchived={ onArchived }
          elementId={ elementId }
          setUpdatedTime={ setUpdatedTime }
          todo={ todo }/>
      ))
    }
  </ul>
);

export { Todo, TodoList };
