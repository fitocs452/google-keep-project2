import React from 'react';
import ReactDOM from 'react-dom';

const TextSearch = ({ currentVisibilityFilter, setSearch }) => {
  let input;
  return(
    <div class="simple-filter">
      {/*<h2>Search Text</h2>*/}
      <input class="text-search-input" type="text" placeholder="Search" defaultValue={currentVisibilityFilter.search} ref={ node => input = node }
        onChange={ 
          () => {
            setSearch( input.value );
          } 
        }/>
    </div>
  );
}

export { TextSearch };
