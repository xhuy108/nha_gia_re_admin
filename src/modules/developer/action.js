import { redirect } from 'react-router-dom';
import ApiService from '../../service/ApiService';
import { notification } from 'antd';

export async function action({ request, params }) {
  const formData = await request.formData();
  const type = formData.get('type');
  if (type === 'create') {
    const images = JSON.parse(formData.get('images'));
    const imagePaths = images.map((image) => image.response);
    const body = {
      name: formData.get('name'),
      description: formData.get('description'),
      images: imagePaths,
    };
    const res = await ApiService.post({ url: 'developers', data: body });
    return null;
  } else if (type === 'delete') {
    try {
      const id = formData.get('id');
      console.log('delete request');
      const result = await ApiService.delete({ url: `developers/${id}` });
      console.log('delete results', result);
      if (result.status == 'success') {
        notification.open({
          message: 'Thành công',
          description: 'Xóa thành công',
          type: 'success',
          placement: 'top',
        });
        // alert('delete success');
      } else {
        notification.open({
          message: 'Thất bại',
          description: 'Đã có lỗi trong quá trình xóa, xin thử lại',
          type: 'error',
          placement: 'top',
        });
        // alert('error');
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
      // alert(e);
      return null;
    }
  } else if (type === 'edit') {
    const data = Object.fromEntries(formData);
    const images = JSON.parse(data.images);
    const id = data.id;
    //extract url list from form
    const imagePaths = images.map((image) => {
      if (image.url) return image.url;
      return image.response;
    });
    //assign again for data
    data.images = imagePaths;
    const result = await ApiService.patch({
      url: `developers/${id}`,
      data: data,
    });
  }

  return null;
}
