import React from 'react';
import ReactDOM from 'react-dom';

const FilterLink = ({ visibilityFilter, currentVisibilityFilter, onFilterClicked, elementId, children }) => {

  if(visibilityFilter === currentVisibilityFilter){
    return <strong>{ children }</strong>;
  }

  return <a
    href="#"
    onClick={
      (e) => {
        e.preventDefault();
        onFilterClicked(visibilityFilter, elementId );
      }
    }>
    { children }</a>
}

export { FilterLink };
