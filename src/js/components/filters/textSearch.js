import React from 'react';
import ReactDOM from 'react-dom';

const TextSearch = ({ currentVisibilityFilter, setSearch }) => {
  let input;
  return(
  <input type="text" placeholder="Search" defaultValue={currentVisibilityFilter.search} ref={ node => input = node } 
    onChange={ 
      () => {
        setSearch( input.value );
      } 
    }/>
  );
}

export { TextSearch };
