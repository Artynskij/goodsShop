import { LOGIN_ACTION, LOAD_STATUSES } from "./constants"





const INITIAL_STATE ={
    loadStatus : LOAD_STATUSES,
    users : [] 
}

export const reducer = (
    state =INITIAL_STATE,
    action
) => {
switch (action.type) {
    case LOGIN_ACTION.GET_LOGIN:{
        return{
            ...state,
            loadStatus:LOAD_STATUSES.LOADING
        }
    }
    case LOGIN_ACTION.GET_LOGIN_SUCCESS:{

        const { payload } = action
        return{
            users : payload,
            loadStatus:LOAD_STATUSES.LOADED
        }
    }
    case LOGIN_ACTION.GET_LOGIN_FAILURE:{
        return{
            ...state,
            loadStatus:LOAD_STATUSES.ERROR
        }
    }   
        

    default:
       return state;
}
}