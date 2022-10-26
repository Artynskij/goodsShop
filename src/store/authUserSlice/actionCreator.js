import { Api } from "../../api"
import { AUTHUSER_ACTION } from "./constants"


export const getAuthUser = () => ({ type: AUTHUSER_ACTION.GET_AUTHUSER })


export const getAuthUserSuccess = (users) => ({
    type: AUTHUSER_ACTION.GET_AUTHUSER_SUCCESS,
    payload: users,
  });
  export const getAuthUserFailure = () => ({
    type: AUTHUSER_ACTION.GET_AUTHUSER_FAILURE,
  });

export const fetchAuthUser = () => async (dispatch) => {
dispatch(getAuthUser())
const api = new Api()
api
  .getAuthUser()
  .then(({authUsers}) => {
    dispatch(getAuthUserSuccess(authUsers));
  })
  .catch(() => {
    dispatch(getAuthUserFailure());
  });
}
export const addAuthUser = (data, status) => async (dispatch) => {
  const api = new Api();

  api
    .changeAuthUser(data, status)
    .then(() => dispatch(fetchAuthUser()))
    .catch(() => {
      dispatch(getAuthUserFailure());
    });

};