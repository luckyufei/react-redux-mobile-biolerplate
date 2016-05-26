import {Map, List, Record} from 'immutable'
import {createAction, handleActions} from 'redux-actions'
import {initialState, initSearchParams} from './userInitialState'

export default handleActions({
  'USER_GET_SUCC': (state, action) => {
    return state.update('current', current => current.merge(action.response)).set('userParams', state.get('userParams').merge(action.response));
  },

  'USER_UPDATE_SUCC': (state, action) => state.update('current', current => current.merge(state.get('userParams'))).set('isUpdateFlag', true).set('userParams', state.get('userParams')),

  'RESET_USER_PARAM': (state, action) => state.update('userParams', params => params.set(action.name, action.value)),

  /**
   * 判断改变表单的值后,有没有提交保存,没有保存的话,还原原来的param
   */
  'RESET_FORM': (state, action) => state.set('userParams', state.get('userParams').merge(state.get('current'))),

  'IS_UPDATE_FLAG': (state, action) => state.set('isUpdateFlag', action.payload),

  /**
   * 成功获取QQ成员信息
   */
  'MEMBERS_GET_SUCC': (state, action) => state.update('members', members => members.merge(action.response.members.map(item => new Member(item)))),
}, initialState);