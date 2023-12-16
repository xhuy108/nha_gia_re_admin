import React from 'react';
import {Tabs, Card, Row, Col, Typography, Button, Select, Table } from 'antd';
import Search from 'antd/es/input/Search';
import Breadcrumbs from '../../../globalComponents/BreadCrumb/BreadCrumb';
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PostTable from '../components/Table';
import { Tag } from 'antd';

const columns = [
  {
    title: "Mã CODE",
    dataIndex: "code",
    key: "code",
  },
  {
    title: "Gói",
    dataIndex: "package_name",
    key: "package_name",
  },
  {
    title: "Mô tả",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Giảm giá (%)",
    dataIndex: "discount_percent",
    sorter: (a, b) => a.discount_percent - b.discount_percent,
    key: "discount_percent",
  },
  {
    title: "Số lượng sử dụng",
    dataIndex: "limited_quantity",
    sorter: (a, b) => a.limited_quantity - b.limited_quantity,
    key: "limited_quantity",
  },
  {
    title: "Ngày tạo",
    dataIndex: "created_at",
    key: "created_at",
  },
  {
    title: "Ngày bắt đầu",
    dataIndex: "starting_date",
    key: "starting_date",
  },
  {
    title: "Ngày hết hạn",
    dataIndex: "expiration_date",
    key: "expiration_date",
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
    code: 'XMAS2023',
    description: 'Ưu đãi mùa noel 2023',
    package_name: 'Cơ bản',
    discount_percent: '20',
    created_at: '01/01/2023',
    starting_date: '01/12/2023',
    expiration_date: '31/12/2023',
    is_active: true,
    limited_quantity: 1000
  },
  {
    key: '2',
    code: 'NEWY2023',
    description: 'Ưu đãi mùa noel 2023',
    package_name: 'Chuyên gia',
    discount_percent: '20',
    created_at: '01/01/2023',
    starting_date: '01/12/2023',
    expiration_date: '31/12/2023',
    is_active: true,
    limited_quantity: 1000
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
             Mã giảm giá
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