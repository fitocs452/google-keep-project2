import React from 'react';
import ReactDOM from 'react-dom';

import { Footer } from '../filters/footer';
import { FilterLink } from '../filters/filterLink';

const Todo = ({ text, completed, onTodoClicked, onArchived, todo, elementId, setUpdatedTime }) => (  
  <li>
   
    <input type="checkbox" onClick={ 
      () => {
        onTodoClicked(todo, elementId);
        setUpdatedTime(Date(), elementId); 
      }
    }/>

    <div class="todo"
      style={{
        textDecoration: completed ? 'line-through' : 'none'
      }}>{ text }
    </div>

    <div class="glyphicon glyphicon-remove" onClick={
      () => {
        onArchived(todo, elementId);
        setUpdatedTime(Date(), elementId); 
      }
    }></div>
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
