import React from 'react';
import {Tabs, Card, Row, Col, Typography, Button, Select, Table } from 'antd';
import Breadcrumbs from '../../../globalComponents/BreadCrumb/BreadCrumb';
import Search from 'antd/es/input/Search';
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PostTable from '../components/Table';
import { Tag } from 'antd';

const columns = [
  {
    title: "Tên",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Mô tả",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Giá/tháng",
    dataIndex: "price_per_month",
    sorter: (a, b) => a.price_per_month - b.price_per_month,
    key: "price_per_month",
  },
  {
    title: "Số lượng bài đăng/tháng",
    dataIndex: "monthly_post_limit",
    sorter: (a, b) => a.monthly_post_limit - b.monthly_post_limit,
    key: "monthly_post_limit",
  },
  {
    title: "Ngày tạo",
    dataIndex: "created_at",
    key: "created_at",
  },
  {
    title: "Điểm ưu tiên",
    dataIndex: "display_priority_point",
    key: "display_priority_point",
  },
  {
    title: "Trạng thái",
    dataIndex: "is_active",
    key: "is_active",
    render: (is_active) => (
        <span>
          {
            
              <Tag color={is_active ? "green" : "red"} key={is_active}>
                {is_active ? "Đang kích hoạt" : "Vô hiệu"}
              </Tag>
            
          }
        </span>
      ),
    },
];

const data1 = [
  {
    key: '1',
    name: 'Cơ bản',
    description: 'Gói khuyên dùng cho người mới bắt đầu',
    price_per_month: 360000,
    monthly_post_limit: 20,
    created_at: '01/01/2023',
    display_priority_point: '1',
    is_active: true
  },
  {
    key: '2',
    name: 'Chuyên gia',
    description: 'Gói dành cho các dân chơi bất động sản',
    price_per_month: 1260000,
    monthly_post_limit: 100,
    created_at: '01/01/2023',
    display_priority_point: '5',
    is_active: true
  },
  {
    key: '3',
    name: 'Nhà 3',
    author: 'Người 2',
    description: 'Mô tả 2',
    price: 2000000,
    area: 200,
    uploadDate: '02/01/2023',
    propertyType: 'Loại 2',
  },
  {
    key: '4',
    name: 'Nhà 4',
    author: 'Người 2',
    description: 'Mô tả 2',
    price: 2000000,
    area: 200,
    uploadDate: '02/01/2023',
    propertyType: 'Loại 2',
  },
  {
    key: '5',
    name: 'Nhà 5',
    author: 'Người 2',
    description: 'Mô tả 2',
    price: 2000000,
    area: 200,
    uploadDate: '02/01/2023',
    propertyType: 'Loại 2',
  },
  {
    key: '6',
    name: 'Nhà 6',
    author: 'Người 2',
    description: 'Mô tả 2',
    price: 2000000,
    area: 200,
    uploadDate: '02/01/2023',
    propertyType: 'Loại 2',
  },
  {
    key: '7',
    name: 'Nhà 7',
    author: 'Người 2',
    description: 'Mô tả 2',
    price: 2000000,
    area: 200,
    uploadDate: '02/01/2023',
    propertyType: 'Loại 2',
  },
  {
    key: '8',
    name: 'Nhà 8',
    author: 'Người 2',
    description: 'Mô tả 2',
    price: 2000000,
    area: 200,
    uploadDate: '02/01/2023',
    propertyType: 'Loại 2',
  },
  {
    key: '9',
    name: 'Nhà 9',
    author: 'Người 2',
    description: 'Mô tả 2',
    price: 2000000,
    area: 200,
    uploadDate: '02/01/2023',
    propertyType: 'Loại 2',
  },
  {
    key: '10',
    name: 'Nhà 10',
    author: 'Người 2',
    description: 'Mô tả 2',
    price: 2000000,
    area: 200,
    uploadDate: '02/01/2023',
    propertyType: 'Loại 2',
  },
  {
    key: '11',
    name: 'Nhà 11',
    author: 'Người 2',
    description: 'Mô tả 2',
    price: 2000000,
    area: 200,
    uploadDate: '02/01/2023',
    propertyType: 'Loại 2',
  },
  {
    key: '12',
    name: 'Nhà 12',
    author: 'Người 2',
    description: 'Mô tả 2',
    price: 2000000,
    area: 200,
    uploadDate: '02/01/2023',
    propertyType: 'Loại 2',
  },
  // Thêm các dòng dữ liệu khác tại đây (nếu cần)
];

