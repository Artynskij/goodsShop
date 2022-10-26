import { GOODS_ACTIONS, LOAD_STATUSES } from "./constants";

const INITIAL_STATE = {
  loadStatus: LOAD_STATUSES.UNKNOWN,
  goods: [],
};

export const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GOODS_ACTIONS.GET_GOODS: {
      return {
        ...state,
        loadStatus: LOAD_STATUSES.LOADING,
      };
    }

    case GOODS_ACTIONS.GET_GOODS_SUCCESS: {
      const { payload } = action;
      return {
        goods: payload,
        loadStatus: LOAD_STATUSES.LOADED,
      };
    }
    case GOODS_ACTIONS.GET_GOODS_FAILURE: {
      return {
        ...state,
        loadStatus: LOAD_STATUSES.ERROR,
      };
    }
    default:
      return state;
  }
};
