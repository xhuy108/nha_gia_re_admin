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
  Modal,
  notification,
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
import { action } from '../action';

// import { rejectPost } from '../action';

//function loader to call API
export async function loader() {
  const posts = await ApiService.get(
    "posts?post_status[eq]='pending'&post_is_active[eq]=true&page=all",
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

function PendingPost(props) {
  // const [reason, setReason] = useState('');
  const navigate = useNavigate();
  const { Title } = Typography;
  let { postLease, postNoLease } = useLoaderData();
  const fetcher = useFetcher();
  const [query, setQuery] = useState('');

  postLease = postLease.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase()),
  );
  postNoLease = postNoLease.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase()),
  );

  const handleSearch = (value) => {
    // Handle the search logic here
    console.log('Search value:', value);
    setQuery(value);
  };

  // function openRejectModal() {
  //   Modal.confirm({
  //     title: 'Do you want to reject this post?',
  //     content: <Input placeholder="Enter reason for rejection" />,
  //     // other modal properties...
  //   });
  // }

  // function handleReject() {
  //   // Get the value of the hidden input field
  //   const type = document.querySelector('input[name="type"]').value;

  //   if (type === 'reject') {
  //     rejectPost(openRejectModal);
  //   }
  // }
  const [modalVisible, setModalVisible] = useState(false);
  const [postLeaseState, setPostLeaseState] = useState(postLease);
  const [postNoLeaseState, setPostNoLeaseState] = useState(postNoLease);

  let reason = '';

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
          <fetcher.Form method="post">
            <Button
              onClick={async (e) => {
                e.stopPropagation();
                e.preventDefault();
                try {
                  console.log('approve request');
                  const result = await ApiService.post({
                    url: `posts/approve?id=${record.id}`,
                    data: {},
                  });
                  if (result.status == 'success') {
                    notification.open({
                      message: 'Thành công',
                      description: 'Bài đăng của bạn đã được duyệt thành công',
                      type: 'success',
                      placement: 'top',
                    });
                    setPostLeaseState(
                      postLeaseState.filter((post) => post.id !== record.id),
                    );
                    setPostNoLeaseState(
                      postNoLeaseState.filter((post) => post.id !== record.id),
                    );
                    // alert('Duyệt thành công');
                  } else {
                    notification.open({
                      message: 'Thất bại',
                      description:
                        'Đã có lỗi trong quá trình duyệt, xin thử lại',
                      type: 'error',
                      placement: 'top',
                    });
                  }
                  return null;
                } catch (e) {
                  console.log(e);
                  notification.open({
                    message: 'Thất bại',
                    description: 'Đã có lỗi xảy ra, xin thử lại',
                    type: 'error',
                    placement: 'top',
                  });
                  // approvePost(record.id);
                  // handleReject();
                }
              }}
              type="primary"
              htmlType="submit"
              name="id"
              value={record.id}
            >
              Duyệt
            </Button>
            {/* <input type="hidden" name="type" value="approve" /> */}
          </fetcher.Form>
          <fetcher.Form method="post">
            <Button
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                Modal.confirm({
                  title: 'Bạn có chắc chắn muốn từ chối bài đăng này?',
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
                    const result = await ApiService.post({
                      url: `posts/reject?id=${record.id}`,
                      data: {
                        reason: reason,
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
                      setPostLeaseState(
                        postLeaseState.filter((post) => post.id !== record.id),
                      );
                      setPostNoLeaseState(
                        postNoLeaseState.filter(
                          (post) => post.id !== record.id,
                        ),
                      );
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

                // openModal(record);
                // setModalVisible(true); // Prevent the form from being submitted
                // console.log(record.id);
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
  const tabs = [
    {
      key: '1',
      label: 'Cho thuê',
      children: <PostTable columns={columns} data={postLeaseState} />,
    },
    {
      key: '2',
      label: 'Cần bán',
      children: <PostTable columns={columns} data={postNoLeaseState} />,
    },
  ];
  return (
    <div>
      <Card>
        <Breadcrumbs></Breadcrumbs>
        <Row style={{ marginBottom: '16px' }}>
          <Col>
            <Title level={3} style={{ margin: 0, padding: 0 }}>
              DS Bài đăng chờ duyệt
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

        <Tabs defaultActiveKey="1" items={tabs} />
      </Card>
    </div>
  );
}

export default PendingPost;
