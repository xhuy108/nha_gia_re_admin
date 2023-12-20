import React, { useState } from "react";
import { Row, Table, Modal, Form, Input, Button, Col, Flex, Typography } from 'antd';

import { useNavigate } from "react-router-dom";
import { CloseOutlined, DeleteOutlined, ExclamationCircleFilled } from '@ant-design/icons';
import Column from "antd/es/table/Column";

const { confirm } = Modal;
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
          <Title level={4}>DS Tố cáo {props.abc} đã duyệt</Title>
          <Flex gap = "small">
            <Button type="primary" size="middle" danger={true} icon={<DeleteOutlined/>} onClick={showDeleteConfirm} >
              Xóa
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

          <Modal title={item.name} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
            footer={(_, { OkBtn, CancelBtn }) => (
              <>
                <Button type="primary" icon={<DeleteOutlined/>} danger onClick={showDeleteConfirm}>Xóa</Button>
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
            <Form.Item label="Người đăng" >
              <Input value={item.author} />
            </Form.Item>
            <Form.Item label="Ngày đăng">
              <Input value={item.uploadDate}/>
            </Form.Item>

            <Form.Item label="Địa chỉ">
              <Input value="213 Lý Thường Kiệt, phường 5, quận 1"/>
            </Form.Item>
            
            <Form.Item label="Giá">
              <Input value={item.price}/>
            </Form.Item>

            <Form.Item label="Diện tích">
              <Input value={item.area}/>
            </Form.Item>

            <Form.Item label="Loại BĐS">
              <Input value={item.propertyType}/>
            </Form.Item>

            <Form.Item label="Số phòng ngủ">
              <Input value="3"/>
            </Form.Item>

            <Form.Item label="Tổng số tầng">
              <Input value="5"/>
            </Form.Item>

            <Form.Item label="Giấy tờ pháp lý">
              <Input value="Đã có sổ hồng"/>
            </Form.Item>

            <Form.Item label="Loại hình nhà ở">
              <Input value="Căn hộ/Chung cư"/>
            </Form.Item>

            <Form.Item label="Mô tả">
              <Input value={item.description}/>
            </Form.Item>

            <Form.Item label="Hình ảnh">
              <Input value="hellojun.png"></Input>
            </Form.Item>
          </Form>
        </Modal>

        </Row>
      </div>
      
    );
}

export default PostTable;