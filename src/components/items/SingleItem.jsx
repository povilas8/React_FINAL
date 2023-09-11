import { Link } from 'react-router-dom';

export default function SingleItem(props) {
  const { item } = props;

  return (
    <ul className='bg-slate-200'>
      <img className='max-h-[270px]' src={item.mainImgUrl} alt='item photo' />

      <h3 className='text-center p-4 text-lg'>{item.title}</h3>

      <p className='text-slate-500 py-3 px-4'>
        Price: <span className='text-black'>{item.price}</span>
      </p>

      <p className='px-4'>Description: {item.description}</p>

      <p className='px-4'>Available units: {item.stock}</p>

      <div className='flex justify-between align-bottom'>
        <Link
          className='border border-slate-200 px-4 py-1 mt-3 bg-slate-600 text-white inline-block'
          to={`/items/${item.id}`}
        >
          Read more
        </Link>
        <button
          onClick={props.onDelete}
          className='border border-slate-200 px-4 py-1 mt-3 bg-red-600 text-white inline-block'
        >
          delete
        </button>
      </div>
    </ul>
  );
}
