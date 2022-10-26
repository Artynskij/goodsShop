import { GOODS_ACTIONS } from "./constants";
import { Api } from "../../api";

export const getGoods = () => ({ type: GOODS_ACTIONS.GET_GOODS });

export const getGoodsSuccess = (goods) => ({
  type: GOODS_ACTIONS.GET_GOODS_SUCCESS,
  payload: goods,
});
export const getGoodsFailure = () => ({
  type: GOODS_ACTIONS.GET_GOODS_FAILURE,
});

export const fetchGoods = (id) => async (dispatch) => {
  dispatch(getGoods());
  const api = new Api();
  api
    .getGoods(id)
    .then(({ items }) => {
      dispatch(getGoodsSuccess(items));
    })
    .catch(() => {
      dispatch(getGoodsFailure());
    });
};
