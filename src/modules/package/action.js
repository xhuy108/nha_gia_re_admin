import { redirect } from 'react-router-dom';
import ApiService from '../../service/ApiService';

export async function action({ request, params }) {
  try {
    const data = await request.formData();
    const type = data.get('type');
    if (type === 'create') {
      console.log('create new package');
      const body = {
        name: data.get('name'),
        price_per_month: data.get('pricePerMonth'),
        description: data.get('description'),
        monthly_post_limit: data.get('postPerMonth'),
        display_priority_point: data.get('displayPriorityPoint'),
        post_approval_priority_point: data.get('postApprovalPriorityPoint'),
      };
      const res = await ApiService.post({
        url: 'membership-packages',
        data: body,
      });
      if (res.status == 'success') {
        alert('create success');
      } else {
        alert('error');
      }
      return null;
    } else if (type === 'delete') {
      const id = data.get('id');
      console.log('delete request');
      const result = await ApiService.delete({
        url: `membership-packages/${id}`,
      });
      console.log('delete results', result);
      if (result.status == 'success') {
        alert('delete success');
      } else {
        alert('error');
      }
      return null;
    }

    return null;
  } catch (e) {
    console.log(e);
    alert(e);
    return null;
  }
}
