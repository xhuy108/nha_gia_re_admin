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
  Flex,
  Image,
  notification,
  Modal,
  Input,
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
  const users = await ApiService.get(
    'account-verification-requests?page=all&reviewed_at[is]=null',
  );
  console.log('length', users.length);
  if (!users) {
    throw new Response('', {
      status: 404,
      statusText: 'Not Found',
    });
  }
  console.log('users: ', users);
  return { users };
}

function PendingUser(props) {
  const fetcher = useFetcher();
  const navigate = useNavigate();
  const { Title } = Typography;
  const { users } = useLoaderData();

  let reason = '';

  const columns = [
    {
      title: 'Tên đầy đủ',
      dataIndex: 'full_name',
      key: 'full_name',
    },
    {
      title: 'Ngày sinh',
      dataIndex: 'dob',
      key: 'dob',
      render: (datee) => moment(datee).format('DD/MM/YYYY'),
    },
    {
      title: 'Số CCCD/CMND',
      dataIndex: 'identity_card_no',
      key: 'identity_card_no',
    },
    {
      title: 'Ngày cấp',
      dataIndex: 'identity_card_issued_date',
      key: 'identity_card_issued_date',
      render: (datee) => moment(datee).format('DD/MM/YYYY'),
    },
    {
      title: 'Nơi cấp',
      dataIndex: 'issued_by',
      key: 'issued_by',
    },
    {
      title: 'Giới tính',
      dataIndex: 'gender',
      render: (gender) => <span>{gender ? 'Nam' : 'Nữ'}</span>,
      key: 'gender',
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <fetcher.Form method="post">
            <Button
              onClick={(e) => {
                e.stopPropagation();
              }}
              type="primary"
              htmlType="submit"
              name="id"
              value={record.id}
            >
              Xác minh
            </Button>
            <input type="hidden" name="type" value="approve" />
          </fetcher.Form>
          <fetcher.Form method="post">
            <Button
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                Modal.confirm({
                  title: 'Từ chối yêu cầu xác minh',
                  content: React.createElement(
                    'div',
                    null,
                    React.createElement(Input, {
                      placeholder: 'Lý do từ chối',
                      onChange: (e) => {
                        reason = e.target.value;
                      },
                    }),
                  ),
                  okButtonProps: {
                    style: {
                      backgroundColor: '#026D4D',
                      borderColor: '#026D4D',
                      color: 'white',
                    },
                  },
                  onOk: async () => {
                    console.log('reject request');
                    console.log(reason);
                    const result = await ApiService.patch({
                      url: `account-verification-requests/${record.id}`,
                      data: {
                        is_verified: false,
                        rejected_info: reason,
                      },
                    });
                    console.log('rejected results', result);
                    if (result.status == 'success') {
                      notification.open({
                        message: 'Thành công',
                        description: 'Từ chối thành công',
                        type: 'success',
                        placement: 'top',
                      });
                      navigate('/pending_user');
                    } else {
                      notification.open({
                        message: 'Thất bại',
                        description:
                          'Đã có lỗi trong quá trình từ chối, xin thử lại',
                        type: 'error',
                        placement: 'top',
                      });
                    }
                  },
                  onCancel: () => {
                    console.log('reject cancelled');
                  },
                });
              }}
              type="primary"
              danger
              htmlType="submit"
              name="id"
              value={record.id}
            >
              Từ chối
            </Button>
            {/* <input type="hidden" name="type" value="reject" /> */}
          </fetcher.Form>
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
              DS Người dùng chờ xác minh
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
        <PostTable
          columns={columns}
          data={users}
          abc="DS Người dùng chờ xác minh"
        />
        ,
      </Card>
    </div>
  );
}

export default PendingUser;
