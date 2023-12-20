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
  const rpt = await ApiService.get(
    "reports?page=1&type[eq]='post'&status[eq]='pending'",
  );
  console.log('HAAA pending', rpt);
  if (!rpt) {
    throw new Response('', {
      status: 404,
      statusText: 'Not Found',
    });
  }
  const rpt1 = rpt.filter((post) => post.type == 'post');
  const rpt2 = rpt.filter((post) => post.type == 'user');
  const rpt3 = rpt.filter((post) => post.type == 'chat');
  const rpt4 = rpt.filter((post) => post.type == 'comment');
  return { rpt1, rpt2, rpt3, rpt4 };
}

function PendingPost(props) {
  const navigate = useNavigate();
  const { Title } = Typography;
  const { rpt1, rpt2, rpt3, rpt4 } = useLoaderData();
  const fetcher = useFetcher();

  const columns = [
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
    //   title: "Loại bất động sản",
    //   dataIndex: "type_id",
    //   key: "type_id",
    // },
    // {
    //   title: 'Hành động',
    //   key: 'action',
    //   render: (_, record) => (
    //     <Space size="middle">
    //       <fetcher.Form method="post">
    //         <Button
    //           onClick={(e) => {
    //             e.stopPropagation();
    //           }}
    //           type="primary"
    //           htmlType="submit"
    //           name="id"
    //           value={record.id}
    //         >
    //           Duyệt
    //         </Button>
    //         <input type="hidden" name="type" value="approve" />
    //       </fetcher.Form>
    //       <fetcher.Form method="post">
    //         <Button
    //           onClick={(e) => {
    //             e.stopPropagation();
    //           }}
    //           type="primary"
    //           danger
    //           htmlType="submit"
    //           name="id"
    //           value={record.id}
    //         >
    //           Từ chối
    //         </Button>
    //         <input type="hidden" name="type" value="reject" />
    //       </fetcher.Form>
    //     </Space>
    //   ),
    // },
  ];
  const tabs = [
    {
      key: '1',
      label: 'Bài đăng',
      children: <PostTable columns={columns} data={rpt1} />,
    },
    {
      key: '2',
      label: 'Người dùng',
      children: <PostTable columns={columns} data={rpt2} />,
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
