import { redirect } from 'react-router-dom';
import ApiService from '../../service/ApiService';

import { Button, notification, Space } from 'antd';

export async function action({ request, params }) {
  const data = await request.formData();
  const id = data.get('id');
  console.log('id', id);
  const type = data.get('type');
  if (type === 'approve') {
    try {
      console.log('approve request');
      const result = await ApiService.post({
        url: `posts/approve?id=${id}`,
        data: {},
      });
      if (result.status == 'success') {
        notification.open({
          message: 'Thành công',
          description: 'Bài đăng của bạn đã được duyệt thành công',
          type: 'success',
          placement: 'top',
        });
        // alert('Duyệt thành công');
      } else {
        notification.open({
          message: 'Thất bại',
          description: 'Đã có lỗi xảy ra, xin thử lại',
          type: 'error',
          placement: 'top',
        });
      }
      return null;
    } catch (e) {
      console.log(e);
      notification.open({
        message: 'Thất bại',
        description: 'Đã có lỗi xảy ra, xin thử lại',
        type: 'error',
        placement: 'top',
      });
      return null;
    }
  }
  if (type === 'reject') {
    try {
      console.log('reject request');
      const result = await ApiService.post({
        url: `posts/reject?id=${id}`,
        data: {},
      });
      console.log('rejected results', result);
      if (result.status == 'success') {
        alert('Từ chối thành công');
      } else {
        alert('Đã có lỗi trong quá trình từ chối, xin thử lại');
      }
      return null;
    } catch (e) {
      console.log(e);
      alert('Đã có lỗi xảy ra, xin thử lại');
      return null;
    }
  }
  if (type === 'delete') {
    try {
      console.log('delete request');
      const result = await ApiService.patch({
        url: `posts/delete?id=${id}`,
        data: {},
      });
      console.log('delete results', result);
      if (result.status == 'success') {
        alert('Xóa thành công');
      } else {
        alert('Đã có lỗi trong quá trình xóa, xin thử lại');
      }
      return null;
    } catch (e) {
      console.log(e);
      alert('Đã có lỗi xảy ra, xin thử lại');
      return null;
    }
  }
}
