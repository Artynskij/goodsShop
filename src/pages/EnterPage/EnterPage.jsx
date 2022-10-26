import { Form, Input, Button, Checkbox } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Api } from "../../api";
import { fetchLogin, LoginSelectors } from "../../store/loginSlice";
import { Link } from "react-router-dom";
import styles from "./EnterPage.module.css";
import { Modal } from "../../components/Modal";
import { Header } from "../../components/Header";
import { addAuthUser, AuthUserSelectors, fetchAuthUser } from "../../store/authUserSlice";

export function LoginPage() {
  // const [allUsers, setAllUsers] = useState(null);
  // const [user, setUser] = useState(null);
  // const [impostor, setImpostor] = useState(false)
  const [modalActive, setModalActive] = useState(false);
  const [modalTxt, setModalTxt] = useState(null);
  const [impostor, setImpostor] = useState(false);

  const api = new Api();
  console.log(api);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchLogin());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchAuthUser());
  }, [dispatch]);
  const allUsers = useSelector(LoginSelectors);
  const authUser = useSelector(AuthUserSelectors);
  console.log(authUser);
  const checkUser = (user) => {
    console.log("User", user);
    console.log("allUsers", allUsers);
    const findUser = allUsers.find((i) => {
      return (
        i.login.toLowerCase() === user.username.toLowerCase() &&
        i.password === user.password
      );
    });
    console.log("findUser", findUser);
    findUser ? loginRight(findUser) : loginFalse();
    setModalActive(true);
  };

  const loginRight = (user) => {
    
    dispatch(addAuthUser(user, "POST"))
    setModalTxt(`Добро пожаловать госпадин ${user.login}`);
    setImpostor(true);
  };

  const loginFalse = () => {
    setModalTxt("Такого пользователя нету.");
  };
  const onFinish = (values) => {
    console.log("Success:", values);

    checkUser(values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className={styles.registration_container}>
      <div className={styles.header}>
        <Link to={"/"}>
          <div className={styles.container_logo}>
            <img
              className={styles.logo}
              src="https://png.pngtree.com/png-clipart/20200709/original/pngtree-initial-letter-ga-logo-template-png-image_3580144.jpg"
              alt="logo"
            />
          </div>
        </Link>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          textAlign: "center",
          alignItems: "center",
          marginTop: "",
        }}
      >
        <Form
          style={{ marginTop: "100px" }}
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Вы не ввели логин!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Вы не ввели пароль!" }]}
          >
            <Input.Password />
          </Form.Item>
          <div>
            Нету аккаунта? <Link to="/Reg"> Зарегистрируйтесь</Link>
          </div>
          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 8, span: 16 }}
          >
            <Checkbox>Запомнить меня</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Войти
            </Button>
          </Form.Item>
        </Form>
      </div>
      <Modal active={modalActive} setActive={setModalActive}>
        <div className={styles.modal__content_text}>{modalTxt}</div>
        {impostor ? (
          <Link to="/">
            <Button type="primary">Спасибо</Button>
          </Link>
        ) : (
          <Button
            onClick={() => {
              setModalActive(false);
            }}
            type="primary"
          >
            Назад
          </Button>
        )}
      </Modal>
    </div>
  );
}
