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
  Tag,
  Space,
} from 'antd';
import Breadcrumbs from '../../../globalComponents/BreadCrumb/BreadCrumb';
import Search from 'antd/es/input/Search';
import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLoaderData, useFetcher } from 'react-router-dom';
import PostTable from '../components/Table';
import ApiService from '../../../service/ApiService';
import {
  CloseOutlined,
  DeleteOutlined,
  ExclamationCircleFilled,
  LockOutlined,
} from '@ant-design/icons';
import moment from 'moment';

//function loader to call API
export async function loader() {
  const users = await ApiService.get('users');
  console.log('length', users.length);
  if (!users) {
    throw new Response('', {
      status: 404,
      statusText: 'Not Found',
    });
  }
  //const postLease = posts.filter(post => post.is_lease === true);
  //const postNoLease = posts.filter(post => post.is_lease === false);
  // console.log("lease", postLease)
  // console.log("no lease", postNoLease)
  console.log('users: ', users);
  return { users };
}

function User(props) {
  const fetcher = useFetcher();
  const navigate = useNavigate();
  const { Title } = Typography;
  const { users } = useLoaderData();

  const columns = [
    {
      title: 'Tên',
      dataIndex: 'first_name',
      key: 'first_name',
    },
    {
      title: 'Họ',
      dataIndex: 'last_name',
      key: 'last_name',
    },
    {
      title: 'Ngày sinh',
      dataIndex: 'dob',
      key: 'dob',
      render: (datee) => moment(datee).format('DD/MM/YYYY'),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Giới tính',
      dataIndex: 'gender',
      render: (gender) => <span>{gender ? 'Nam' : 'Nữ'}</span>,
      key: 'gender',
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      render: (status) => (
        <span>
          {
            <Tag
              color={
                status == 'verified'
                  ? 'green'
                  : status == 'not_update'
                  ? 'purple'
                  : status == 'banned'
                  ? 'red'
                  : 'yellow'
              }
              key={status}
            >
              {status == 'verified'
                ? 'Đã xác minh'
                : status == 'not_update'
                ? 'Chưa cập nhật'
                : status == 'banned'
                ? 'Đã khóa'
                : 'Chờ xác minh'}
            </Tag>
          }
        </span>
      ),
      key: 'status',
      filters: [
        {
          text: 'Đã xác minh',
          value: 'verified',
        },
        {
          text: 'Chờ xác minh',
          value: 'unverified',
        },
        {
          text: 'Chưa cập nhật',
          value: 'not_update',
        },
        ,
        {
          text: 'Đã khóa',
          value: 'banned',
        },
        {
          text: 'Chưa cập nhật',
          value: 'not_update',
        },
      ],
      onFilter: (value, record) => record.status == value,
      filterSearch: true,
    },
    {
      title: 'Vai trò',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Hành động',
      key: 'action',
      dataIndex: 'status',
      render: (status, record) => (
        <Space size="middle">
          {status != 'banned' ? (
            <fetcher.Form method="patch">
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                }}
                type="primary"
                htmlType="submit"
                name="id"
                style={{ backgroundColor: '#FFCD29', color: 'black' }}
                value={record.id}
              >
                Khóa
              </Button>
              <input type="hidden" name="type" value="ban" />
            </fetcher.Form>
          ) : (
            <fetcher.Form method="patch">
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                }}
                type="primary"
                htmlType="submit"
                name="id"
                style={{ backgroundColor: '#026D4D', color: 'white' }}
                value={record.id}
              >
                Mở khóa
              </Button>
              <input type="hidden" name="type" value="unban" />
            </fetcher.Form>
          )}
        </Space>
      ),
    },
  ];

  const data1 = [
    {
      key: '1',
      name: 'Nhà sổ hồng riêng 5x15 ngã 3 Lý Thường Kiệt, Thủ Đức',
      author: 'Nguyễn Thành Trung',
      description: 'Mô tả 1',
      price: 1000000,
      area: 100,
      uploadDate: '01/01/2023',
      propertyType: 'Loại 1',
    },
    {
      key: '2',
      name: 'Nhà 2',
      author: 'Người 2',
      description: 'Mô tả 2',
      price: 2000000,
      area: 200,
      uploadDate: '02/01/2023',
      propertyType: 'Loại 2',
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
      label: 'Người dùng',
      children: <PostTable columns={columns} data={data1} abc="người dùng" />,
    },
    {
      key: '2',
      label: 'Bài đăng',
      children: <PostTable columns={columns} data={data2} abc="bài đăng" />,
    },
    // {
    //   key: '3',
    //   label: 'Cuộc trò chuyện',
    //   children: <PostTable columns={columns} data={data2} abc='cuộc trò chuyện'/>,
    // },
    // {
    //   key: '4',
    //   label: 'Bình luận',
    //   children: <PostTable columns={columns} data={data2} abc='bình luận'/>,
    // },
  ];

  return (
    <div>
      <Card>
        <Breadcrumbs />
        <Row style={{ marginBottom: '16px' }}>
          <Col>
            <Title level={3} style={{ margin: 0, padding: 0 }}>
              DS Người dùng
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
        <PostTable columns={columns} data={users} abc="DS Người dùng" />,
      </Card>
    </div>
  );
}

export default User;
