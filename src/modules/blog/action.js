import { redirect } from 'react-router-dom';
import ApiService from '../../service/ApiService';
import { successNoti, errorNoti } from '../../service/AlertService';
import { Alert } from 'antd';

export async function action({ request, params }) {
  try {
    const formData = await request.formData();
    const type = formData.get('type');
    console.log('type: ', type);
    if (type === 'create') {
      const body = {
        title: formData.get('title'),
        short_description: formData.get('description'),
        author: formData.get('author'),
        thumbnail: formData.get('thumbnail'),
        content: formData.get('content'),
      };
      console.log('body: ', body);
      const res = await ApiService.post({ url: 'blogs', data: body });
      console.log('res: ', res);
      return redirect('/blogs');
    } else if (type === 'delete') {
      const id = formData.get('id');
      console.log('delete request', id);
      const result = await ApiService.delete({ url: `blogs/${id}` });
      console.log('delete results', result);
      if (result.status == 'success') {
        alert('Xóa bài blog thành công');
        return redirect('/blogs');
      } else {
        alert('Đã có lỗi xảy ra xin thử lại');
      }
      return null;
    } else if (type === 'edit') {
      const data = {
        title: formData.get('title'),
        short_description: formData.get('description'),
        author: formData.get('author'),
        thumbnail: formData.get('thumbnail'),
        content: formData.get('content'),
      };

      console.log('edit request', data);
      const id = formData.get('id');
      const result = await ApiService.patch({
        url: `blogs/${id}`,
        data: data,
      });
      if (result.status == 'success') {
        alert('Chỉnh sữa bài blog thành công');
        return redirect(`/blogs/${id}`);
      } else {
        alert('Đã có lỗi trong quá trình chỉnh sữa bài blog, xin thử lại');
      }
      return null;
    }
  } catch (err) {
    alert(err.message);
    return null;
  }

  //   } else if (type === 'delete') {
  //     try {
  //       const id = data.get('id');
  //       console.log('delete request');
  //       const result = await ApiService.delete({ url: `developers/${id}` });
  //       console.log('delete results', result);
  //       if (result.status == 'success') {
  //         alert('delete success');
  //       } else {
  //         alert('error');
  //       }
  //       return null;
  //     } catch (e) {
  //       console.log(e);
  //       alert(e);
  //       return null;
  //     }
  //   } else if (type === 'edit') {
  //     const data = Object.fromEntries(formData);
  //     const images = JSON.parse(data.images);
  //     const id = data.id;
  //     //extract url list from form
  //     const imagePaths = images.map((image) => {
  //       if (image.url) return image.url;
  //       return image.response;
  //     });
  //     //assign again for data
  //     data.images = imagePaths;
  //     const result = await ApiService.patch({
  //       url: `developers/${id}`,
  //       data: data,
  //     });
  //   }

  //   return null;
}
