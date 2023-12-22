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
  Select,
  InputNumber,
} from 'antd';

import { useNavigate } from 'react-router-dom';
import {
  CloseOutlined,
  CheckOutlined,
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  SaveOutlined,
} from '@ant-design/icons';
import Column from 'antd/es/table/Column';
import { useRef } from 'react';
import ApiService from '../../../service/ApiService';

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
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [item, setItem] = useState({});

  const name = useRef('');
  const discription = useRef('');
  const price_per_month = useRef(0);
  const monthly_post_limit = useRef(0);
  const display_priority_point = useRef(0);
  const post_approval_priority_point = useRef(0);

  const showModal = (props) => {
    setIsModalOpen(true);
    setItem(props);
  };

  const showModal2 = (props) => {
    setIsModalOpen2(true);
  };

  const showModal1 = (props) => {
    handleCancel();
    setIsModalOpen1(true);
  };

  const handleOk1 = () => {
    setIsModalOpen1(false);
  };

  const handleCancel1 = () => {
    setIsModalOpen1(false);
  };

  const submitForm = async () => {
    const newPkg = {
      name: name.current.input.value,
      price_per_month: price_per_month.current.input.value,
      description: discription.current.input.value,
      monthly_post_limit: monthly_post_limit.current.input.value,
      display_priority_point: display_priority_point.current.input.value,
      post_approval_priority_point:
        post_approval_priority_point.current.input.value,
    };
    console.log('newPkg: ', newPkg);

    try {
      console.log('add new package request');
      const result = await ApiService.post({
        url: `membership-packages`,
        data: newPkg,
      });
      console.log('add new package results', result);
      if (result.status == 'success') {
        alert('add new package success');
        handleCancel2();
      } else {
        alert('error');
      }
      return null;
    } catch (e) {
      console.log(e);
      alert(e);
      return null;
    }
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleOk2 = () => {
    setIsModalOpen2(false);
  };

  const handleCancel2 = () => {
    console.log('here');
    form.resetFields();
    setIsModalOpen2(false);
  };

  return (
    <div>
      <Flex gap="middle" justify="space-between" align="center">
        <Flex gap="small">
          <Title level={4}>DS Gói dịch vụ</Title>
        </Flex>
        <Flex gap="small">
          <Button
            type="primary"
            size="middle"
            icon={<PlusOutlined />}
            style={{
              backgroundColor: '#1890FF',
              marginLeft: '12px',
              marginTop: '16px',
            }}
            onClick={showModal2}
          >
            Thêm
          </Button>
        </Flex>
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
          title={item.name}
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={(_, { OkBtn, CancelBtn }) => (
            <>
              <Button icon={<CheckOutlined />} type="primary">
                Duyệt
              </Button>
              <Button
                type="primary"
                icon={<CloseOutlined />}
                danger
                onClick={showModal1}
              >
                Từ chối
              </Button>
            </>
          )}
        >
          {/* Form */}
          <Form
            style={{ marginTop: '24px' }}
            name="basic"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            autoComplete="off"
          >
            <Form.Item label="Tên">
              <Input value={item.name} />
            </Form.Item>

            <Form.Item label="Mô tả">
              <Input value={item.description} />
            </Form.Item>

            <Form.Item label="Giá/tháng">
              <Input value={item.price_per_month} />
            </Form.Item>

            <Form.Item label="Số lượng bài đăng/tháng">
              <Input value={item.monthly_post_limit} />
            </Form.Item>

            <Form.Item label="Ưu tiên hiện bài">
              <Input value={item.display_priority_point} />
            </Form.Item>

            <Form.Item label="Ưu tiên duyệt bài">
              <Input value={item.post_approval_priority_point} />
            </Form.Item>

            <Form.Item label="Trạng thái">
              <Input value={item.description} />
            </Form.Item>
          </Form>
        </Modal>

        <Modal
          title="Vui lòng nhập lý do từ chối bài đăng này"
          open={isModalOpen1}
          onOk={handleOk1}
          onCancel={handleCancel1}
          footer={(_, { OkBtn1, CancelBtn1 }) => (
            <>
              <Button type="primary" icon={<CloseOutlined />} danger>
                Từ chối
              </Button>
            </>
          )}
        >
          <Form
            style={{ marginTop: '24px' }}
            name="basic"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            autoComplete="off"
          >
            <Form.Item label="Lý do từ chối">
              <Input placeholder="Nhập lý do từ chối..." />
            </Form.Item>
          </Form>
        </Modal>

        <Modal
          title="Thêm mới Gói dịch vụ"
          open={isModalOpen2}
          onOk={handleOk2}
          onCancel={handleCancel2}
          footer={(_, { OkBtn2, CancelBtn2 }) => (
            <>
              <Button
                type="primary"
                style={{ backgroundColor: '#1890FF' }}
                onClick={submitForm}
              >
                Lưu
              </Button>
            </>
          )}
        >
          <Form
            style={{ marginTop: '24px' }}
            name="basic"
            labelCol={{ span: 9 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            autoComplete="off"
            form={form}
          >
            <Form.Item label="Tên">
              <Input placeholder="Nhập tên..." ref={name} />
            </Form.Item>

            <Form.Item label="Mô tả">
              <Input placeholder="Nhập mô tả..." ref={discription} />
            </Form.Item>

            <Form.Item label="Giá/tháng">
              <Input placeholder="Nhập giá/tháng" ref={price_per_month} />
            </Form.Item>

            <Form.Item label="Số lượng bài đăng/tháng">
              <Input
                placeholder="Nhập số lượng bài đăng/tháng"
                ref={monthly_post_limit}
              />
            </Form.Item>

            <Form.Item label="Ưu tiên hiện bài">
              <Input
                placeholder="Nhập điểm ưu tiên hiện bài"
                ref={display_priority_point}
              />
            </Form.Item>

            <Form.Item label="Ưu tiên duyệt bài">
              <Input
                placeholder="Nhập điểm ưu tiên duyệt bài"
                ref={post_approval_priority_point}
              />
            </Form.Item>
          </Form>
        </Modal>
      </Row>
    </div>
  );
}

export default PostTable;
