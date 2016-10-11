import React from 'react';
import ReactDOM from 'react-dom';

// Custom Function: Format Date
import { getFormattedDate } from  '../../functions/functions'


const ColorPicker = ({ color, elementId, setColor, setUpdatedTime }) => {
  let input;
  return(
      <input class="color" type="color" defaultValue={color} ref={ node => input = node } 
      onChange={
        () => {
          setColor(input.value, elementId );
          setUpdatedTime(getFormattedDate(), elementId);
        }
      }/>
  );
}

const AddTodo = ({ onAddTodo, children, elementId, setUpdatedTime }) => {
  let input;

  return (
    <div>
      <input type="text" ref={ node => input = node } placeholder={ children } onKeyDown={
          (e) => {
            if(e.keyCode != 13) {
              return;
            }
            onAddTodo(input.value, elementId);
            setUpdatedTime(getFormattedDate(), elementId);

            input.value = "";
          }
        }/>
    </div>
  );
}

const Archive = ({ setArchive, setUpdatedTime, elementId}) => (
  <div class="fa fa-remove delete" onClick={
    () => {
      setArchive(true,elementId);
      setUpdatedTime(getFormattedDate(),elementId);
    }
  }></div>
);

export { ColorPicker, AddTodo, Archive };
