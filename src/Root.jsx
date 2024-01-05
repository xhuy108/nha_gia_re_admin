import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router';
import Header from './globalComponents/Header/Header';
import { Flex, Spin } from 'antd';
import { ToastContainer } from 'react-toastify';
import {
  // existing code
  useNavigation,
} from 'react-router-dom';
import SideBar from './globalComponents/SideBar/SideBar';
import { Button, ConfigProvider, Space } from 'antd';
import './Root.css';
import Login from './modules/login/Login';
const Root = () => {
  const navigation = useNavigation();
  const [isLogin, setIsLogin] = useState();
  useEffect(() => {
    // Load data from localStorage when the component mounts
    console.log('calling in root');
    const isLoginStore = localStorage.getItem('isLogin');
    console.log(typeof isLoginStore);
    if (isLoginStore === 'true') {
      console.log('login = true');
      setIsLogin(isLoginStore);
    } else {
      console.log('chưa login');
      setIsLogin(false);
    }
  }, [isLogin]);

  const handleLoginChange = (newValue) => {
    // Update state when input changes
    setIsLogin(newValue);
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          // Seed Token
          colorPrimary: '#026D4D',
          borderRadius: 2,
          // Alias Token
          colorBgContainer: ' #FFFFFF',
        },
      }}
    >
      {isLogin ? (
        <div className="App">
          <Header />
          <div className="SideMenuAndPageContent">
            <SideBar />
            <div className="PageContent">
              {navigation.state === 'loading' ? (
                <div className="Spiner">
                  <Flex vertical align="center">
                    <Spin tip="Loading" size="large"></Spin>
                  </Flex>
                </div>
              ) : (
                <Outlet />
              )}
            </div>
          </div>
          <ToastContainer />
        </div>
      ) : (
        <Login handleLoginChange={handleLoginChange} />
      )}
    </ConfigProvider>
  );
};

export default Root;
