import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './../firebase/firebase';
import SingleItem from '../components/items/SingleItem';

export default function SingleItemPage() {
  const params = useParams();
  console.log('params ===', params);
  const [currentItemObj, setCurrentAddObj] = useState({});

  useEffect(() => {
    console.log('pasileido effectas');

    async function getSingleDocumentFromFirebase() {
      const docRef = doc(db, 'shopitems', params.item.id);
      console.log('params.item.id ===', params.item.id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log('Document data:', docSnap.data());

        setCurrentAddObj(docSnap.data());
      } else {
        console.log('No such document!');
      }
    }
    getSingleDocumentFromFirebase();
  }, [params.item.id]);

  console.log('po efektu kode');
  return (
    <div className='container'>
      <h1 className='text-3xl mb-4 pt-4'>SingleAddPage</h1>
      <img src={currentItemObj.mainImgUrl} alt='hero' />
      <h2 className='text-2xl font-semibold'>
        Post title: {currentItemObj.title}
      </h2>
      <p>price: {currentItemObj.price} eur</p>
      <SingleItem key={currentItemObj.id} item={currentItemObj} noDelete />
    </div>
  );
}

// return (
//   <div className='container'>
//     <h1 className='text-3xl mb-4 pt-4'>SingleAddPage</h1>
//     <img src={currentItemObj.mainImgUrl} alt='hero' />
//     <h2 className='text-2xl font-semibold'>
//       Post title: {currentItemObj.title}
//     </h2>
//     <p>price: {currentItemObj.price} eur</p>
//     <SingleItem item={currentItemObj} noDelete />
//   </div>
// );
// }
