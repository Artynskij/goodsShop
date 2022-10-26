import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { reducer as reducerCategory } from "./categorySlice";
import { reducer as reducerGoods } from "./goodsSlice";
import { reducer as reducerPopularGoods } from "./popularGoodsSlice";
import { reducer as reducerBasketGoods } from "./basketSlice";
import { reducer as reducerLogin } from "./loginSlice";
import { reducer as reducerAuthUser } from "./authUserSlice";


export const rootReducer = combineReducers({
  categories: reducerCategory,
  goods: reducerGoods,
  popularGoods: reducerPopularGoods,
  basketGoods: reducerBasketGoods,
  login:  reducerLogin,
  authUser: reducerAuthUser,

});

export const store = createStore(rootReducer, compose(applyMiddleware(thunk)));
