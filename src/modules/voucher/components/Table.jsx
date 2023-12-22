import React, { useState } from "react";
import { Row, Table, Modal, Form, Input, Button, Col, Flex, Typography } from 'antd';

import { useNavigate } from "react-router-dom";
import { CloseOutlined, CheckOutlined, DeleteOutlined, EditOutlined, PlusOutlined, SaveOutlined } from '@ant-design/icons';
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

    const [isModalOpen2, setIsModalOpen2] = useState(false);


    const [item, setItem] = useState({});

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
        setIsModalOpen2(false);
      };
    
    return (
      <div>
        <Flex gap="middle" justify="space-between" align="center">
        <Flex gap = "small">
          <Title level={4}>DS Mã giảm giá</Title>
          <Button type="primary" size="middle" icon={<PlusOutlined/>} style={{backgroundColor:"#1890FF", marginLeft:"12px", marginTop:"16px"}}
          onClick={showModal2}>
              Thêm
            </Button>
          </Flex>
          <Flex gap = "small">
            <Button type="primary" size="middle" icon={<EditOutlined/>} >
              Sửa
            </Button>
            <Button type="primary" size="middle" danger={true} icon={<DeleteOutlined/>} onClick={showModal1}>
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

          <Modal title={item.code} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
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
            <Form.Item label="Mã CODE" >
              <Input value={item.code} />
            </Form.Item>
            <Form.Item label="Số tháng đăng ký">
              <Input value={item.min_subscription_months}/>
            </Form.Item>

            <Form.Item label="Mô tả">
              <Input value={item.description}/>
            </Form.Item>
            
            <Form.Item label="Giảm giá (%)">
              <Input value={item.discount_percent}/>
            </Form.Item>

            <Form.Item label="Số lượng sử dụng">
              <Input value= {item.limited_quantity}/>
            </Form.Item>

            <Form.Item label="Ngày tạo">
              <Input value={item.created_at}/>
            </Form.Item>

            <Form.Item label="Ngày bắt đầu">
              <Input value={item.starting_date}/>
            </Form.Item>

            <Form.Item label="Ngày hết hạn">
              <Input value={item.expiration_date}/>
            </Form.Item>

            <Form.Item label="Trạng thái">
              <Input value={item.is_active ? "Đang kích hoạt" : "Vô hiệu"}/>
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

            <Modal title="Thêm mới Gói dịch vụ" open={isModalOpen2} onOk={handleOk2} onCancel={handleCancel2}
            footer={(_, { OkBtn2, CancelBtn2 }) => (
              <>
                <Button type="primary" icon={<PlusOutlined/>} 
                style={{backgroundColor:"#1890FF"}}>Thêm</Button>
              </>
          )}>
          <Form
          style={{marginTop:"24px"}}
          name="basic"
          labelCol={{ span: 9 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          autoComplete="off"
          >
     
              <Form.Item label="Tên">
                <Input placeholder="Nhập tên..."/>
              </Form.Item>

              <Form.Item label="Mô tả">
                <Input placeholder="Nhập mô tả..."/>
              </Form.Item>

              <Form.Item label="Giá/tháng">
                <Input placeholder="Nhập giá/tháng"/>
              </Form.Item>
        
              <Form.Item label="Số lượng bài đăng/tháng">
                <Input placeholder="Nhập số lượng bài đăng/tháng"/>
              </Form.Item>

              <Form.Item label="Điểm ưu tiên">
                <Input placeholder="Nhập điểm ưu tiên"/>
              </Form.Item>
          </Form>
            </Modal>
        </Row>
      </div>
      
    );
}

export default PostTable;