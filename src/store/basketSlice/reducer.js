
import { BASKET_ACTIONS, LOAD_STATUSES } from "./constants"; 


const INITIAL_STATE = {
    loadStatus: LOAD_STATUSES.UNKNOWN,
    basketGoods: []
};

export const reducer = (
    state = INITIAL_STATE,
    action 
) => {
    
    switch(action.type) {
        case BASKET_ACTIONS.GET_BASKET: {
            return {
                ...state,
                loadStatus: LOAD_STATUSES.LOADING
            };
        }

        case BASKET_ACTIONS.GET_BASKET_SUCCESS: {
            const { payload } = action 
            return {
                basketGoods: payload,
                loadStatus: LOAD_STATUSES.LOADED
            };
        }
        case BASKET_ACTIONS.GET_BASKET_FAILURE: {
            return {
                ...state,
                loadStatus: LOAD_STATUSES.ERROR
            };
        }
        default: 
        return state;
    }
};