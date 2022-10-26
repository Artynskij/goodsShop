import { POPULAR_GOODS_ACTIONS } from "./constants";
import { Api } from "../../api";

export const getPopularGoods = () => ({ type: POPULAR_GOODS_ACTIONS.GET_POPULAR_GOODS });

export const getPopularGoodsSuccess = (popularGoods) => ({
  type: POPULAR_GOODS_ACTIONS.GET_POPULAR_GOODS_SUCCESS,
  payload: popularGoods,
});
export const getPopularGoodsFailure = () => ({
  type: POPULAR_GOODS_ACTIONS.GET_POPULAR_GOODS_FAILURE,
});

export const fetchPopularGoods = (id) => async (dispatch) => {
  dispatch(getPopularGoods());
  const api = new Api();
  api
    .getPopularGoods(id)
    .then((i) => {
      dispatch(getPopularGoodsSuccess(i));
    })
    .catch(() => {
      dispatch(getPopularGoodsFailure());
    });
};
