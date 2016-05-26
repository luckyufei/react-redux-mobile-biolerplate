import {createAction} from 'redux-actions'
import {FETCH_FAILURE, SHOW_ERROR} from '../actions'

export const showFetchFailure = createAction(FETCH_FAILURE);

export const showError = createAction(SHOW_ERROR);
