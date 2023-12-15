import React from 'react'
import { LikeOutlined, MessageOutlined, StarOutlined, PlusOutlined, EditOutlined, DeleteOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Avatar, List, Space } from 'antd';
import {Tabs, Card, Row, Col, Typography, Button, Select, Flex, Table, Modal, Form, Input} from 'antd';
import Search from 'antd/es/input/Search';
import Breadcrumbs from '../../../globalComponents/BreadCrumb/BreadCrumb';
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tag } from 'antd';
import Title from 'antd/es/typography/Title';

export default function Blog() {
  const data = Array.from({ length: 23 }).map((_, i) => ({
    href: 'https://ant.design',
    title: `ant design part ${i}`,
    avatar: `https://xsgames.co/randomusers/avatar.php?g=pixel&key=${i}`,
    description:
      'Ant Design, a design language for background applications, is refined by Ant UED Team.',
    content:
      'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
  }));
  
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
  
  const IconText = ({ icon, text }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );
  return (
    <div>
      <Card>
        <Breadcrumbs/>
        <Row style={{marginBottom:"16px"}}>
          <Col>
          <Title level={3} style={{ margin: 0, padding: 0 }}>
             Blog
            </Title>
          </Col>
        </Row>
        <Row style={{marginBottom:"12px"}}>
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
        <Flex gap="middle" justify="space-between" align="center">
        <Flex gap = "small">
          <Title level={4}>DS Blog</Title>
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
        <List
    itemLayout="vertical"
    size="large"
    pagination={{
      onChange: (page) => {
        console.log(page);
      },
      pageSize: 3,
    }}
    dataSource={data}

    // khi onclick co the navigate sang trang khac
    renderItem={(item) => (
      <List.Item
        onClick={showModal}
        key={item.title}
        actions={[
          <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
          <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
          <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
        ]}
        extra={
          <img
            width={272}
            alt="logo"
            src="https://media.istockphoto.com/id/511061090/photo/business-office-building-in-london-england.jpg?s=612x612&w=0&k=20&c=nYAn4JKoCqO1hMTjZiND1PAIWoABuy1BwH1MhaEoG6w="
          />
        }
      >
        <List.Item.Meta
          avatar={<Avatar src={item.avatar} />}
          title={<a href={item.href}>{item.title}</a>}
          description={item.description}
        />
        {item.content}
      </List.Item>
    )}
  />
        
      </Card>
      

<Modal title={item.name} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
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

    </div>
  );
}