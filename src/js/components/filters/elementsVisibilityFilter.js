import React from 'react';
import ReactDOM from 'react-dom';

const elementsVisibilityFilter = (elements, visibilityFilter, option) => {
  let ret = [];
  for (var i = 0; i < elements.length; i++) {
    if( elements[i].title.includes(visibilityFilter.search) && elements[i].archive == false)
      ret.push(elements[i]);
  };
  if(visibilityFilter.visibilityFilter != undefined && (visibilityFilter.visibilityFilter === 'SHOW_ALL' || visibilityFilter.visibilityFilter.includes(option))){
    return ret;
  }else
    return [];
}

export { elementsVisibilityFilter };
