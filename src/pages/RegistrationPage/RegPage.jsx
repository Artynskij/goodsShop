

import { Input, Button, Form, Checkbox } from "antd";
import { useState } from 'react';
import styles from './RegPage.module.css'
import { Link  } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../../store/loginSlice";
import { Modal } from "../../components/Modal";

export const RegPage = () => {

  const [modalActive, setModalActive] = useState(false)


  const dispatch = useDispatch()

  const onFinish = (values) => {
    console.log('Success:', values);
    
    if (values.password === values.repPassword) {
      dispatch(addUser(values, "POST"))
      setModalActive(true)
    } else {alert('не совпадают пароли')}
   
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };




    return (
      <div className={styles.container}>
        <div className={styles.wrapper}>
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
              name="login"
              rules={[{ required: true, message: "Вы не ввели логин!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Pass"
              name="password"
              rules={[{ required: true, message: "Вы не ввели пароль!" }]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              label="Repeat Pass"
              name="repPassword"
              rules={[
                { required: true, message: "Вам нужно повторить пароль!" },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <div>
              Есть аккаунт? <span> </span>
              <Link to="/Login"> Войти</Link>
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
                Зарегистрироваться
              </Button>
            </Form.Item>
          </Form>
        </div>

        <Modal active={modalActive} setActive={setModalActive}>
          <div className={styles.modal__content_text}>
            Добро пожаловать в GA.
          </div>
          <Link to="/Login">
            <Button type="primary">Спасибо</Button>
          </Link>
        </Modal>
      </div>
    );
}