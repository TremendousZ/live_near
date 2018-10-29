import types from './types';


export const signIn = () => ({type: types.SIGN_IN});

export const signOut = () => ({type: types.SIGN_OUT});

export const state = (state) => ({
    type: types.STATE,
    state
});

export function activity(activity) {
    console.log("dispatching activity");
    return {
        type: types.ACTIVITY,
        activity 
    }      
}

export function updateSavedCities(cityLog){
    return {
        type: types.UPDATE_SAVED_CITIES,
        payload: cityLog
    }
}