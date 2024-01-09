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
import { Form, useLoaderData } from 'react-router-dom';
const { TextArea } = Input;
const { Title } = Typography;
import Breadcrumbs from '../../../globalComponents/BreadCrumb/BreadCrumb';
import Preview from '../../../globalComponents/Blog/Preview';
import ApiService from '../../../service/ApiService';
export async function loader({ params }) {
  console.log('params:', params);
  const blog = await ApiService.get(`blogs?id[eq]='${params.id}'`);
  console.log('blogs', blog);
  if (!blog) {
    throw new Response('', {
      status: 404,
      statusText: 'Not Found',
    });
  }
  return { blog: blog[0] };
}
function EditBlog() {
  const [html, setHtml] = useState('');
  const [title, setTitle] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { blog } = useLoaderData();
  console.log('blog', blog);
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
        <Title level={3} style={titleStyle}>
          Chỉnh sửa bài Blog
        </Title>
        <Form method="post" id="contact-form">
          <input type="hidden" name="type" value="edit" />
          <input type="hidden" name="id" value={blog.id} />
          <p>
            <span>Tiêu đề</span>
            <Input
              name="title"
              defaultValue={blog.title}
              onBlur={(e) => {
                setTitle(e.target.value);
              }}
            />
          </p>
          <p>
            <span>Mô tả ngắn</span>
            <TextArea
              name="description"
              defaultValue={blog.short_description}
              rows={4}
            />
          </p>
          <p>
            <span>Tác giả</span>
            <Input name="author" defaultValue={blog.author} />
          </p>
          <p>
            <span>Thumbnail</span>
            <Input name="thumbnail" defaultValue={blog.thumbnail} />
          </p>
          <p>
            <span>Nội dung</span>
            <TextArea
              rows={10}
              name="content"
              onBlur={(e) => {
                setHtml(e.target.value);
              }}
              defaultValue={blog.content}
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
          <Button 
          key={1}
          type="primary" onClick={handleCloseDialog}>
            OK
          </Button>,
        ]}
      >
        <Preview html={html} title={title} />
      </Modal>
    </div>
  );
}

export default EditBlog;
