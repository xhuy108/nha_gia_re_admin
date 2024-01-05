import React from 'react';
import ImgCrop from 'antd-img-crop';
import axios from 'axios';
import {
  Tabs,
  Card,
  Row,
  Col,
  Typography,
  Button,
  Select,
  Table,
  Space,
  Input,
  Modal,
  Flex,
  Upload,
  Form as AntForm,
  Pagination,
} from 'antd';

import Search from 'antd/es/input/Search';
import { useState, useRef, useEffect } from 'react';
import {
  useNavigate,
  useLoaderData,
  useFetcher,
  Form,
  redirect,
} from 'react-router-dom';
const { Text, Link } = Typography;
import DeveloperTable from '../components/TableOfDeveloper';
import ApiService from '../../../service/ApiService';
import Breadcrumbs from '../../../globalComponents/BreadCrumb/BreadCrumb';
import TextArea from 'antd/es/input/TextArea';
import moment from 'moment';
//function loader to call API
export async function loader({ request, params }) {
  console.log('request:', request);
  const developers = await ApiService.get(
    'developers?is_active[eq]=true&page=all',
  );
  if (!developers) {
    throw new Response('', {
      status: 404,
      statusText: 'Not Found',
    });
  }
  return { developers };
}

function Developer(props) {
  const navigate = useNavigate();
  const { Title } = Typography;
  const { developers } = useLoaderData();
  const fetcher = useFetcher();
  const [isAddNewModalOpen, setIsAddNewModalOpen] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [fileList, setFileList] = useState([]);
  const onChange = ({ fileList: newFileList }) => {
    console.log('fileList: ', fileList);
    setFileList(newFileList);
  };
  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const showAddNewModal = () => {
    setIsModalOpen(true);
  };
  const handleOkAddNewModal = () => {
    setIsModalOpen(false);
  };
  const handleCancelAddNewModal = () => {
    setIsModalOpen(false);
  };

  const uploadImage = async (options) => {
    try {
      const { onSuccess, onError, file, onProgress } = options;
      console.log('file', file);
      const fmData = new FormData();
      fmData.append('files', file);
      const res = await axios.post(
        'https://nha-gia-re-server.onrender.com/api/v1/media/upload',
        fmData,
      );

      console.log('Response', res.data.result[0]);
      onSuccess(res.data.result[0]);
    } catch (e) {
      const error = new Error('Error occurred while uploading');
      onError({ event: error });
    }
  };

  const columns = [
    {
      title: 'Tên',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (_, record) => moment(record).format('DD/MM/YYYY'),
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <fetcher.Form method="patch">
            <Button
              onClick={(e) => {
                e.stopPropagation();
              }}
              type="primary"
              danger
              htmlType="submit"
              name="id"
              value={record.id}
            >
              Xóa
            </Button>
            <input type="hidden" name="type" value="delete" />
          </fetcher.Form>
        </Space>
      ),
    },
  ];
  return (
    <div>
      <Card>
        <Breadcrumbs></Breadcrumbs>
        <Row style={{ marginBottom: '16px' }}>
          <Col>
            <Title level={3} style={{ margin: 0, padding: 0 }}>
              Danh Sách Nhà Đầu Tư
            </Title>
          </Col>
        </Row>
        <Flex style={{ marginBottom: '12px' }} justify="space-between">
          <Search
            placeholder="Nhập thông tin cần tìm..."
            style={{
              width: 500,
            }}
            onSearch={() => {}}
            enterButton
          />

          <Button type="primary" onClick={showAddNewModal}>
            Thêm mới
          </Button>
        </Flex>

        <DeveloperTable columns={columns} data={developers} />
      </Card>
      {/* form create */}
      <Modal title="Tạo nhà đầu tư mới" open={isModalOpen} footer={null}>
        <Form method="post" id="contact-form">
          <input type="hidden" name="type" value="create" />
          <p>
            <span>Tên nhà đầu tư</span>
            <Input name="name" />
          </p>
          <p>
            <span>Mô tả đầu tư</span>
            <TextArea name="description" rows={4} />
          </p>
          <p>
            <ImgCrop rotationSlider>
              <Upload
                customRequest={uploadImage}
                listType="picture-card"
                fileList={fileList}
                onChange={onChange}
                onPreview={onPreview}
              >
                {fileList.length < 5 && '+ Upload'}
              </Upload>
            </ImgCrop>
            <Input
              name="images"
              type="hidden"
              value={JSON.stringify(fileList)}
            />
          </p>
          <Flex justify="flex-end">
            <Space>
              <Button danger type="primary" onClick={handleCancelAddNewModal}>
                Đóng
              </Button>
              <Button type="primary" htmlType="submit">
                Lưu
              </Button>
              {/* <button type="submit">submit</button> */}
            </Space>
          </Flex>
        </Form>
      </Modal>
    </div>
  );
}

export default Developer;
