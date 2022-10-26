import { Api } from "../../api"
import { LOGIN_ACTION } from "./constants"


export const getLogin = () => ({ type: LOGIN_ACTION.GET_LOGIN })


export const getLoginSuccess = (users) => ({
    type: LOGIN_ACTION.GET_LOGIN_SUCCESS,
    payload: users,
  });
  export const getLoginFailure = () => ({
    type: LOGIN_ACTION.GET_LOGIN_FAILURE,
  });

export const fetchLogin = () => async (dispatch) => {
dispatch(getLogin())
const api = new Api()
api
  .getLogin()
  .then((items) => {
    dispatch(getLoginSuccess(items));
  })
  .catch(() => {
    dispatch(getLoginFailure());
  });
}
export const addUser = (data, status) => async (dispatch) => {
  const api = new Api();

  api
    .changeLogin(data, status)
    .then(() => dispatch(fetchLogin()))
    .catch(() => {
      dispatch(getLoginFailure());
    });

};