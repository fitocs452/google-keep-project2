import React from 'react';
import ReactDOM from 'react-dom';

import { Note, ColorPicker, TextArea, Archive } from './note.js';

const NotesList = ({ notes, setColor, setText, setArchive, setUpdatedTime }) => (
  <span class="notes">
    {
      notes.map(note => (
        <div
          class="note"
          style={{ backgroundColor: note.color }}
          key={ note.id } >
            <Note
              title={ note.title } />
            <ColorPicker
                setColor={ setColor }
                color={ note.color }
                setUpdatedTime={ setUpdatedTime }
                elementId={ note.id }/>
            <TextArea
                setText={ setText }
                text={ note.text }
                setUpdatedTime={ setUpdatedTime }
                elementId={ note.id }/>
            <Archive
                setArchive={ () => setArchive(true, note.id ) }/>
        </div>
      ))
    }
    <div class="clear"></div>
  </span>
);

export { NotesList };
