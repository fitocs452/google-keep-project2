import React from 'react';
import ReactDOM from 'react-dom';

import { FilterLink } from './filterLink';

const Footer = ({ currentVisibilityFilter, onFilterClicked, elementId }) => (
  <div>
    Filter:
    {' '}
    <FilterLink
      visibilityFilter="SHOW_ALL"
      currentVisibilityFilter={ currentVisibilityFilter }
      onFilterClicked={ onFilterClicked }
      elementId={ elementId }>All</FilterLink>
    {' '}
    <FilterLink
      visibilityFilter="SHOW_COMPLETED"
      currentVisibilityFilter={ currentVisibilityFilter }
      onFilterClicked={ onFilterClicked }
      elementId={ elementId }>Completed</FilterLink>
    {' '}
    <FilterLink
      visibilityFilter="SHOW_ACTIVE"
      currentVisibilityFilter={ currentVisibilityFilter }
      onFilterClicked={ onFilterClicked }
      elementId={ elementId }>Active</FilterLink>
  </div>
);

export { Footer };
