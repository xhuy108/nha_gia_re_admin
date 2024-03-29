import React, { useEffect, useState } from 'react';
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  FormOutlined,
  UserOutlined,
  WarningOutlined,
  GiftOutlined,
  ReadOutlined,
  DollarOutlined,
} from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Menu } from 'antd';
import style from './SideBar.module.css';
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const items = [
  getItem('Dashboard', '', <PieChartOutlined />),
  getItem('Bài đăng', 'post', <FormOutlined />, [
    getItem('DS Bài đăng chờ duyệt', 'pending_post'),
    getItem('DS Bài đăng đã duyệt', 'approved_post'),
    getItem('DS Bài đăng đã từ chối', 'rejected_post'),
  ]),
  getItem('Gói dịch vụ', 'package', <GiftOutlined />),
  getItem('Mã giảm giá', 'voucher', <ContainerOutlined />),

  getItem('Tố cáo', 'sub2', <WarningOutlined />, [
    getItem('DS Tố cáo chờ duyệt', 'pending_reporting'),
    getItem('DS Tố cáo đã duyệt', 'approved_reporting'),
    getItem('DS Tố cáo đã từ chối', 'rejected_reporting'),
  ]),

  getItem('Người dùng', 'sub3', <UserOutlined />, [
    getItem('DS Người dùng', 'user'),
    getItem('DS yêu cầu xác minh danh tính', 'pending_user'),
    getItem('DS yêu cầu đã xác minh', 'verificated_user'),
    getItem('DS yêu cầu đã từ chối', 'rejected_user'),
  ]),

  getItem('Blogs', 'blogs', <ReadOutlined />),
  // getItem('Nhà đầu tư', 'developer', <DollarOutlined />),
];
const SideBar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState('/');

  useEffect(() => {
    const pathName = location.pathname;
    setSelectedKeys(pathName);
  }, [location.pathname]);

  const navigate = useNavigate();
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  return (
    <div className={style.SideMenu}>
      <Menu
        defaultOpenKeys={['']}
        mode="inline"
        theme="light"
        inlineCollapsed={collapsed}
        items={items}
        onClick={(item) => {
          //item.key
          navigate(item.key);
        }}
      />
      <Button
        type="primary"
        onClick={toggleCollapsed}
        className={style.ToggleButton}
      >
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
    </div>
  );
};
export default SideBar;
