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
import PostTable from '../components/Table';
import ApiService from '../../../service/ApiService';
import moment from 'moment';
import Breadcrumbs from '../../../globalComponents/BreadCrumb/BreadCrumb';

//function loader to call API
export async function loader() {
  const rptUser = await ApiService.get(
    "reports?status[eq]='pending'&page=all&type[eq]='user'",
  );
  const rptPost = await ApiService.get(
    "reports?status[eq]='pending'&page=all&type[eq]='post'",
  );

  return { rptUser, rptPost };
}

function PendingPost(props) {
  const navigate = useNavigate();
  const { Title } = Typography;
  const { rptUser, rptPost } = useLoaderData();
  const fetcher = useFetcher();

  const columnsPost = [
    {
      title: 'Loại',
      dataIndex: 'content_type',
      key: 'content_type',
    },
    {
      title: 'Người tố cáo',
      dataIndex: 'reporter',
      key: 'reporter',
      render: (user) => user.first_name + ' ' + user.last_name,
    },
    {
      title: 'Lý do',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Tên bài đăng bị tố cáo',
      dataIndex: 'reported',
      key: 'reported',
      render: (user) => user.title,
    },

    {
      title: 'Ngày tạo',
      dataIndex: 'created_date',
      key: 'created_date',
      render: (datee) => moment(datee).format('hh:mm DD/MM/YYYY'),
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
              Duyệt
            </Button>
            <input type="hidden" name="type" value="approve" />
          </fetcher.Form>
          <fetcher.Form method="post">
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
              Từ chối
            </Button>
            <input type="hidden" name="type" value="reject" />
          </fetcher.Form>
        </Space>
      ),
    },
  ];

  const columnsUser = [
    {
      title: 'Loại',
      dataIndex: 'content_type',
      key: 'content_type',
    },
    {
      title: 'Người tố cáo',
      dataIndex: 'reporter',
      key: 'reporter',
      render: (user) => user.first_name + ' ' + user.last_name,
    },
    {
      title: 'Lý do',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Tên người bị tố cáo',
      dataIndex: 'reported',
      key: 'reported',
      render: (user) => user.first_name + ' ' + user.last_name,
    },

    {
      title: 'Ngày tạo',
      dataIndex: 'created_date',
      key: 'created_date',
      render: (datee) => moment(datee).format('hh:mm DD/MM/YYYY'),
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
              Duyệt
            </Button>
            <input type="hidden" name="type" value="approve" />
          </fetcher.Form>
          <fetcher.Form method="post">
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
              Từ chối
            </Button>
            <input type="hidden" name="type" value="reject" />
          </fetcher.Form>
        </Space>
      ),
    },
  ];

  const tabs = [
    {
      key: '1',
      label: 'Bài đăng',
      children: <PostTable columns={columnsPost} data={rptPost} />,
    },
    {
      key: '2',
      label: 'Người dùng',
      children: <PostTable columns={columnsUser} data={rptUser} />,
    },
  ];
  return (
    <div>
      <Card>
        <Breadcrumbs></Breadcrumbs>
        <Row style={{ marginBottom: '16px' }}>
          <Col>
            <Title level={3} style={{ margin: 0, padding: 0 }}>
              DS Tố cáo chờ duyệt
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

export default PendingPost;
