import { BASKET_ACTIONS } from "./constants";
import { Api } from "../../api";


export const getBasket = () => ({ type: BASKET_ACTIONS.GET_BASKET });

export const getBasketSuccess = (basket) => ({
  type: BASKET_ACTIONS.GET_BASKET_SUCCESS,
  payload: basket,
});
export const getBasketFailure = () => ({
  type: BASKET_ACTIONS.GET_BASKET_FAILURE,
});

export const fetchBasket = () => async (dispatch) => {
  dispatch(getBasket());
  const api = new Api();

  api
    .getСart()
    .then(({ carts }) => {
      dispatch(getBasketSuccess(carts));
    })
    .catch(() => {
      dispatch(getBasketFailure());
    });
};

export const changeBasket = (data, status) => async (dispatch) => {
  const api = new Api();

  api.changeCart(data, status)
    .then(() => dispatch(fetchBasket()))
    .catch(() => {
      dispatch(getBasketFailure());
    })

};
