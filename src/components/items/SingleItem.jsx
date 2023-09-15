/* eslint-disable react/prop-types */

export default function SingleItem(props) {
  console.log('props ===', props);
  const { item } = props;

  return (
    <ul className='bg-slate-200'>
      <img className='object-fit' src={item.mainImgUrl} alt='item photo' />

      <h3 className='text-center p-4 text-xl font-medium drop-shadow-lg'>
        {item.title}
      </h3>

      <p className='text-slate-500 py-3 px-4'>
        Price: <span className='text-black'>{item.price}</span>
      </p>

      <p className='text-slate-500 py-3 px-4'>
        Description: <span className='text-black'>{item.description}</span>
      </p>

      <p className='text-slate-500 py-3 px-4'>
        Units: <span className='text-black'>{item.stock}</span>
      </p>
    </ul>
  );
}
