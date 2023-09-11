import { useParams } from 'react-router-dom';
// import SingleItem from '../components/items/SingleItem';

export default function SingleItemPage() {
  const params = useParams();
  console.log('params ===', params);

  const item = {
    id: params.id,
  };

  return (
    <div className='container'>
      <h1 className='text-3xl mb-4 pt-4'>SingleItemPage</h1>
      <SingleItem item={item} />
    </div>
  );
}
