import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router";
import { useState } from "react";
import { Card } from "antd";
import style from "./ProductPage.module.css";
import { fetchGoods, GoodsSelectors } from "../../store/goodsSlice";
import { Header } from "../../components/Header";
import { Api } from "../../api";
import { changeBasket, BasketSelectors } from "../../store/basketSlice";
import { getBasketLoadStatus } from "../../store/basketSlice/selectors";
import { LOAD_STATUSES } from "../../store/categorySlice";

export const BUTTON_STATUS = {
  putInBasket: "Положить в корзину",
  delFromBasket: "Удалить из корзины",
};

export function ProductPage() {
  let [stateButton, setCount] = useState(true);
  let [disabled, setDisabled] = useState(false);
  let [labelButton, setLabelButton] = useState("добавить в корзину");
  // let disabled = false;
  // let labelButton = "добавить в корзину";

  const allGoods = useSelector(GoodsSelectors);

  const useCategories = useParams();
  const { type, id } = useCategories;
  const idGood = "ids=" + id;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchGoods(idGood));
  }, [dispatch, idGood]);
  const navigate = useNavigate();
  const basketGoods = useSelector(BasketSelectors);

  const product = allGoods.find((el) => el.id === id);
// console.log(product);
  if (!product) {
    return (
      <span>
        Sorry, there is no such product. Please, go{" "}
        <a onClick={() => navigate(-1)}>Back</a> and try something else.{" "}
      </span>
    );
  }
  const _haveBasketGoods = basketGoods.find((el) => el.parentId === id);
  
  function haveGoods() {
    if (_haveBasketGoods) {
      return (
        labelButton ="товар в корзине",
        stateButton = false
      );
    }
  }

  const toggleColor = () => {
    haveGoods();
    if (stateButton) {
      return style.toggleTakeBtn;
    }
    return style.toggleRemoveBtn;
  };

  const checkBack = () => {
     
      console.log("click PUT");
      setLabelButton("товар в корзине");
      setDisabled(true);
      setCount(!stateButton);

      // product.id=null;
      dispatch(changeBasket(product, "PUT"))
    
  };

  return (
    <div >
      <Header goodsId={id} />
      <div className={style.container} style={{ padding:"105px 0 0 0" }}>
        <div className={style.container_img}>
          <img className={style.img} src={product.img} alt="img" />
        </div>
        <div className={style.container_discription}>
          <h2 className={style.product_name}>{product.label}</h2>
          <div className={style.discription_price}>{product.price} $</div>
          <button
            onClick={checkBack}
            disabled={disabled}
            className={toggleColor()}
          >
            {labelButton}
          </button>
          <div className={style.discription_discription}>
            {product.description}
          </div>
        </div>
      </div>
      
    </div>
  );
}
