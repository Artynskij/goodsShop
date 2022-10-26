import { CATEGORIES_ACTIONS } from "./constants";
import { Api } from "../../api";

export const getCategories = () => ({ type: CATEGORIES_ACTIONS.GET_CATEGORIES});

export const getCategoriesSuccess = (categories) => ({
  type: CATEGORIES_ACTIONS.GET_CATEGORIES_SUCCESS,
  payload: categories,
});
export const getCategoriesFailure = () => ({
  type: CATEGORIES_ACTIONS.GET_CATEGORIES_FAILURE,
});

export const fetchCategories = (id) => async (dispatch) => {
  dispatch(getCategories());
  const api = new Api();
  api
    .getСategories(id)
    .then(( categories ) => {
      dispatch(getCategoriesSuccess(categories.categories));
    })
    .catch(() => {
      dispatch(getCategoriesFailure());
    });
};
