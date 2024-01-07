import React, { useState } from 'react';
import {
  Row,
  Table,
  Modal,
  Form,
  Input,
  Button,
  Col,
  Flex,
  Typography,
  Avatar,
  Image,
} from 'antd';
import moment from 'moment';

import { useNavigate } from 'react-router-dom';
import {
  CloseOutlined,
  DeleteOutlined,
  ExclamationCircleFilled,
  LockOutlined,
  UserOutlined,
} from '@ant-design/icons';
import Column from 'antd/es/table/Column';

const { confirm } = Modal;
// rowSelection object indicates the need for row selection
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      'selectedRows: ',
      selectedRows,
    );
  },
};

function PostTable(props) {
  const { Title } = Typography;
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [item, setItem] = useState({});

  const showModal = (props) => {
    setIsModalOpen(true);
    setItem(props);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const showDeleteConfirm = () => {
    confirm({
      title: 'Bạn thật sự muốn xóa bài đăng này?',
      icon: <ExclamationCircleFilled />,
      content: 'Bài đăng sẽ biến mất trên app của người dùng nếu bạn xoá nó.',
      okText: 'Có',
      okType: 'danger',
      cancelText: 'Không',
      onOk() {
        console.log('OK');
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  return (
    <div>
      <Flex gap="middle" justify="space-between" align="center">
        <Title level={4}>{props.abc}</Title>
      </Flex>
      <Row style={{ display: 'flex' }}>
        <Table
          style={{ width: '100%' }}
          rowClassName="custom-row"
          dataSource={props.data}
          columns={props.columns}
          onRow={(record) => ({
            onClick: () => {
              showModal(record);
            },
          })}
        />

        {/* POP-UP */}
        {/* <Modal title={item.name} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}> */}

        <Modal
          title={item.first_name + ' ' + item.last_name}
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={(_, { OkBtn, CancelBtn }) => (
            <>
              <Button type="primary" onClick={showDeleteConfirm}>
                OK
              </Button>
            </>
          )}
        >
          {/* Form */}
          {props.abc == 'DS Người dùng' ? (
            <Form
              style={{ marginTop: '24px' }}
              name="basic"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 16 }}
              initialValues={{ remember: true }}
              autoComplete="off"
            >
              <Form.Item label="Họ tên">
                <Input
                  style={{ cursor: 'default' }}
                  readOnly={true}
                  value={item.first_name + ' ' + item.last_name}
                />
              </Form.Item>

              <Form.Item label="Email">
                <Input
                  style={{ cursor: 'default' }}
                  readOnly={true}
                  value={item.email}
                />
              </Form.Item>

              <Form.Item label="Avatar">
                {item.avatar ? (
                  <Avatar src={item.avatar} />
                ) : (
                  <Avatar icon={<UserOutlined />} />
                )}
              </Form.Item>

              <Form.Item label="Địa chỉ">
                <Input
                  style={{ cursor: 'default' }}
                  readOnly={true}
                  value="213 Lý Thường Kiệt, phường 5, quận 1"
                />
              </Form.Item>

              <Form.Item label="Ngày sinh">
                <Input
                  style={{ cursor: 'default' }}
                  readOnly={true}
                  value={moment(item.dob).format('DD/MM/YYYY')}
                />
              </Form.Item>

              <Form.Item label="Giới tính">
                <Input
                  style={{ cursor: 'default' }}
                  readOnly={true}
                  value={item.gender ? 'Nam' : 'Nữ'}
                />
              </Form.Item>

              <Form.Item label="Số điện thoại">
                <Input
                  style={{ cursor: 'default' }}
                  readOnly={true}
                  value={item.phone}
                />
              </Form.Item>

              <Form.Item label="Vai trò">
                <Input
                  style={{ cursor: 'default' }}
                  readOnly={true}
                  value={item.role}
                />
              </Form.Item>

              <Form.Item label="Trạng thái">
                <Input
                  style={{ cursor: 'default' }}
                  readOnly={true}
                  value={item.status}
                />
              </Form.Item>
            </Form>
          ) : (
            <Form
              style={{ marginTop: '24px' }}
              name="basic"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 16 }}
              initialValues={{ remember: true }}
              autoComplete="off"
            >
              <Form.Item label="Họ tên">
                <Input
                  style={{ cursor: 'default' }}
                  readOnly={true}
                  value={item.full_name}
                />
              </Form.Item>

              <Form.Item label="Ngày sinh">
                <Input
                  style={{ cursor: 'default' }}
                  readOnly={true}
                  value={moment(item.dob).format('DD/MM/YYYY')}
                />
              </Form.Item>

              <Form.Item label="Số CCCD/CMND">
                <Input
                  style={{ cursor: 'default' }}
                  readOnly={true}
                  value={item.identity_card_no}
                />
              </Form.Item>

              <Form.Item label="Ngày cấp">
                <Input
                  style={{ cursor: 'default' }}
                  readOnly={true}
                  value={moment(item.identity_card_issued_date).format(
                    'DD/MM/YYYY',
                  )}
                />
              </Form.Item>

              <Form.Item label="Nơi cấp">
                <Input
                  style={{ cursor: 'default' }}
                  readOnly={true}
                  value={item.issued_by}
                />
              </Form.Item>

              <Form.Item label="Địa chỉ">
                <Input
                  style={{ cursor: 'default' }}
                  readOnly={true}
                  value="213 Lý Thường Kiệt, phường 5, quận 1"
                />
              </Form.Item>

              <Form.Item label="Giới tính">
                <Input
                  style={{ cursor: 'default' }}
                  readOnly={true}
                  value={item.gender ? 'Nam' : 'Nữ'}
                />
              </Form.Item>

              <Form.Item label="Ảnh CCCD/CMND">
                <Flex>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <div>Mặt trước</div>
                    <Image
                      height={50}
                      width={100}
                      src={item.front_identity_card_image_link}
                    />
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <div>Mặt sau</div>
                    <Image
                      height={50}
                      width={100}
                      src={item.fback_identity_card_image_link}
                    />
                  </div>
                </Flex>
              </Form.Item>

              <Form.Item label="Ảnh chân dung">
                <Flex>
                  <Image
                    height={100}
                    width={75}
                    src={item.portrait_image_link}
                  />
                </Flex>
              </Form.Item>
            </Form>
          )}
        </Modal>
      </Row>
    </div>
  );
}

export default PostTable;
