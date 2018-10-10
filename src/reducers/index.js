import { combineReducers } from 'redux';
import wallboard from './wallboard_reducer';
import {reducer as formReducer} from 'redux-form';
import userReducer from './user_reducer';

const rootReducer = combineReducers({
    form : formReducer,
    wallboard,
    user: userReducer,
    });

export default rootReducer;