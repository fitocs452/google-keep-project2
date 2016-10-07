import React from 'react';
import ReactDOM from 'react-dom';

const ColorPicker = ({ color, elementId, setColor, setUpdatedTime }) => {
  let input;
  return(
      <input class="color" type="color" defaultValue={color} ref={ node => input = node } 
      onChange={
        () => {
          setColor(input.value, elementId );
          setUpdatedTime(Date(), elementId);
        }
      }/>
  );
}

const AddTodo = ({ onAddTodo, children, elementId, setUpdatedTime }) => {
  let input;

  return (
    <div>
      <input class="addTodo" type="text" ref={ node => input = node } placeholder={ children } onKeyDown={
          (e) => {
            if(e.keyCode != 13) {
              return;
            }
            onAddTodo(input.value, elementId);
            setUpdatedTime(Date(), elementId);

            input.value = "";
          }
        }/>
    </div>
  );
}

const Delete = ({ setArchive, setUpdatedTime, elementId}) => (
  <div class="glyphicon glyphicon-trash delete" onClick={
    () => {
      setArchive(true,elementId);
      setUpdatedTime(Date(),elementId);
    }
  }></div>
);

export { ColorPicker, AddTodo, Delete };
