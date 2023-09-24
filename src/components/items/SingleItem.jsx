/* eslint-disable react/prop-types */
import { useAuth } from '../../store/AuthProvider';

export default function SingleItem(props) {
  const { attachement, title, price, description, stock, userUid } = props.item;
  const ctx = useAuth();

  const myItems = userUid === ctx.userUid ? true : false;

  return (
    <ul className=''>
      <img
        className='max-w-full mx-auto drop-shadow-lg'
        src={attachement}
        alt='item photo'
      />

      <h3 className='text-center p-4 text-xl font-medium drop-shadow-lg'>
        {title}
      </h3>

      <p className='text-slate-500 py-3 px-4'>
        Price: <span className='text-black'>{price}</span>
      </p>

      <p className='text-slate-500 py-3 px-4'>
        Description: <span className='text-black'>{description}</span>
      </p>

      <p className='text-slate-500 py-3 px-4'>
        Units: <span className='text-black'>{stock}</span>
      </p>
      <p>userUid: {userUid}</p>
      {myItems && !props.noDelete && (
        <button
          onClick={props.onDelete}
          className='border border-slate-200 px-4 py-1 mt-3 bg-red-600 text-white inline-block'
        >
          delete
        </button>
      )}
    </ul>
  );
}
