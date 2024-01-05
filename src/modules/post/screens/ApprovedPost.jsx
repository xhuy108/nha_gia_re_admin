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
  Input,
} from 'antd';
import Search from 'antd/es/input/Search';
import { useState, useRef, useEffect } from 'react';
import {
  useNavigate,
  useLoaderData,
  useFetcher,
  Form,
  redirect,
} from 'react-router-dom';
import PostTable from '../components/TableOfPost';
import ApiService from '../../../service/ApiService';
import Breadcrumbs from '../../../globalComponents/BreadCrumb/BreadCrumb';
import moment from 'moment';

//function loader to call API
export async function loader() {
  const posts = await ApiService.get(
    "posts?post_status[eq]='approved'&post_is_active[eq]=true&page=all",
  );
  console.log('length', posts.length);
  if (!posts) {
    throw new Response('', {
      status: 404,
      statusText: 'Not Found',
    });
  }
  const postLease = posts.filter((post) => post.is_lease === true);
  const postNoLease = posts.filter((post) => post.is_lease === false);
  console.log('lease', postLease);
  console.log('no lease', postNoLease);
  return { postLease, postNoLease };
}

function ApprovedPost(props) {
  const navigate = useNavigate();
  const { Title } = Typography;
  const { postLease, postNoLease } = useLoaderData();
  const fetcher = useFetcher();

  const columns = [
    {
      title: 'Tên',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Người đăng',
      dataIndex: 'user',
      key: 'user',
      render: (user) => user.first_name + ' ' + user.last_name,
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
      render: (description) => {
        if (description.length > 30) {
          return description.substring(0, 30) + '...';
        } else {
          return description;
        }
      },
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      sorter: (a, b) => a.price - b.price,
      key: 'price',
    },
    {
      title: 'Diện tích',
      dataIndex: 'area',
      sorter: (a, b) => a.area - b.area,
      key: 'area',
    },
    {
      title: 'Ngày đăng',
      dataIndex: 'posted_date',
      key: 'posted_date',
      render: (datee) => moment(datee).format('hh:mm DD/MM/YYYY'),
    },
    {
      title: 'Loại bất động sản',
      dataIndex: 'type_id',
      key: 'type_id',
    },
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
  const tabs = [
    {
      key: '1',
      label: 'Cho thuê',
      children: <PostTable columns={columns} data={postLease} />,
    },
    {
      key: '2',
      label: 'Cần bán',
      children: <PostTable columns={columns} data={postNoLease} />,
    },
  ];
  return (
    <div>
      <Card>
        <Breadcrumbs></Breadcrumbs>
        <Row style={{ marginBottom: '16px' }}>
          <Col>
            <Title level={3} style={{ margin: 0, padding: 0 }}>
              DS Bài đăng đã duyệt
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

        <Tabs defaultActiveKey="1" items={tabs} />
      </Card>
    </div>
  );
}

export default ApprovedPost;
