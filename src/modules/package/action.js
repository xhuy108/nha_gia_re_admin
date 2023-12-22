import { redirect } from 'react-router-dom';
import ApiService from '../../service/ApiService';

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
        alert('Duyệt thành công');
      } else {
        alert('Đã có lỗi trong quá trình duyệt, xin thử lại');
      }
      return null;
    } catch (e) {
      console.log(e);
      alert(e);
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
        alert('Đã có lỗi trong quá trình xóa, xin thử lại');
      }
      return null;
    } catch (e) {
      console.log(e);
      alert(e);
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
        alert('error');
      }
      return null;
    } catch (e) {
      console.log(e);
      alert(e);
      return null;
    }
  }
}
