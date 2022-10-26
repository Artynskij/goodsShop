import styles from "./Header.module.css";
import { Input } from "antd";
import { Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Basket } from "../Basket";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchGoods, GoodsSelectors } from "../../store/goodsSlice";
import {
  addAuthUser,
  AuthUserSelectors,
  fetchAuthUser,
} from "../../store/authUserSlice";
import { LoginSelectors } from "../../store/loginSlice";

export const Header = (props) => {
  const [value, setValue] = useState("");

  // const [dropdownActive, setDropdownActive] = useState(true);
  const goods = useSelector(GoodsSelectors);

  const authUser = useSelector(AuthUserSelectors);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAuthUser());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchGoods());
  }, [dispatch]);

  const buttonLogin = () => {
    return (
      <div className={styles.container_login}>
        <Link to={"/login"}>
          <Button type="primary">Войти</Button>
        </Link>
      </div>
    );
  };

  const avatar = () => {
    const trueUser = authUser[0];
    const buttonBack = (user) => {
      dispatch(addAuthUser(user, "DELETE"));
    };
    return (
      <div className={styles.container_login}>
        <div className={styles.avatar}>{trueUser.login[0].toUpperCase()}</div>
        <div className={styles.avatar_name}>{trueUser.login}</div>
        <Link
          onClick={() => {
            buttonBack(trueUser);
          }}
          className={styles.back}
          to={"/login"}
        >
          Выйти
        </Link>
      </div>
    );
  };

  const findNameGoods = goods.filter((good) => {
    return good.label.toLowerCase().includes(value.toLowerCase());
  });

  findNameGoods.splice(7);

  return (
    <div className={styles.container}>
      <Link to={"/"}>
        <div className={styles.container_logo}>
          <img
            className={styles.logo}
            src="https://png.pngtree.com/png-clipart/20200709/original/pngtree-initial-letter-ga-logo-template-png-image_3580144.jpg"
            alt="logo"
          />
        </div>
      </Link>

      <div className={styles.container_find}>
        <div>
          number, Закажите звонок или напишите намПодарки на Новый год 2023
        </div>

        <div className={styles.searchGoods}>
          <Input
            onChange={(event) => {
              setValue(event.target.value);
            }}
          />

          <Link to="/Goods">
            <div>
              {" "}
              <Button icon={<SearchOutlined />} />
            </div>
          </Link>

          {/* <Link>
            <div>Search</div>
          </Link> */}
        </div>
        <div className={styles.container_dropdownGoodsActive}>
          {value.length > 1 ? (
            findNameGoods.map((good) => {
              return (
                <Link to={`/${good.categoryTypeId}/${good.id}`}>
                  {" "}
                  <div key={good.id} className={styles.dropdownGoods}>
                    {good.label}
                  </div>
                </Link>
              );
            })
          ) : (
            <div></div>
          )}{" "}
        </div>
      </div>

      <div className={styles.container_basket}>
        <Basket />
      </div>

      {authUser.length > 0 ? avatar() : buttonLogin()}
      {/* <div className={styles.container_login}>
      </div> */}
    </div>
  );
};
