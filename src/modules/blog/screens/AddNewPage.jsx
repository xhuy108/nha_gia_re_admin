import React, { useState } from 'react';
import {
  Tabs,
  Card,
  Row,
  Col,
  Typography,
  Button,
  Select,
  Flex,
  Table,
  Modal,
  Input,
  Space,
} from 'antd';
import { Form } from 'react-router-dom';
const { TextArea } = Input;
const { Title } = Typography;
import Breadcrumbs from '../../../globalComponents/BreadCrumb/BreadCrumb';
import HtmlContent from '../components/HtmlContent';
import Preview from '../components/Preview';
function AddNewPage() {
  const [html, setHtml] = useState('');
  const [title, setTitle] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenDialog = () => {
    setIsModalOpen(true);
  };
  const handleCloseDialog = () => {
    setIsModalOpen(false);
  };

  const titleStyle = {
    textAlign: 'center',
  };
  return (
    <div>
      <Card>
        <Breadcrumbs />
        <Title level={3} style={titleStyle}>
          Tạo bài Blog
        </Title>
        <Form method="post" id="contact-form">
          <input type="hidden" name="type" value="create" />
          <p>
            <span>Tiêu đề</span>
            <Input
              name="title"
              placeholder="Nhập tiêu đề"
              onBlur={(e) => {
                setTitle(e.target.value);
              }}
            />
          </p>
          <p>
            <span>Mô tả ngắn</span>
            <TextArea name="description" rows={4} placeholder="Nhập mô tả" />
          </p>
          <p>
            <span>Tác giả</span>
            <Input name="author" placeholder="Nhập tên tác giả" />
          </p>
          <p>
            <span>Thumbnail</span>
            <Input name="thumbnail" placeholder="Nhập link ảnh thumbnail" />
          </p>
          <p>
            <span>Nội dung</span>
            <TextArea
              rows={10}
              name="content"
              onBlur={(e) => {
                setHtml(e.target.value);
              }}
              placeholder="Thêm nội dung bài đăng ở đây"
            />
          </p>
          <Flex justify="flex-end">
            <Space>
              <Button type="primary" danger>
                Hủy
              </Button>
              <Button type="primary" onClick={handleOpenDialog}>
                Xem trước
              </Button>
              <Button type="primary" htmlType="submit">
                Lưu
              </Button>
            </Space>
          </Flex>
        </Form>
      </Card>

      <Modal
        title=""
        closeIcon={null}
        open={isModalOpen}
        width={1000}
        footer={[
          <Button key={"close-btn"} type="primary" onClick={handleCloseDialog}>
            OK
          </Button>,
        ]}
      >
        <Preview html={html} title={title} />
      </Modal>
    </div>
  );
}

export default AddNewPage;
