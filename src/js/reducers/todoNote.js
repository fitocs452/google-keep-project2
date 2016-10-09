import { todos } from './todos';

const todoList = (state = [], action) => {
  if (action.type === 'ADD_TODO_NOTE') {
    return [
      ...state,
      todoNote(undefined,action)
    ];
  }

  let options = [
    'ADD_TODO',
    'TOGGLE_TODO',
    'SET_TODO_VISIBILITY_FILTER',
    'SET_COLOR',
    'DELETE_TODO',
    'SET_TEXT',
    'SET_ARCHIVED',
    'SET_UPDATED_TIME'
  ];

  if (options.includes(action.type)) {
    return state.map(t => todoNote(t, action));
  }

  return state;
}

const todoNote = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_TODO_NOTE':
      return {
        ...action.payload,
        todos: []
      };

    case 'ADD_TODO':
    case 'TOGGLE_TODO':
    case 'DELETE_TODO':
    case 'SET_TEXT':
      if(state.id === action.payload.elementId) {
        return {
          ...state,
          todos: todos(state.todos, action)
        };
      }

    case 'SET_TODO_VISIBILITY_FILTER':
      if(state.id === action.payload.elementId) {
        return {
          ...state,
          visibilityFilter: action.payload.visibilityFilter
        };
      } 

    case 'SET_ARCHIVED':
      if(state.id === action.payload.elementId) {
        return {
          ...state,
          archive: action.payload.archive
        };
      }

    case 'SET_COLOR':
      if(state.id === action.payload.elementId) {
        return {
          ...state,
          color: action.payload.color
        };
      } 

    case 'SET_UPDATED_TIME':
      if(state.id === action.payload.elementId) {
        return {
          ...state,
          updatedAt: action.payload.updatedAt
        };
      }

    default:
      return state;
  }
}

export { todoList };
