import types from '../actions/types';

const DEFAULT_STATE = {
    state: null,
}

export default ( state = DEFAULT_STATE,action) => {
    switch(action.type){
        case types.STATE:
            return {state: action.state};
        default:
            return state;
    }
};