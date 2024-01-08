import React from 'react';
import { PlusOutlined, EditOutlined } from '@ant-design/icons';
import { List } from 'antd';
import { Card, Row, Col, Button, Flex } from 'antd';
import Search from 'antd/es/input/Search';
import Breadcrumbs from '../../../globalComponents/BreadCrumb/BreadCrumb';
import { useState } from 'react';
import { useNavigate, useLoaderData, useFetcher } from 'react-router-dom';
import Title from 'antd/es/typography/Title';
import ApiService from '../../../service/ApiService';

//function loader to call API
export async function loader() {
  const blogs = await ApiService.get('blogs?page=all&is_active[eq]=true');
  return { blogs };
}

export default function Blog() {
  const { blogs } = useLoaderData();
  const fetcher = useFetcher();
  console.log('This is blogs: ', blogs);
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isModalOpen1, setIsModalOpen1] = useState(false);

  const [isModalOpen2, setIsModalOpen2] = useState(false);

  const [item, setItem] = useState({});

  return (
    <div>
      <Card>
        <Breadcrumbs />
        <Row style={{ marginBottom: '16px' }}>
          <Col>
            <Title level={3} style={{ margin: 0, padding: 0 }}>
              Blog
            </Title>
          </Col>
        </Row>
        <Flex gap="middle" justify="end" align="center">
          <Button
            type="primary"
            size="middle"
            icon={<PlusOutlined />}
            style={{
              backgroundColor: '#1890FF',
              marginLeft: '12px',
              marginTop: '16px',
            }}
            onClick={() => {
              navigate('/blogs/add');
            }}
          >
            Thêm
          </Button>
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
          dataSource={Array.isArray(blogs) ? blogs : []}
          // khi onclick co the navigate sang trang khac
          renderItem={(item) => {
            return (
              <List.Item
                onClick={() => {
                  console.log('item:', item);
                  navigate(`/blogs/${item.id}`);
                }}
                key={item.id}
                actions={[
                  <Button
                    key={item.id}
                    type="primary"
                    size="middle"
                    icon={<EditOutlined />}
                  >
                    Sửa
                  </Button>,
                  <fetcher.Form method="patch" key={item.id}>
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      type="primary"
                      danger
                      htmlType="submit"
                      name="id"
                      value={item.id}
                    >
                      Xóa
                    </Button>
                    <input type="hidden" name="type" value="delete" />
                  </fetcher.Form>,
                ]}
                extra={<img width={272} alt="logo" src={item.thumbnail} />}
              >
                <List.Item.Meta
                  title={<a href={item.href}>{item.title}</a>}
                  description={`${item.short_description}
                  `}
                />
                {/* {item.content} */}
              </List.Item>
            );
          }}
        />
      </Card>
    </div>
  );
}
