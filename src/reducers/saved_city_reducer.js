import types from "../actions/types";

const DEFAULT_STATE = {
    log: {}
};

export default (state= DEFAULT_STATE,action) => {
    switch(action.type){
        case types.UPDATE_SAVED_CITIES:
            return { log: action.payload};
        default:
            return state;
    }
}