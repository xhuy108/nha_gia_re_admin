import { redirect } from 'react-router-dom';
import ApiService from '../../service/ApiService';
import { notification } from 'antd';

export async function action({ request, params }) {
  const data = await request.formData();
  const id = data.get('id');
  console.log('id', id);
  const type = data.get('type');
  if (type === 'approve') {
    try {
      console.log('approve request');
      const result = await ApiService.patch({
        url: `reports/${id}`,
        data: { status: 'resolved' },
      });
      if (result.status == 'success') {
        notification.open({
          message: 'Thành công',
          description: 'Tố cáo đã được duyệt thành công',
          type: 'success',
          placement: 'top',
        });
        // alert('Duyệt thành công');
      } else {
        notification.open({
          message: 'Thất bại',
          description: 'Đã có lỗi trong quá trình duyệt, xin thử lại',
          type: 'error',
          placement: 'top',
        });
        // alert('Đã có lỗi trong quá trình duyệt, xin thử lại');
      }
      return null;
    } catch (e) {
      console.log(e);
      notification.open({
        message: 'Thất bại',
        description: 'Đã có lỗi trong quá trình duyệt, xin thử lại',
        type: 'error',
        placement: 'top',
      });
      // alert('Đã có lỗi trong quá trình duyệt, xin thử lại');
      return null;
    }
  }
  if (type === 'reject') {
    try {
      console.log('reject request');
      const result = await ApiService.patch({
        url: `reports/${id}`,
        data: { status: 'rejected' },
      });
      console.log('rejected results', result);
      if (result.status == 'success') {
        notification.open({
          message: 'Thành công',
          description: 'Từ chối thành công',
          type: 'success',
          placement: 'top',
        });
        // alert('Từ chối thành công');
      } else {
        notification.open({
          message: 'Thất bại',
          description: 'Đã có lỗi trong quá trình từ chối, xin thử lại',
          type: 'error',
          placement: 'top',
        });
        // alert('Đã có lỗi trong quá trình từ chối, xin thử lại');
      }
      return null;
    } catch (e) {
      console.log(e);
      notification.open({
        message: 'Thất bại',
        description: 'Đã có lỗi trong quá trình từ chối, xin thử lại',
        type: 'error',
        placement: 'top',
      });
      // alert('Đã có lỗi trong quá trình từ chối, xin thử lại');
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
        notification.open({
          message: 'Thành công',
          description: 'Xóa thành công',
          type: 'success',
          placement: 'top',
        });
        // alert('Xóa thành công');
      } else {
        notification.open({
          message: 'Thất bại',
          description: 'Đã có lỗi trong quá trình xóa, xin thử lại',
          type: 'error',
          placement: 'top',
        });
        // alert('Đã có lỗi trong quá trình xóa, xin thử lại');
      }
      return null;
    } catch (e) {
      console.log(e);
      notification.open({
        message: 'Thất bại',
        description: 'Đã có lỗi trong quá trình xóa, xin thử lại',
        type: 'error',
        placement: 'top',
      });
      // alert('Đã có lỗi trong quá trình xóa, xin thử lại');
      return null;
    }
  }

  if (type === 'ban') {
    try {
      console.log('ban request');
      const result = await ApiService.patch({
        url: `users/${id}/ban`,
        data: {},
      });
      console.log('ban results', result);
      if (result.status == 'success') {
        notification.open({
          message: 'Thành công',
          description: 'Khóa thành công',
          type: 'success',
          placement: 'top',
        });
        // alert('Khóa thành công');
      } else {
        notification.open({
          message: 'Thất bại',
          description: 'Đã có lỗi trong quá trình khóa, xin thử lại',
          type: 'error',
          placement: 'top',
        });
        // alert('Đã có lỗi trong quá trình khóa, xin thử lại');
      }
      return null;
    } catch (e) {
      console.log(e);
      notification.open({
        message: 'Thất bại',
        description: 'Đã có lỗi trong quá trình khóa, xin thử lại',
        type: 'error',
        placement: 'top',
      });
      // alert('Đã có lỗi trong quá trình khóa, xin thử lại');
      return null;
    }
  }

  if (type === 'unban') {
    try {
      console.log('unban request');
      const result = await ApiService.patch({
        url: `users/${id}/unban`,
        data: {},
      });
      console.log('ban results', result);
      if (result.status == 'success') {
        notification.open({
          message: 'Thành công',
          description: 'Mở khóa thành công',
          type: 'success',
          placement: 'top',
        });
        // alert('Mở khóa thành công');
      } else {
        notification.open({
          message: 'Thất bại',
          description: 'Đã có lỗi trong quá trình mở khóa, xin thử lại',
          type: 'error',
          placement: 'top',
        });
        // alert('Đã có lỗi trong quá trình mở khóa, xin thử lại');
      }
      return null;
    } catch (e) {
      console.log(e);
      notification.open({
        message: 'Thất bại',
        description: 'Đã có lỗi trong quá trình mở khóa, xin thử lại',
        type: 'error',
        placement: 'top',
      });
      // alert('Đã có lỗi trong quá trình mở khóa, xin thử lại');
      return null;
    }
  }
}
