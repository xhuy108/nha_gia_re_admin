import React, { useState } from "react";
import { Row, Table, Modal, Form, Input, Button, Col, Flex, Typography, Avatar } from 'antd';

import { useNavigate } from "react-router-dom";
import { CloseOutlined, CheckOutlined, UserOutlined } from '@ant-design/icons';
import Column from "antd/es/table/Column";
// rowSelection object indicates the need for row selection
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  }
};

function PostTable(props) {
    const { Title } = Typography;
    const navigate = useNavigate();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [isModalOpen1, setIsModalOpen1] = useState(false);

    const [item, setItem] = useState({});

    const showModal = (props) => {
      setIsModalOpen(true);
      setItem(props);
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

    const handleOk = () => {
      setIsModalOpen(false);
    };

    const handleCancel = () => {
      setIsModalOpen(false);
    };
    
    return (
      <div>
        <Flex gap="middle" justify="space-between" align="center">
          <Title level={4}>DS Người dùng chờ xác minh</Title>
          <Flex gap = "small">
            <Button type="primary" size="middle" icon={<CheckOutlined/>} >
              Duyệt
            </Button>
            <Button type="primary" size="middle" danger={true} icon={<CloseOutlined/>} onClick={showModal1}>
              Từ chối
            </Button>
          </Flex>
        </Flex>
        <Row style={{ display: "flex" }}>
          <Table rowSelection
            style={{ width: "100%" }}
            rowClassName="custom-row"
            dataSource={props.data}
            columns={props.columns}
            onRow={(record) => ({
              onClick: () => {
                showModal(record)
              },
            })}
          />

          {/* POP-UP */}
          {/* <Modal title={item.name} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}> */}

          <Modal title={item.first_name + " "+ item.last_name} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
            footer={(_, { OkBtn, CancelBtn }) => (
              <>
                <Button icon={<CheckOutlined/>} type="primary">Duyệt</Button>
                <Button type="primary" icon={<CloseOutlined/>} danger onClick={showModal1}>Từ chối</Button>
              </>
          )}>

            {/* Form */}
          <Form
          style={{marginTop:"24px"}}
          name="basic"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          autoComplete="off"
          >
            <Form.Item label="Họ tên" >
              <Input value={item.first_name + " "+ item.last_name} />
            </Form.Item>

            <Form.Item label="Email">
              <Input value={item.email}/>
            </Form.Item>

            <Form.Item label="Avatar">
              {item.avatar ? <Avatar src={item.avatar} />
              : <Avatar icon={<UserOutlined />} />}
            </Form.Item>

            <Form.Item label="Địa chỉ">
              <Input value="213 Lý Thường Kiệt, phường 5, quận 1"/>
            </Form.Item>
            
            <Form.Item label="Ngày sinh">
              <Input value={item.dob}/>
            </Form.Item>


            <Form.Item label="Giới tính">
              <Input value={item.gender ? "Nam" : "Nữ"}/>
            </Form.Item>

            <Form.Item label="Số điện thoại">
              <Input value={item.phone}/>
            </Form.Item>

            <Form.Item label="Vai trò">
              <Input value={item.role}/>
            </Form.Item>

            <Form.Item label="Trạng thái">
              <Input value={item.status}/>
            </Form.Item>
          </Form>
        </Modal>

          <Modal title="Vui lòng nhập lý do từ chối bài đăng này" open={isModalOpen1} onOk={handleOk1} onCancel={handleCancel1}
            footer={(_, { OkBtn1, CancelBtn1 }) => (
              <>
                <Button type="primary" icon={<CloseOutlined/>} danger>Từ chối</Button>
              </>
          )}>
          <Form
          style={{marginTop:"24px"}}
          name="basic"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          autoComplete="off"
          >
     
              <Form.Item label="Lý do từ chối">
                <Input placeholder="Nhập lý do từ chối..."/>
              </Form.Item>
        
          </Form>
            </Modal>
        </Row>
      </div>
      
    );
}

export default PostTable;