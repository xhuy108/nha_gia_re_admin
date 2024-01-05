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
  Space,
} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useNavigate, Form as DomForm } from 'react-router-dom';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
import Column from 'antd/es/table/Column';
import { useRef } from 'react';
import ApiService from '../../../service/ApiService';

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
          <Button type="primary" size="middle" onClick={showModal2}>
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

        {/* form detail */}
        <Modal
          title={item.name}
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={(_, { OkBtn, CancelBtn }) => (
            <>
              <Button onClick={handleCancel}>Đóng</Button>
            </>
          )}
        >
          {/* Form */}
          <DomForm
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
          </DomForm>
        </Modal>

        {/* <Modal
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
        </Modal> */}

        {/* create new */}
        <Modal title="Tạo gói dịch vụ mới" open={isModalOpen2} footer={null}>
          <DomForm method="post" id="contact-form">
            <input type="hidden" name="type" value="create" />
            <p>
              <span>Nhập tên</span>
              <Input name="name" />
            </p>
            <p>
              <span>Mô tả đầu tư</span>
              <TextArea name="description" rows={4} />
            </p>
            <p>
              <span>Giá/tháng</span>
              <Input name="pricePerMonth" />
            </p>
            <p>
              <span>Số lượng bài đăng/tháng</span>
              <Input name="postPerMonth" />
            </p>
            <p>
              <span>Điểm ưu tiên hiện bài</span>
              <Input name="displayPriorityPoint" />
            </p>
            <p>
              <span>Điểm ưu tiên duyệt bài</span>
              <Input name="postApprovalPriorityPoint" />
            </p>
            <Flex justify="flex-end">
              <Space>
                <Button onClick={handleCancel2}>Đóng</Button>
                <Button
                  type="primary"
                  htmlType="submit"
                  onClick={() => {
                    console.log('click');
                  }}
                >
                  Lưu
                </Button>
                {/* <button type="submit">submit</button> */}
              </Space>
            </Flex>
          </DomForm>
        </Modal>
      </Row>
    </div>
  );
}

export default PostTable;
