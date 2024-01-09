import { redirect } from 'react-router-dom';
import ApiService from '../../service/ApiService';

import { Button, Modal, notification, Space } from 'antd';
import React, { useState } from 'react';
import Input from 'antd/es/input/Input';
// import { useRejectModal } from './useRejectModal';

export async function action({ request, params }) {
  const data = await request.formData();
  const id = data.get('id');
  console.log('id', id);
  const type = data.get('type');
  const reason = data.get('reason');
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
          description: 'Đã có lỗi trong quá trình duyệt, xin thử lại',
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
      // callback();
      console.log('reject request');
      console.log(reason);
      const result = await ApiService.post({
        url: `posts/reject?id=${id}`,
        data: {
          reason: reason,
        },
      });
      console.log('rejected results', result);
      if (result.status == 'success') {
        alert('Từ chối thành công');
      } else {
        notification.open({
          message: 'Thất bại',
          description: 'Đã có lỗi trong quá trình từ chối, xin thử lại',
          type: 'error',
          placement: 'top',
        });
        //alert('Đã có lỗi trong quá trình từ chối, xin thử lại');
      }
      // Modal.confirm({
      //   title: 'Bạn có chắc chắn muốn từ chối bài đăng này?',
      //   content: React.createElement(
      //     'div',
      //     null,
      //     React.createElement(Input, {
      //       placeholder: 'Lý do từ chối',
      //     }),
      //   ),
      //   okButtonProps: {
      //     style: {
      //       backgroundColor: '#026D4D',
      //       borderColor: '#026D4D',
      //       color: 'white',
      //     },
      //   },
      //   onOk: async () => {
      //     console.log('reject request');
      //     const result = await ApiService.post({
      //       url: `posts/reject?id=${id}`,
      //       data: {},
      //     });
      //     console.log('rejected results', result);
      //     if (result.status == 'success') {
      //       notification.open({
      //         message: 'Thành công',
      //         description: 'Từ chối thành công',
      //         type: 'success',
      //         placement: 'top',
      //       });
      //     } else {
      //       notification.open({
      //         message: 'Thất bại',
      //         description: 'Đã có lỗi trong quá trình từ chối, xin thử lại',
      //         type: 'error',
      //         placement: 'top',
      //       });
      //     }
      //   },
      //   onCancel: () => {
      //     console.log('reject cancelled');
      //   },
      // });
      return null;
    } catch (e) {
      console.log(e);
      notification.open({
        message: 'Thất bại',
        description: 'Đã có lỗi xảy ra, xin thử lại',
        type: 'error',
        placement: 'top',
      });
      // alert('Đã có lỗi xảy ra, xin thử lại');
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
        // alert('Đã có lỗi trong quá trình xóa, xin thử lại');
        notification.open({
          message: 'Thất bại',
          description: 'Đã có lỗi trong quá trình xóa, xin thử lại',
          type: 'error',
          placement: 'top',
        });
      }
      return null;
    } catch (e) {
      console.log(e);
      notification.open({
        message: 'Thất bại',
        description: 'Đã có lỗi xảy ra, xin thử lại',
        type: 'error',
        placement: 'top',
      });
      // alert('Đã có lỗi xảy ra, xin thử lại');
      return null;
    }
  }
}
