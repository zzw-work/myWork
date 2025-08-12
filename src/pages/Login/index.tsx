/**
 * author：钟郑威
 * introduction： 登录页面
 */
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Button, Space, Form, Input } from "antd-mobile";
import { EyeInvisibleOutline, EyeOutline } from "antd-mobile-icons";
import { login } from "src/services/user";
import { setToken } from "src/utils/token";

import { Link } from "react-router-dom";
import "./index.less";

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

const Login = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const onSubmit = async () => {
    try {
      const values = form.getFieldsValue();
      const res = await login(values);
      console.log("res", res);
      if (res?.success) {
        console.log("登录成功");
        setToken(1);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="loginBox">
      <div className="loginTitle">欢迎使用OurLink</div>
      <Form
        className="loginForm"
        form={form}
        initialValues={{
          a: "aaa",
          b: [],
        }}
        footer={
          <Button block color="primary" onClick={onSubmit} size="large">
            登录
          </Button>
        }
      >
        <Form.Item name="username" className="username">
          <Input placeholder={"用户名: admin or user"} clearable />
        </Form.Item>
        <Form.Item
          name="password"
          extra={
            <div className={"eye"}>
              {!visible ? (
                <EyeInvisibleOutline onClick={() => setVisible(true)} />
              ) : (
                <EyeOutline onClick={() => setVisible(false)} />
              )}
            </div>
          }
        >
          <Input
            placeholder={"密码: ice"}
            clearable
            type={visible ? "text" : "password"}
          />
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
