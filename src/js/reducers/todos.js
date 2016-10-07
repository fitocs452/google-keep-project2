const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        todo(undefined, action)
      ];
    case 'TOGGLE_TODO':
    case 'SET_TODO_TEXT':
      return state.map(t => todo(t, action));
    case 'DELETE_TODO':
      let new_state = state;

      for (var i = 0; i < new_state.length; i++) {
        if(new_state[i].id == action.payload.id) {
          new_state.splice(i,1);

          return new_state;
        }
      };

    default:
      return state;
  }
}

const todo = (state = {}, action) => {
  switch(action.type) {
    case 'ADD_TODO':
      return {
        ...action.payload,
        completed: false
      };
    case 'TOGGLE_TODO':
      if(state.id === action.payload.id) {
        return {
          ...state,
          completed: !state.completed
        };
      }
    case 'SET_TODO_TEXT':
      if(state.id === action.payload.id){
        return {
          ...state,
          text: action.payload.text
        };
      }

    default:
      return state;
  }
}

export { todos };
