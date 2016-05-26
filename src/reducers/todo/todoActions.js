import { createAction } from 'redux-actions'
import Immutable, { List, Map, Record } from 'immutable'
import {
  ADD_TODO,
  DELETE_TODO,
  EDIT_TODO,
  COMPLETE_ALL,
  COMPLETE_TODO,
  CLEAR_COMPLETED,
} from '../actions'

export const addTodo = createAction(ADD_TODO)
export const deleteTodo = createAction(DELETE_TODO)
export const editTodo = createAction(EDIT_TODO)
export const completeTodo = createAction(COMPLETE_TODO)
export const completeAll = createAction(COMPLETE_ALL)
export const clearCompleted = createAction(CLEAR_COMPLETED)
