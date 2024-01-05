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
      return null;
    }
    return null;
  } catch (e) {
    console.log(e);
    alert(e);
    return null;
  }
}
