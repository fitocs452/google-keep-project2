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

const Delete = ({ setArchive}) => (
  <div class="glyphicon glyphicon-trash delete" onClick={ setArchive }></div>
);

const TextEditor = ({ text, elementId, setText, setUpdatedTime }) => {
  let input;
  return(
    <textarea 
      class="textEditor"
      defaultValue={text}
      ref={ node => input = node }
        onChange={
          () => {
            setText(input.value, elementId );
            setUpdatedTime(Date(), elementId); 
          }
        }>
    </textarea>
  );
}

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

export { Note, AddNote, Delete, TextEditor, ColorPicker };
