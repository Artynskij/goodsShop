import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import { Card, Col, Row } from "antd";
import styles from "./Basket.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  BasketSelectors,
  changeBasket,
  fetchBasket,
  LOAD_STATUSES,
} from "../../store/basketSlice";
import { getBasketLoadStatus } from "../../store/basketSlice/selectors";

const { Meta } = Card;

export const Basket = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchBasket());
  }, [dispatch]);

  const basketGoods = useSelector(BasketSelectors);
  
  let goods = [];

  if (basketGoods.length === 0) {
    goods = [
      {
        labelNot: "У вас нету товаров",
        id: 0,
        isVisible: 0,
        img: "data:image/jpeg;base64,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",
      },
    ];
  } else {
    goods = basketGoods;
  }

  const delGood = (id) => {
    console.log("click del in basket");
    const basketGood = basketGoods.find((el) => el.id === id);
    dispatch(changeBasket(basketGood, "DELETE"));
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <div onClick={showModal}>
        <div className={styles.value_basket}>{basketGoods.length}</div>
        <img
          className={styles.basket}
          src="https://cdn-icons-png.flaticon.com/512/3081/3081822.png"
          alt="basket"
        />
      </div>
      <Modal
        title="Корзина"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {goods.map((item) => {
          return (
            <Col  key={item.id} span={4}>
              <Card
                hoverable
                style={{
                  width: "450px",
                  marginBottom: "30px",
                  padding: "15px",
                }}
                cover={
                  <img
                    style={{ height: "250px" }}
                    alt="example"
                    src={item.img}
                  />
                }
              >
                <Meta  style={{opacity:item.isVisible}} title={item.label} description={"цена " + item.price} />
                <div className={styles.labelNot}>{item.labelNot}</div>

                <button
                  style={{opacity:item.isVisible}}
                  className={styles.buttonDel}
                  onClick={() => delGood(item.id)}
                >
                  Удалить из корзины
                </button>
              </Card>
            </Col>
          );
        })}
        {/* <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p> */}
      </Modal>
    </>
  );
};
