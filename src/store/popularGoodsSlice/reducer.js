
import { POPULAR_GOODS_ACTIONS, LOAD_STATUSES } from "./constants"; 


const INITIAL_STATE = {
    loadStatus: LOAD_STATUSES.UNKNOWN,
    popularGoods: []
};

export const reducer = (
    state = INITIAL_STATE,
    action 
) => {
    
    switch(action.type) {
        case POPULAR_GOODS_ACTIONS.GET_POPULAR_GOODS: {
            return {
                ...state,
                loadStatus: LOAD_STATUSES.LOADING
            };
        }

        case POPULAR_GOODS_ACTIONS.GET_POPULAR_GOODS_SUCCESS: {
            const { payload } = action 
            return {
                popularGoods: payload,
                loadStatus: LOAD_STATUSES.LOADED
            };
        }
        case POPULAR_GOODS_ACTIONS.GET_POPULAR_GOODS_FAILURE: {
            return {
                ...state,
                loadStatus: LOAD_STATUSES.ERROR
            };
        }
        default: 
        return state;
    }
};