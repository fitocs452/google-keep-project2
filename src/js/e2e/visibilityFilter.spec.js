import { visibilityFilter } from '../reducers/visibility';
import deepFreeze from 'deep-freeze';
import expect from 'expect';

const testProyectAppFooter = () => {
  const stateBefore = {
    visibilityFilter: 'SHOW_ALL',
    search: ''
  };

  const action = {
    type: 'SET_VISIBILITY_FILTER',
    payload: {
      visibilityFilter: 'SHOW_ARCHIVED_TODO_LIST',
      search: ''
    }
  }

  const stateAfter = {
    visibilityFilter: 'SHOW_ARCHIVED_TODO_LIST',
    search: ''
  };

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(
    visibilityFilter(stateBefore, action)
  ).toEqual(stateAfter);
}

const testSearch = () => {
  const stateBefore = {
    visibilityFilter: 'SHOW_ALL',
    search: ''
  };

  const action = {
    type: 'SET_SEARCH',
    payload: {
      visibilityFilter: 'SHOW_ALL',
      search: 'hola mundo'
    }
  }

  const stateAfter = {
    visibilityFilter: 'SHOW_ALL',
    search: 'hola mundo'
  };

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(
    visibilityFilter(stateBefore, action)
  ).toEqual(stateAfter);
}


testProyectAppFooter();
testSearch();
console.log("All visibilityFilter tests passed!");
export {  };
