import { combineReducers } from 'redux';
import wallboard from './wallboard_reducer';
import {reducer as form} from 'redux-form';

export default combineReducers({form, wallboard});
