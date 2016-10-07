import React from 'react';
import ReactDOM from 'react-dom';

const AddNote = ({ onAddNote, children }) => {
  let input;

  return (
    <div>
      <input type="text" ref={ node => input = node } placeholder={ children } onKeyDown={
          (e) => { 
            if(e.keyCode == 13){
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
  <div class="glyphicon glyphicon-trash delete" onClick={ setArchive }></div>
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
            setUpdatedTime(Date(), elementId); 
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
          setUpdatedTime(Date(), elementId);
        }
      }/>
  );
}

export { Note, AddNote, Archive, TextArea, ColorPicker };
