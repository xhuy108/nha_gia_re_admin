import React from 'react';
import { Tabs, Card, Row, Col, Typography, Button, Select, Table } from 'antd';
import Search from 'antd/es/input/Search';
import Breadcrumbs from '../../../globalComponents/BreadCrumb/BreadCrumb';
import { useState, useRef, useEffect } from 'react';
import { useNavigate, useFetcher, useLoaderData } from 'react-router-dom';
import PostTable from '../components/Table';
import { Tag } from 'antd';
import ApiService from '../../../service/ApiService';
import moment from 'moment';

export async function loader() {
  const voucher = await ApiService.get('discount-codes');
  console.log('length', voucher.length);
  if (!voucher) {
    throw new Response('', {
      status: 404,
      statusText: 'Not Found',
    });
  }
  console.log('voucher: ', voucher);
  return { voucher };
}

const columns = [
  {
    title: 'Mã CODE',
    dataIndex: 'code',
    key: 'code',
  },
  {
    title: 'Số tháng đăng ký',
    dataIndex: 'min_subscription_months',
    key: 'min_subscription_months',
  },
  {
    title: 'Mô tả',
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: 'Giảm giá (%)',
    dataIndex: 'discount_percent',
    sorter: (a, b) => a.discount_percent - b.discount_percent,
    key: 'discount_percent',
  },
  {
    title: 'Số lượng sử dụng',
    dataIndex: 'limited_quantity',
    sorter: (a, b) => a.limited_quantity - b.limited_quantity,
    key: 'limited_quantity',
  },
  {
    title: 'Ngày tạo',
    dataIndex: 'created_at',
    key: 'created_at',
    render: (_, record) => moment(record.created_at).format('DD/MM/YYYY'),
  },
  {
    title: 'Ngày bắt đầu',
    dataIndex: 'starting_date',
    key: 'starting_date',
    render: (_, record) => moment(record.starting_date).format('DD/MM/YYYY'),
  },
  {
    title: 'Ngày hết hạn',
    dataIndex: 'expiration_date',
    key: 'expiration_date',
    render: (_, record) => moment(record.expiration_date).format('DD/MM/YYYY'),
  },
  {
    title: 'Trạng thái',
    dataIndex: 'is_active',
    key: 'is_active',
    render: (is_active) => (
      <span>
        {
          <Tag color={is_active ? 'green' : 'red'} key={is_active}>
            {is_active ? 'Đang kích hoạt' : 'Vô hiệu'}
          </Tag>
        }
      </span>
    ),
  },
];

function Voucher(props) {
  const navigate = useNavigate();
  const { Title } = Typography;
  const { voucher } = useLoaderData();
  const fetcher = useFetcher();

  return (
    <div>
      <Card>
        <Breadcrumbs />
        <Row style={{ marginBottom: '16px' }}>
          <Col>
            <Title level={3} style={{ margin: 0, padding: 0 }}>
              Mã giảm giá
            </Title>
          </Col>
        </Row>
        <Row style={{ marginBottom: '12px' }}>
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

        <PostTable columns={columns} data={voucher} />
      </Card>
    </div>
  );
}

export default Voucher;
