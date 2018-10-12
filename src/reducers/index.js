import { combineReducers } from 'redux';
import wallboard from './wallboard_reducer';
import {reducer as formReducer} from 'redux-form';
import userReducer from './user_reducer';
import homeReducer from './home_reducer';

const rootReducer = combineReducers({
    form : formReducer,
    wallboard,
    user: userReducer,
    home: homeReducer
    });

export default rootReducer;