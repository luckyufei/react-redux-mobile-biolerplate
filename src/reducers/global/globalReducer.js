/**
 * 全局状态信息
 */
import {Map, List, Record} from 'immutable'
import {handleActions} from 'redux-actions'
import {SHOW_LOADING, HIDE_LOADING, ACTIVE_POP_ALERT, UNACTIVE_POP_ALERT, LOCATION_CHANGE} from 'reducers/actions'
import {initialState, ReportConfig} from './globalInitialState'

const TAG = '[globalReducer]::';

export default handleActions({
  /**
   * 加载中进度
   */
  [SHOW_LOADING]: (state, action) => state.set('loading', true),
  [HIDE_LOADING]: (state, action) => state.set('loading', false),

  /**
   * ajax请求失败
   */
  'FETCH_FAILURE': (state, action) => state.set('loading', false),


  /**
   *事件统计
   */
  'REPORT_GET_SUCC': (state, action) => state.set('report', true),

  'REPORT_URL_CHANGE': (state, action) => {
    return state.set('reportUrl', action.payload);
  },
}, initialState);