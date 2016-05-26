import {combineReducers} from 'redux'
import {routerReducer as router} from 'react-router-redux'

import todo from './todo/todoReducer'
import error from './error/errorReducer'
import app from './app/appReducer'
import global from './global/globalReducer'
import user from './user/userReducer'

export default combineReducers({
  router,
  todo,
  error,
  global,
  app,
  user,
})