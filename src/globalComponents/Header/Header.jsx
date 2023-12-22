import React from 'react';
import {
  BellOutlined,
  MailOutlined,
  CaretDownOutlined,
} from '@ant-design/icons';
import { UserOutlined } from '@ant-design/icons';
import { Row, Col, Select, Button } from 'antd';

import { Badge, Image, Avatar, Space, Divider } from 'antd';
import style from './Header.module.css';
import logo from '../../../assets/Logo.png';

function Header() {
  return (
    <div className={style.AppHeader}>
      <img
        src={logo}
        alt=""
        style={{
          height: '40px',
          paddingTop: '8px',
          paddingBottom: '8px',
          paddingLeft: '32px',
        }}
      />
      <Space>
        <Badge count={3} dot>
          <BellOutlined style={{ fontSize: 24 }} />
        </Badge>
        <Divider type="vertical" style={{ width: 3, height: 30 }} />
        <Avatar
          size={36}
          icon={<UserOutlined />}
          style={{ backgroundColor: '#026D4D' }}
        />
        <Row>Admin</Row>
        <CaretDownOutlined />
      </Space>
    </div>
  );
}

export default Header;
