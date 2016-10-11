import React from 'react';
import ReactDOM from 'react-dom';

const elementsVisibilityFilter = (list, visibilityFilter, option) => {
  let visibles = [];
  for (var i = 0; i < list.length; i++) {
    if (visibilityFilter.visibilityFilter === 'SHOW_ARCHIVED_TODO_LIST') {
        if (list[i].archive) {
            visibles.push(list[i]);
        }
        continue;
    }

    if (list[i].archive && visibles !== 'SHOW_ARCHIVED_TODO_LIST') {
        continue;
    }

    if (list[i].title.includes(visibilityFilter.search)) {
        if (!visibles.includes(list[i])) {
            visibles.push(list[i]);
        }
    }

    if (typeof(list[i].text) !== 'undefined') {
        if(list[i].text.includes(visibilityFilter.search)) {
            if (!visibles.includes(list[i])) {
                visibles.push(list[i]);
            }
        }
    }

    if (typeof(list[i].todos) !== 'undefined') {
        for (var j = 0; j < list[i].todos.length; j++) {
            if (list[i].todos[j].text.includes(visibilityFilter.search)) {
                if (!visibles.includes(list[i])) {
                    visibles.push(list[i]);
                }
            }
        }
    }
  };

  if(visibilityFilter.visibilityFilter != undefined &&
        (
            visibilityFilter.visibilityFilter === 'SHOW_ALL' ||
            visibilityFilter.visibilityFilter.includes(option)
        )
    ) {
    return visibles;
  } else {
    return [];
  }
}

export { elementsVisibilityFilter };
