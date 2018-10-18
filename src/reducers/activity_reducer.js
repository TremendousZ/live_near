import types from '../actions/types';

const DEFAULT_STATE = {
    activity: null,
}

export default ( state = DEFAULT_STATE,action) => {
    console.log("Activities this.state", state);
    switch(action.type){
        case types.ACTIVITY:
            return {
                activity: action.activity
            };
        default:
            return state;
    }
};