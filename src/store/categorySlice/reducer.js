
import { CATEGORIES_ACTIONS, LOAD_STATUSES } from "./constants"; 


const INITIAL_STATE = {
    loadStatus: LOAD_STATUSES.UNKNOWN,
    categories: []
};

export const reducer = (
    state = INITIAL_STATE,
    action 
) => {
    
    switch(action.type) {
        case CATEGORIES_ACTIONS.GET_CATEGORIES: {
            return {
                ...state,
                loadStatus: LOAD_STATUSES.LOADING
            };
        }

        case CATEGORIES_ACTIONS.GET_CATEGORIES_SUCCESS: {
            const { payload } = action 
            return {
                categories: payload,
                loadStatus: LOAD_STATUSES.LOADED
            };
        }
        case CATEGORIES_ACTIONS.GET_CATEGORIES_FAILURE: {
            return {
                ...state,
                loadStatus: LOAD_STATUSES.ERROR
            };
        }
        default: 
        return state;
    }
};