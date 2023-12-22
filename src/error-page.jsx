import { useRouteError } from 'react-router-dom';
import errImg from '../assets/error.png';
import { Flex, Button } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);
  const navigate = useNavigate();
  return (
    <div id="error-page">
      <Flex gap="large" justify="center">
        <Flex vertical justify="center">
          <h2>Oops...</h2>
          <h3>Không tìm thấy trang</h3>
          <Button
            type="dashed"
            onClick={() => {
              navigate('/');
            }}
          >
            Quay về Trang Chủ
          </Button>
        </Flex>
        <img src={errImg} alt="" />
      </Flex>
    </div>
  );
}
