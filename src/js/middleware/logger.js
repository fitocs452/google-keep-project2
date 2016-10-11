// Referencias: http://redux.js.org/docs/advanced/Middleware.html

const logger = store => next => action => {
  console.log('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  return result
}


export { logger };
