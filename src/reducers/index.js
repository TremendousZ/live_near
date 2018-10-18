import { combineReducers } from 'redux';
import {reducer as formReducer} from 'redux-form';
import userReducer from './user_reducer';
import homeReducer from './home_reducer';
import activityReducer from './activity_reducer';

const rootReducer = combineReducers({
    form : formReducer,
    user: userReducer,
    home: homeReducer,
    activity: activityReducer,
    });

export default rootReducer;