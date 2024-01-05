import ApiService from '../../service/ApiService';
export async function action({ request, params }) {
  console.log('call action');
  const data = await request.formData();
  const id = data.get('id');
  console.log('id', id);
  const type = data.get('type');
  if (type === 'create') {
    console.log('create');
  }
}
