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
    "reports?status[eq]='rejected'&page=all&type[eq]='user'",
  );
  const rptPost = await ApiService.get(
    "reports?status[eq]='rejected'&page=all&type[eq]='post'",
  );

  return { rptUser, rptPost };
}

function RejectedReporting(props) {
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
    // {
    //   title: "Giá",
    //   dataIndex: "price",
    //   sorter: (a, b) => a.price - b.price,
    //   key: "price",
    // },
    // {
    //   title: "Diện tích",
    //   dataIndex: "area",
    //   sorter: (a, b) => a.area - b.area,
    //   key: "area",
    // },
    {
      title: 'Ngày tạo',
      dataIndex: 'created_date',
      key: 'created_date',
      render: (datee) => moment(datee).format('hh:mm DD/MM/YYYY'),
    },
    // {
    //   title: 'Loại bất động sản',
    //   dataIndex: 'type_id',
    //   key: 'type_id',
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
    // {
    //   title: "Giá",
    //   dataIndex: "price",
    //   sorter: (a, b) => a.price - b.price,
    //   key: "price",
    // },
    // {
    //   title: "Diện tích",
    //   dataIndex: "area",
    //   sorter: (a, b) => a.area - b.area,
    //   key: "area",
    // },
    {
      title: 'Ngày tạo',
      dataIndex: 'created_date',
      key: 'created_date',
      render: (datee) => moment(datee).format('hh:mm DD/MM/YYYY'),
    },
    // {
    //   title: 'Loại bất động sản',
    //   dataIndex: 'type_id',
    //   key: 'type_id',
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
    // {
    //   key: '3',
    //   label: 'Cuộc trò chuyện',
    //   children: <PostTable columns={columns} data={rpt3}/>,
    // },
    // {
    //   key: '4',
    //   label: 'Bình luận',
    //   children: <PostTable columns={columns} data={rpt4}/>,
    // },
  ];
  return (
    <div>
      <Card>
        <Breadcrumbs></Breadcrumbs>
        <Row style={{ marginBottom: '16px' }}>
          <Col>
            <Title level={3} style={{ margin: 0, padding: 0 }}>
              DS Tố cáo đã duyệt
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

export default RejectedReporting;
