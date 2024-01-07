import ApiService from '../../service/ApiService';
export async function action({ request, params }) {
  try {
    console.log('call action');
    const data = await request.formData();
    const id = data.get('id');
    console.log('id', id);
    const type = data.get('type');
    if (type === 'create') {
      //xử lý dữ liệu
      const body = {
        code: data.get('code'),
        discount_percent: parseFloat(data.get('discount_percent')) / 100,
        package_id: data.get('package_id'),
        starting_date: data.get('starting_date'),
        expiration_date: data.get('expiration_date'),
        description: data.get('description'),
        limited_quantity: parseFloat(data.get('limited_quantity')),
        min_subscription_months: parseFloat(
          data.get('min_subscription_months'),
        ),
      };
      console.log('create data', body);
      const res = await ApiService.post({
        url: 'discount-codes',
        data: body,
      });
      if (res.status == 'success') {
        alert('create success');
      } else {
        alert('error');
      }
      return null;
    } else {
      const id = data.get('id');
      console.log('delete request');
      const result = await ApiService.delete({
        url: `discount-codes/${id}`,
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
    console.log('error', e.message);
    return null;
  }
}
