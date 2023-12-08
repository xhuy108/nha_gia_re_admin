import React from "react";
import { Outlet } from "react-router";
import Header from "./globalComponents/Header/Header";
import {
    // existing code
    useNavigation,
  } from "react-router-dom";
import SideBar from "./globalComponents/SideBar/SideBar";
import { Button, ConfigProvider, Space } from 'antd';
import "./Root.css"
const Root = ()=>{
    const navigation = useNavigation();
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
        <div className="App">
            <Header />
            <div className="SideMenuAndPageContent">
                <SideBar/>
                <div className="PageContent">
                    {
                        navigation.state === "loading" ?  "loading" :  <Outlet />
                    }
                </div>
            </div>
      </div>
    </ConfigProvider>
      
    );
}

export default Root;