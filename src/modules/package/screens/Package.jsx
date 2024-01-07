import React from 'react';
import {
  Tabs,
  Card,
  Row,
  Col,
  Typography,
  Button,
  Select,
  Table,
  Space,
} from 'antd';
import Breadcrumbs from '../../../globalComponents/BreadCrumb/BreadCrumb';
import Search from 'antd/es/input/Search';
import { useState, useRef, useEffect } from 'react';
import { useNavigate, useFetcher, useLoaderData } from 'react-router-dom';
import PostTable from '../components/Table';
import { Tag } from 'antd';
import ApiService from '../../../service/ApiService';
import moment from 'moment';

export async function loader() {
  const voucher = await ApiService.get(
    'membership-packages?is_active[eq]=true&page=all',
  );
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

function Package(props) {
  const columns = [
    {
      title: 'Tên',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Giá/tháng',
      dataIndex: 'price_per_month',
      sorter: (a, b) => a.price_per_month - b.price_per_month,
      key: 'price_per_month',
    },
    {
      title: 'Số lượng bài đăng/tháng',
      dataIndex: 'monthly_post_limit',
      sorter: (a, b) => a.monthly_post_limit - b.monthly_post_limit,
      key: 'monthly_post_limit',
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (date) => moment(date).format('hh:mm DD/MM/YYYY'),
    },
    {
      title: 'Điểm ưu tiên hiện bài',
      dataIndex: 'display_priority_point',
      key: 'display_priority_point',
    },
    {
      title: 'Điểm ưu tiên duyệt bài',
      dataIndex: 'post_approval_priority_point',
      key: 'post_approval_priority_point',
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
  const fetcher = useFetcher();
  // const navigate = useNavigate();
  const { Title } = Typography;
  let { voucher } = useLoaderData();
  const [query, setQuery] = useState('');
  voucher = voucher.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase()),
  );
  const handleSearch = (value) => {
    // Handle the search logic here
    console.log('Search value:', value);
    setQuery(value);
  };

  return (
    <div>
      <Card>
        <Breadcrumbs />
        <Row style={{ marginBottom: '16px' }}>
          <Col>
            <Title level={3} style={{ margin: 0, padding: 0 }}>
              Gói dịch vụ
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
              onSearch={handleSearch}
              enterButton
            />
          </Col>
        </Row>

        <PostTable columns={columns} data={voucher} />
      </Card>
    </div>
  );
}

export default Package;
