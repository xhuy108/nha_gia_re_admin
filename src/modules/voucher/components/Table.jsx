import React, { useState } from 'react';
import {
  Row,
  Table,
  Modal,
  Form,
  Input,
  Button,
  Col,
  Flex,
  Typography,
  Space,
  DatePicker,
  Select,
} from 'antd';
import TextArea from 'antd/es/input/TextArea';
const { RangePicker } = DatePicker;
import { useNavigate, useFetcher, Form as DomForm } from 'react-router-dom';

import Column from 'antd/es/table/Column';
import moment from 'moment';
// rowSelection object indicates the need for row selection

function PostTable(props) {
  const { Title } = Typography;
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenCreate, setIsModalCreate] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [item, setItem] = useState({});
  const [packageId, setPackageId] = useState(null);

  const showModalDetail = (props) => {
    setIsModalOpen(true);
    setItem(props);
  };

  const handleCancelModalDetail = () => {
    setIsModalOpen(false);
    setIsEdit(false);
  };

  const showModalCreate = (props) => {
    setIsModalCreate(true);
    setItem(props);
  };

  const handleCancelModalCreate = () => {
    setIsModalCreate(false);
  };

  const onChange = (value) => {
    console.log(`selected ${value}`);
    setPackageId(value);
  };
  // const onSearch = (value) => {
  //   console.log('search:', value);
  // };
  const filterOption = (input, option) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  return (
    <div>
      <Flex gap="middle" justify="space-between" align="center">
        <Flex gap="small">
          <Title level={4}>DS Mã giảm giá</Title>
        </Flex>
        <Flex gap="small">
          <Button type="primary" size="middle" onClick={showModalCreate}>
            Thêm mới
          </Button>
        </Flex>
      </Flex>
      <Row style={{ display: 'flex' }}>
        <Table
          style={{ width: '100%' }}
          rowClassName="custom-row"
          dataSource={props.data}
          columns={props.columns}
          onRow={(record) => ({
            onClick: () => {
              showModalDetail(record);
            },
          })}
        />
        {/* edit form */}
        <Modal
          closeIcon={false}
          title="Chi tiết mã giảm giá"
          open={isModalOpen}
          footer={() => (
            <Flex justify="flex-end">
              {/* {!isEdit && (
                <Button
                  type="primary"
                  onClick={() => {
                    setIsEdit(true);
                  }}
                >
                  Chỉnh sửa
                </Button>
              )} */}
              {isEdit && (
                <Button
                  type="primary"
                  onClick={() => {
                    setIsEdit(true);
                  }}
                >
                  Lưu
                </Button>
              )}
              <Button onClick={handleCancelModalDetail}>Đóng</Button>
            </Flex>
          )}
        >
          {/* Form */}
          <Form
            style={{ marginTop: '24px' }}
            name="basic"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            autoComplete="off"
          >
            <Form.Item label="Mã CODE">
              {!isEdit && <Input value={item.code} />}
              {isEdit && (
                <Input name="name" defaultValue={`${item.code}`}></Input>
              )}
            </Form.Item>
            <Form.Item label="Số tháng đăng ký">
              {!isEdit && <Input value={item.min_subscription_months} />}
              {isEdit && (
                <Input
                  name="name"
                  defaultValue={`${item.min_subscription_months}`}
                ></Input>
              )}
            </Form.Item>

            <Form.Item label="Mô tả">
              <Input value={item.description} />
            </Form.Item>

            <Form.Item label="Giảm giá (%)">
              <Input value={item.discount_percent} />
            </Form.Item>

            <Form.Item label="Số lượng sử dụng">
              <Input value={item.limited_quantity} />
            </Form.Item>

            <Form.Item label="Ngày tạo">
              <Input value={moment(item.created_at).format('DD/MM/YYYY')} />
            </Form.Item>

            <Form.Item label="Ngày bắt đầu">
              <Input value={moment(item.starting_date).format('DD/MM/YYYY')} />
            </Form.Item>

            <Form.Item label="Ngày hết hạn">
              <Input
                value={moment(item.expiration_date).format('DD/MM/YYYY')}
              />
            </Form.Item>

            <Form.Item label="Trạng thái">
              <Input value={item.is_active ? 'Đang kích hoạt' : 'Vô hiệu'} />
            </Form.Item>
          </Form>
        </Modal>

        {/* create form */}
        {/* <Modal
          title="Thêm mới Gói dịch vụ"
          open={isModalOpenCreate}
          closeIcon={false}
          footer={(_, { OkBtn2, CancelBtn2 }) => null}
        >
          <Form
            style={{ marginTop: '24px' }}
            name="basic"
            labelCol={{ span: 9 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            autoComplete="off"
          >
            <Form.Item label="Tên">
              <Input placeholder="Nhập tên..." />
            </Form.Item>

            <Form.Item label="Mô tả">
              <Input placeholder="Nhập mô tả..." />
            </Form.Item>

            <Form.Item label="Giá/tháng">
              <Input placeholder="Nhập giá/tháng" />
            </Form.Item>

            <Form.Item label="Số lượng bài đăng/tháng">
              <Input placeholder="Nhập số lượng bài đăng/tháng" />
            </Form.Item>

            <Form.Item label="Điểm ưu tiên">
              <Input placeholder="Nhập điểm ưu tiên" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" danger onClick={handleCancelModalCreate}>
                Đóng
              </Button>

              <fetcher.Form method="post">
                <Button
                  type="primary"
                  htmlType="submit"
                  name="type"
                  value="create"
                >
                  Lưu
                </Button>
              </fetcher.Form>
            </Form.Item>
          </Form>
        </Modal> */}

        <Modal
          title="Tạo mã giảm giá mới"
          open={isModalOpenCreate}
          closeIcon={null}
          footer={null}
        >
          <DomForm method="post" id="contact-form">
            <input type="hidden" name="type" value="create" />
            <p>
              <span>CODE</span>
              <Input name="code" />
            </p>
            <p>
              <span>Mô tả</span>
              <TextArea name="description" />
            </p>
            <p>
              <span>Tỉ lệ giảm giá %</span>
              <Input name="discount_percent" type="number" min={0} max={100} />
            </p>
            <p>
              <span>Gói dịch vụ</span>
              <br />
              <Select
                showSearch
                placeholder="Chọn gói dịch vụ"
                optionFilterProp="children"
                onChange={onChange}
                // onSearch={onSearch}
                filterOption={filterOption}
                options={props.packageList.map((item) => {
                  return { value: item.id, label: item.name };
                })}
              />
              <input type="hidden" name="package_id" value={packageId} />
            </p>

            <p>
              <span>Ngày bắt đầu</span>
              <br />
              <DatePicker name="starting_date" />
            </p>
            <p>
              <span>Ngày kết thúc</span>
              <br />
              <DatePicker name="expiration_date" />
            </p>
            <p>
              <span>Số lượng sử dụng tối đa</span>
              <Input type="number" name="limited_quantity" />
            </p>
            <p>
              <span>Số tháng đăng kí tối thiểu</span>
              <Input type="number" name="min_subscription_months" />
            </p>

            <Flex justify="flex-end">
              <Space>
                <Button onClick={handleCancelModalCreate}>Đóng</Button>
                <Button
                  type="primary"
                  htmlType="submit"
                  onClick={() => {
                    console.log('click');
                  }}
                >
                  Lưu
                </Button>
                {/* <button type="submit">submit</button> */}
              </Space>
            </Flex>
          </DomForm>
        </Modal>
      </Row>
    </div>
  );
}

export default PostTable;
