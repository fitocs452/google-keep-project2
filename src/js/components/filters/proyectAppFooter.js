import React from 'react';
import ReactDOM from 'react-dom';

import { FilterLink } from './filterLink';

const ProyectAppFooter = ({ currentVisibilityFilter, onFilterClicked }) => (
  <div class="simple-filter">
    <h2>App Filters</h2>
    Filter: {' '}
    <FilterLink
      visibilityFilter="SHOW_ALL"
      currentVisibilityFilter={ currentVisibilityFilter.visibilityFilter }
      onFilterClicked={ onFilterClicked }
      >All</FilterLink>
    {' '}
    <FilterLink
      visibilityFilter="SHOW_NOTES"
      currentVisibilityFilter={ currentVisibilityFilter.visibilityFilter }
      onFilterClicked={ onFilterClicked }
      >Notes</FilterLink>
    {' '}
    <FilterLink
      visibilityFilter="SHOW_TODO_LIST"
      currentVisibilityFilter={ currentVisibilityFilter.visibilityFilter }
      onFilterClicked={ onFilterClicked }
      >TodoList</FilterLink>
  </div>
);

export { ProyectAppFooter };
