import React from 'react';
import { Button, Form, Input } from 'antd';

const style = {
  backgroundColor: '#eaeaea',
  padding: '40px',
  margin: 'auto',
  marginTop: '100px',
  justifyContent: 'center',
  width: 'fit-content',
  borderRadius: '8px',
};

function Login(props) {
  const onFinish = (values) => {
    const userNameStore = localStorage.getItem('userName');
    const passWordStore = localStorage.getItem('passWord');
    if (
      userNameStore === values.username &&
      passWordStore === values.password
    ) {
      console.log('success');
      localStorage.setItem('isLogin', true);
      props.handleLoginChange(true);
    } else {
      console.log('error');
      alert('tên người dùng hoặc mật khẩu không đúng xin thử lại!!');
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div style={style}>
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          width: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: 'Không được bỏ trống field này!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Không được bỏ trống field này!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Login;
