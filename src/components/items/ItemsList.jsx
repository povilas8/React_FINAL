/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import { useAuth } from '../../store/AuthProvider';

export default function SingleItem(props) {
  const { item } = props;
  const ctx = useAuth();

  const myItems = item.userUid === ctx.userUid ? true : false;

  return (
    <ul className='bg-slate-200 hover:shadow-xl bottom-0 flex flex-col justify-end'>
      <div className='object-fill'>
        <Link to={`/${item.id}`}>
          <img
            className='object-fill'
            src={item.attachement}
            alt='item photo'
          />
        </Link>
      </div>
      <div>
        <Link to={`/${item.id}`}>
          <h3 className='text-center p-1 text-xl font-medium drop-shadow-lg'>
            {item.title}
          </h3>
        </Link>

        <p className='text-slate-500 py-1 px-1'>
          Price: <span className='text-black'>{item.price}</span>
        </p>

        <p className='text-slate-500 py-1 px-1 h-12'>
          Description:{' '}
          <span className='text-black'>
            {item.description.length > 80
              ? item.description.slice(0, 80) + '...'
              : item.description}
          </span>
        </p>

        <p className='text-slate-500 py-1 px-1'>
          Units: <span className='text-black'>{item.stock}</span>
        </p>
        <p>userUid: {item.userUid}</p>

        <div className='flex justify-between align-bottom'>
          <Link
            className='border border-slate-200 px-4 py-1 mt-3 bg-slate-600 text-white inline-block'
            to={`/${item.id}`}
          >
            Read more
          </Link>
          {myItems && !props.noDelete && (
            <button
              onClick={props.onDelete}
              className='border border-slate-200 px-4 py-1 mt-3 bg-red-600 text-white inline-block'
            >
              delete
            </button>
          )}
        </div>
      </div>
    </ul>
  );
}
