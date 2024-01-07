import React from 'react';
import {
  Space,
  Tabs,
  Card,
  Row,
  Col,
  Typography,
  Button,
  Select,
  Table,
} from 'antd';
import Search from 'antd/es/input/Search';
import Breadcrumbs from '../../../globalComponents/BreadCrumb/BreadCrumb';
import { useState, useRef, useEffect } from 'react';
import { useNavigate, useFetcher, useLoaderData } from 'react-router-dom';
import PostTable from '../components/Table';
import { Tag } from 'antd';
import ApiService from '../../../service/ApiService';
import moment from 'moment';

export async function loader() {
  const voucher = await ApiService.get(
    'discount-codes?is_active[eq]=true&page=all',
  );
  const packageList = await ApiService.get(
    'membership-packages?is_active[eq]=true&page=all',
  );
  console.log('packageList,', packageList);
  console.log('length', voucher.length);
  if (!voucher) {
    throw new Response('', {
      status: 404,
      statusText: 'Not Found',
    });
  }
  console.log('voucher: ', voucher);
  return { voucher, packageList };
}

function Voucher(props) {
  const navigate = useNavigate();
  const { Title } = Typography;
  let { voucher, packageList } = useLoaderData();
  const fetcher = useFetcher();
  const [query, setQuery] = useState('');
  //filter search
  voucher = voucher.filter((item) =>
    item.code.toLowerCase().includes(query.toLowerCase()),
  );

  const handleSearch = (value) => {
    // Handle the search logic here
    console.log('Search value:', value);
    setQuery(value);
  };

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
      render: (_, record) =>
        moment(record.expiration_date).format('DD/MM/YYYY'),
    },
    // {
    //   title: 'Trạng thái',
    //   dataIndex: 'is_active',
    //   key: 'is_active',
    //   render: (is_active) => (
    //     <span>
    //       {
    //         <Tag color={is_active ? 'green' : 'red'} key={is_active}>
    //           {is_active ? 'Đang kích hoạt' : 'Vô hiệu'}
    //         </Tag>
    //       }
    //     </span>
    //   ),
    // },
    {
      title: 'Hành động',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <fetcher.Form method="patch">
            <Button
              onClick={(e) => {
                e.stopPropagation();
              }}
              type="primary"
              danger
              htmlType="submit"
              name="id"
              value={record.id}
            >
              Xóa
            </Button>
            <input type="hidden" name="type" value="delete" />
          </fetcher.Form>
        </Space>
      ),
    },
  ];
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
              placeholder="Nhập mã giảm giá cần tìm..."
              style={{
                width: 500,
              }}
              onSearch={handleSearch}
              enterButton
            />
          </Col>
        </Row>

        <PostTable columns={columns} data={voucher} packageList={packageList} />
      </Card>
    </div>
  );
}

export default Voucher;
