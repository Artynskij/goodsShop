import React, { useEffect } from "react";
import { Card, Col, Row } from "antd";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import style from "./GoodsCategory.module.css";
// import { fetchGoods, GoodsSelectors } from "../../store/goodsSlice";
import {
  fetchPopularGoods,
  PopularGoodsSelectors,
} from "../../store/popularGoodsSlice";

const { Meta } = Card;

export const GoodsCategory = () => {
  const goods = useSelector(PopularGoodsSelectors);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPopularGoods());
  }, [dispatch]);

  return (
    <div>
      {goods.map((category) => {
        return (
          <div
            key={category.category.id}
            className={style.pb20px}
            // className="site-card-wrapper"
          >
            <h2 className={style.header}>{category.category.label}</h2>
            <Row gutter={20}>
              {category.items.map((item) => {
                return (
                  <Col key={item.id} span={4}>
                    <Link to={`/${category.category.id}/${item.id}`}>
                      <Card
                        hoverable
                        style={{
                          width: "200px",
                          marginBottom: "30px",
                          padding: "15px",
                        }}
                        cover={<img alt="example" src={item.img} />}
                      >
                        <Meta
                          title={item.label}
                          description={"цена " + item.price}
                        />
                      </Card>
                    </Link>
                  </Col>
                );
              })}
            </Row>
          </div>
        );
      })}
    </div>
  );
};
