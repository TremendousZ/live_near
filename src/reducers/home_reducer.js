import types from '../actions/types';

const DEFAULT_STATE = {
    zipcode: null,
    city: null,
    state: null,
}

export default ( state = DEFAULT_STATE,action) => {
    switch(action.type){
        case types.ZIPCODE:
            return {zipcode: this.state.zipcode};
        case types.CITY:
            return {city: this.state.city};
        case types.STATE:
            return {state: this.state.state};
        default:
            return state;
    }
};