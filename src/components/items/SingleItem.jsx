// import { Link } from 'react-router-dom';
// import { useAuth } from '../../store/AuthProvider';

// export default function SingleItem(props) {
//   const ctx = useAuth();
//   const { id, title, price, userUid, stock, description, mainImgUrl } =
//     props.item;

//   const isMine = userUid === ctx.userUid ? true : false;

//   return (
//     <li
//       className={`inline-block align-bottom ${
//         isMine ? 'shadow-md bg-amber-100' : 'bg-slate-200'
//       }`}
//     >
//       <img className='max-h-[270px]' src={mainImgUrl} alt='item photo' />
//       <h3 className='text-center p-4 text-lg'>{title}</h3>
//       <p className='text-slate-500 py-3 px-4'>
//         Price: <span className='text-black'>{price}</span>
//       </p>
//       <p className='px-4'>Description: {description}</p>
//       <p className='px-4'>Available units: {stock}</p>
//       <p className='px-4'>userUid: {userUid}</p>
//       <div className='flex justify-between align-bottom'>
//         <Link
//           className='border border-slate-200 px-4 py-1 mt-3 bg-slate-600 text-white inline-block'
//           to={`/items/${id}`}
//         >
//           Read more
//         </Link>
//         {isMine && (
//           <button
//             onClick={props.onDelete}
//             className='border border-slate-200 px-4 py-1 mt-3 bg-red-600 text-white inline-block'
//           >
//             delete
//           </button>
//         )}
//       </div>
//     </li>
//   );
// }
