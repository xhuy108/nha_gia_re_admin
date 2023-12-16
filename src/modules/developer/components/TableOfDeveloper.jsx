import React, { useState } from 'react';
import ImgCrop from 'antd-img-crop';
import {
  Row,
  Table,
  Modal,
  Form as AntForm,
  Input,
  Button,
  Col,
  Flex,
  Typography,
  Upload,
  Image,
  Space,
} from 'antd';
import axios from 'axios';
const { Text, Link } = Typography;
const { TextArea } = Input;
import { useNavigate, Form } from 'react-router-dom';
import { CloseOutlined } from '@ant-design/icons';

function DeveloperTable(props) {
  const { Title } = Typography;
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [item, setItem] = useState({});
  const [fileList, setFileList] = useState([]);

  const onRowHandler = (record) => {
    setIsModalOpen(true);
    setItem(record);
    console.log('record data: ', record);
    const images = record.images.map((imageUrl, index) => {
      return {
        uid: `${index}`,
        name: `image ${index}`,
        status: 'done',
        url: imageUrl,
      };
    });
    setFileList(images);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setIsEdit(false);
  };

  const editHandler = () => {
    setIsEdit((prev) => true);
  };

  const uploadImage = async (options) => {
    console.log('uploading image');
    const { onSuccess, onError, file, onProgress } = options;
    try {
      const fmData = new FormData();
      fmData.append('files', file);
      const res = await axios.post(
        'https://nha-gia-re-server.onrender.com/api/v1/media/upload',
        fmData,
      );

      onSuccess(res.data.result[0]);
    } catch (e) {
      console.log('error', e);
      const error = new Error('Error occurred while uploading');
      onError({ event: error });
    }
  };
  const onChange = ({ fileList: newFileList }) => {
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
  return (
    <div>
      <Row style={{ display: 'flex' }}>
        <Table
          style={{ width: '100%' }}
          rowClassName="custom-row"
          dataSource={props.data}
          columns={props.columns}
          onRow={(record) => ({
            onClick: () => {
              onRowHandler(record);
            },
          })}
        />

        {Object.keys(item).length !== 0 && (
          <Modal title="Basic Modal" open={isModalOpen} footer={null}>
            <Form method="post" id="contact-form">
              <input type="hidden" name="type" value="edit" />
              <input type="hidden" name="id" value={item.id} />
              <p>
                <span>Tên nhà đầu tư</span>
                {!isEdit && <Input value={item.name} />}
                {isEdit && (
                  <Input name="name" placeholder={`${item.name}`}></Input>
                )}
              </p>
              <p>
                <span>Mô tả đầu tư</span>

                {!isEdit && <TextArea rows={4} value={item.description} />}
                {isEdit && (
                  <TextArea
                    name="description"
                    rows={4}
                    placeholder={item.description}
                  />
                )}
              </p>
              <p>
                <span>Ngày tạo</span>
                <Input value={item.created_at} />
              </p>
              <p>
                <ImgCrop rotationSlider>
                  <Upload
                    customRequest={uploadImage}
                    listType="picture-card"
                    fileList={fileList}
                    disabled={isEdit ? false : true}
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
                  {isEdit && (
                    <Button type="primary" htmlType="primary">
                      Save
                    </Button>
                  )}

                  {!isEdit && (
                    <Button type="primary" onClick={editHandler}>
                      Edit
                    </Button>
                  )}

                  <Button onClick={handleCancel}>Cancel</Button>
                </Space>
              </Flex>
            </Form>
          </Modal>
        )}
      </Row>
    </div>
  );
}

export default DeveloperTable;
