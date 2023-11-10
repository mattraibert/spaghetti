// createStore.js
export function createStore(reducer, initialState) {
  let state = initialState
  let listeners = []

  const getState = () => state

  const dispatch = (action) => {
    console.log('dispatching', action)
    state = reducer(state, action)
    listeners.forEach(listener => listener())
  }

  const subscribe = (listener) => {
    listeners.push(listener)
    return () => { /* unsubscribe logic */
    }
  }

  // Initialize the store with a dummy action
  dispatch({type: '@@redux/INIT'})

  return {getState, dispatch, subscribe}
}

// reducers.js
function rootReducer(state = {}, action) {
  // Reducer logic here
  return state
}

// // Usage
// const createStore = createStore(rootReducer)
// createStore.dispatch({type: 'SOME_ACTION'})
