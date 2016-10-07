const notes = (state = [], action) =>{
  switch (action.type) {
    case 'ADD_NOTE':
      return [
        ...state,
        note(undefined,action)
      ];
    case 'SET_NOTE_COLOR':
    case 'SET_NOTE_TEXT':
    case 'SET_NOTE_DELETED':
    case 'SET_UPDATED_AT':
      return state.map(t => note(t, action));
    default:
      return state;
  }
}

const note = (state = {}, action) =>{
  switch (action.type) {
    case 'ADD_NOTE':
      return {
        ...action.payload
      };
    case 'SET_NOTE_COLOR':
      if(state.id === action.payload.elementId){
        return {
          ...state,
          color: action.payload.color
        };
      } 
    case 'SET_NOTE_TEXT':
      if(state.id === action.payload.elementId){
        return {
          ...state,
          text: action.payload.text
        };
      }
    case 'SET_NOTE_DELETED':
      if(state.id === action.payload.elementId){
        return {
          ...state,
          archive: action.payload.archive
        };
      }
    case 'SET_MUPDATEDAT':
      if(state.id === action.payload.elementId){
        return {
          ...state,
          updatedAt: action.payload.updatedAt
        };
      }    
    default:
      return state;
  }
}

export { notes };
