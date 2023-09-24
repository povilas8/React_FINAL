/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import { useAuth } from '../../store/AuthProvider';

export default function SingleItem(props) {
  const { item, user, userUid } = props;
  const ctx = useAuth();

  const myItems = user === ctx.userUid ? true : false;
  console.log('myItems ===', myItems);

  return (
    <ul className='bg-slate-200 transform transition-transform hover:scale-105 transform-origin-center hover:shadow-lg'>
      <Link to={`/${item.id}`}>
        <img className='object-fit' src={item.attachement} alt='item photo' />

        <h3 className='text-center p-4 text-xl font-medium drop-shadow-lg'>
          {item.title}
        </h3>
      </Link>

      <p className='text-slate-500 py-3 px-4'>
        Price: <span className='text-black'>{item.price}</span>
      </p>

      <p className='text-slate-500 py-3 px-4'>
        Description: <span className='text-black'>{item.description}</span>
      </p>

      <p className='text-slate-500 py-3 px-4'>
        Units: <span className='text-black'>{item.stock}</span>
      </p>
      <p>userUid: {userUid}</p>

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
    </ul>
  );
}
