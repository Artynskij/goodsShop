import { AUTHUSER_ACTION, LOAD_STATUSES } from "./constants";

const INITIAL_STATE = {
  loadStatus: LOAD_STATUSES,
  authUser: [],
};

export const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AUTHUSER_ACTION.GET_AUTHUSER: {
      return {
        ...state,
        loadStatus: LOAD_STATUSES.LOADING,
      };
    }
    case AUTHUSER_ACTION.GET_AUTHUSER_SUCCESS: {
      const { payload } = action;
      return {
        authUser: payload,
        loadStatus: LOAD_STATUSES.LOADED,
      };
    }
    case AUTHUSER_ACTION.GET_AUTHUSER_FAILURE: {
      return {
        ...state,
        loadStatus: LOAD_STATUSES.ERROR,
      };
    }

    default:
      return state;
  }
};
