import { handleActions, createAction } from 'redux-actions'
import Immutable, { List, Map, Record } from 'immutable'
import {
  ADD_TODO,
  DELETE_TODO,
  EDIT_TODO,
  COMPLETE_ALL,
  COMPLETE_TODO,
  CLEAR_COMPLETED,
} from '../actions'

const Todo = Record({
  text: 'Use Redux',
  completed: false,
  id: 0
})

const initialState = List([new Todo()])

export default handleActions({
  [ADD_TODO](state, action) {
    return state.push(new Todo({
      text: action.payload,
      id: state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1
    }));
  },

  [DELETE_TODO](state, action) {
    return state.filter(todo => todo.id !== action.payload)
  },

  [EDIT_TODO](state, action) {
    return state.map(todo => {
      return todo.id === action.payload.id
        ? todo.set('text', action.payload.text)
        : todo
    });
  },

  [COMPLETE_TODO](state, action) {
    let ret = state.map(todo => {
      return todo.id === action.payload
        ? todo.set('completed', !todo.completed)
        : todo
    })
    console.log(`complete todo ret: ${ret.toString()}`);
    return ret;
  },

  [COMPLETE_ALL](state, action) {
    const areAllMarked = state.every(todo => todo.completed)
    return state.map(todo => todo.set('completed', !areAllMarked))
  },

  [CLEAR_COMPLETED](state, action) {
    return state.filter(todo => todo.completed === false)
  }
}, initialState);

