// HtmlContent.js
import React from 'react';
import DOMPurify from 'dompurify';
import ApiService from '../../../service/ApiService';
import { useNavigate, useLoaderData, useFetcher } from 'react-router-dom';
import { Button, Card, Flex, Space, Typography } from 'antd';
import HtmlContent from '../components/HtmlContent';
const { Title } = Typography;
import moment from 'moment';

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
  return { blog };
}

function BlogDetail() {
  const { blog } = useLoaderData();
  const fetcher = useFetcher();
  const navigate = useNavigate();
  //style
  const titleStyle = {
    textAlign: 'center',
  };
  const containerStyle = {
    height: '450px',
    overflow: 'auto',
    backgroundColor: '#ffffff',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    boxSizing: 'border-box',
  };

  return (
    <Card>
      <Flex vertical>
        <Flex justify="flex-end">
          {' '}
          <Space>
            <fetcher.Form method="patch">
              <Button
                type="primary"
                danger
                htmlType="submit"
                name="id"
                value={blog[0].id}
              >
                Xóa
              </Button>
              <input type="hidden" name="type" value="delete" />
            </fetcher.Form>
            <Button
              type="primary"
              size="middle"
              onClick={() => {
                navigate(`/blogs/edit/${blog[0].id}`);
              }}
            >
              Chỉnh sửa
            </Button>
          </Space>
        </Flex>
        <Title level={3} style={titleStyle}>
          {blog[0].title}
        </Title>
        <Flex vertical align="flex-start">
          <Title level={5} italic style={titleStyle}>
            Đăng ngày: {moment(blog[0].created_at).format('DD/MM/YYYY')}
          </Title>
          <Title level={5} italic style={titleStyle}>
            Tác giả: {blog[0].author}
          </Title>
        </Flex>
        <div style={containerStyle}>
          <HtmlContent html={blog[0].content} />
        </div>
      </Flex>
    </Card>
  );
}

export default BlogDetail;
