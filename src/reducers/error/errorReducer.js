import {Map, List, Record} from 'immutable'
import {createAction, handleActions} from 'redux-actions'
import {FETCH_FAILURE, SHOW_ERROR} from '../actions'

const initialState = Map({
  error: '',
  message: '',
  failureType: ''
});

function getErrorMessage(failureType, error) {
  let message = ERR_MSG[failureType];
  if (!message)
    message = `未知错误: ${JSON.stringify(error)}!`;
  return message;
}

export default handleActions({

  /**
   * 发送fetch请求失败
   */
  [FETCH_FAILURE]: (state, action) => {
    let {error, failureType} = action.payload ? action.payload : action;
    return state.merge({
      error, failureType, message: getErrorMessage(failureType, error)
    });
  },

  [SHOW_ERROR]: (state, action) => {
    let {error, message} = action.payload;
    return state.merge({ error, message });
  }

}, initialState);

const ERR_MSG = {
  [FETCH_FAILURE]: '与服务器通信失败了.'
}