const data2 = [
  {
    key: '1',
    name: 'Nhà xr',
    author: 'Người 1',
    description: 'Mô tả 1',
    price: 2000000,
    area: 100,
    uploadDate: '01/01/2023',
    propertyType: 'Loại 1',
  },
  {
    key: '2',
    name: 'Nhà bahb',
    author: 'Người 2',
    description: 'Mô tả 2',
    price: 2000000,
    area: 200,
    uploadDate: '02/01/2023',
    propertyType: 'Loại 2',
  },
  {
    key: '2',
    name: 'Nhà nfasjn',
    author: 'Người 2',
    description: 'Mô tả 2',
    price: 2000000,
    area: 200,
    uploadDate: '02/01/2023',
    propertyType: 'Loại 2',
  },
  {
    key: '2',
    name: 'Nhà amkdkfma',
    author: 'Người 2',
    description: 'Mô tả 2',
    price: 2000000,
    area: 200,
    uploadDate: '02/01/2023',
    propertyType: 'Loại 2',
  },
  {
    key: '2',
    name: 'Nhà njandjnf',
    author: 'Người 2',
    description: 'Mô tả 2',
    price: 2000000,
    area: 200,
    uploadDate: '02/01/2023',
    propertyType: 'Loại 2',
  },
  {
    key: '1',
    name: 'Nhà xr',
    author: 'Người 1',
    description: 'Mô tả 1',
    price: 2000000,
    area: 100,
    uploadDate: '01/01/2023',
    propertyType: 'Loại 1',
  },
  {
    key: '2',
    name: 'Nhà bahb',
    author: 'Người 2',
    description: 'Mô tả 2',
    price: 2000000,
    area: 200,
    uploadDate: '02/01/2023',
    propertyType: 'Loại 2',
  },
  {
    key: '2',
    name: 'Nhà nfasjn',
    author: 'Người 2',
    description: 'Mô tả 2',
    price: 2000000,
    area: 200,
    uploadDate: '02/01/2023',
    propertyType: 'Loại 2',
  },
  {
    key: '2',
    name: 'Nhà amkdkfma',
    author: 'Người 2',
    description: 'Mô tả 2',
    price: 2000000,
    area: 200,
    uploadDate: '02/01/2023',
    propertyType: 'Loại 2',
  },
  {
    key: '2',
    name: 'Nhà njandjnf',
    author: 'Người 2',
    description: 'Mô tả 2',
    price: 2000000,
    area: 200,
    uploadDate: '02/01/2023',
    propertyType: 'Loại 2',
  },
  {
    key: '2',
    name: 'Nhà nfasjn',
    author: 'Người 2',
    description: 'Mô tả 2',
    price: 2000000,
    area: 200,
    uploadDate: '02/01/2023',
    propertyType: 'Loại 2',
  },
  {
    key: '2',
    name: 'Nhà amkdkfma',
    author: 'Người 2',
    description: 'Mô tả 2',
    price: 2000000,
    area: 200,
    uploadDate: '02/01/2023',
    propertyType: 'Loại 2',
  },
  {
    key: '2',
    name: 'Nhà njandjnf',
    author: 'Người 2',
    description: 'Mô tả 2',
    price: 2000000,
    area: 200,
    uploadDate: '02/01/2023',
    propertyType: 'Loại 2',
  },
  // Thêm các dòng dữ liệu khác tại đây (nếu cần)
];

const tabs = [
  {
    key: '1',
    label: 'Cho thuê',
    children:<PostTable columns={columns} data={data1} abc='cho thuê'/>,
  },
  {
    key: '2',
    label: 'Cần bán',
    children: <PostTable columns={columns} data={data2} abc='cần bán'/>,
  },
];
function PendingPost(props) {
  const navigate = useNavigate()
  const { Title } = Typography;

  return (
    <div>
      <Card>
      <Breadcrumbs/>
        <Row style={{marginBottom:"16px"}}>
          <Col>
            <Title level={3} style={{ margin: 0, padding: 0 }}>
            Gói dịch vụ
            </Title>
          </Col>
        </Row>
        <Row style={{marginBottom:"12px"}}>
          <Col>
              <Search
              placeholder="Nhập thông tin cần tìm..."
              style={{
                width: 500,
              }}
              onSearch={() => {}}
              enterButton
            />
            </Col>
        </Row>
    
        <PostTable columns={columns} data={data1} />
      </Card>
      
    </div>
  );
}

export default PendingPost;