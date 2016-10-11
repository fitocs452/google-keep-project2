import React from 'react';
import ReactDOM from 'react-dom';

// Custom Function: Format Date
import { getFormattedDate } from  '../../functions/functions'


const AddNote = ({ onAddNote, children }) => {
  let input;

  return (
    <div>
      <input type="text" ref={ node => input = node } placeholder={ children } onKeyDown={
          (e) => {
            if(e.keyCode == 13) {
              onAddNote(input.value);
              input.value = "";
            }
          }
        }/>
    </div>
  );
}

const Note = ({ title }) => (
  <div class="title">
    { title }
  </div>
);

const Archive = ({ setArchive }) => (
  <div class="fa fa-remove delete" onClick={ setArchive }></div>
);

const TextArea = ({ text, elementId, setText, setUpdatedTime }) => {
  let color;
  return(
    <textarea
      class="textEditor"
      defaultValue={text}
      ref={ node => color = node }
        onChange={
          () => {
            setText(color.value, elementId );
            setUpdatedTime(getFormattedDate(), elementId); 
          }
        }>
    </textarea>
  );
}

const ColorPicker = ({ color, elementId, setColor, setUpdatedTime }) => {
  return(
    <input class="color" type="color" defaultValue={color} ref={ node => color = node }
      onChange={ 
        () => {
          setColor(color.value, elementId );
          setUpdatedTime(getFormattedDate(), elementId);
        }
      }/>
  );
}

export { Note, AddNote, Archive, TextArea, ColorPicker };
