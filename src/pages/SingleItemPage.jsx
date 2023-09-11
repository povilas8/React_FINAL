import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './../firebase/firebase';
import SingleItem from '../components/items/SingleItem';

export default function SingleItemPage() {
  const params = useParams();
  console.log('params ===', params);
  const [currentAddObj, setCurrentAddObj] = useState({});

  useEffect(() => {
    console.log('pasileido effectas');

    async function getSingleDocumentFromFirebase() {
      const docRef = doc(db, 'shopitems', params.item.id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log('Document data:', docSnap.data());

        setCurrentAddObj(docSnap.data());
      } else {
        console.log('No such document!');
      }
    }
    getSingleDocumentFromFirebase();
  }, [params.addId]);

  console.log('po efektu kode');
  return (
    <div className='container'>
      <h1 className='text-3xl mb-4 pt-4'>SingleAddPage</h1>
      <img src={currentAddObj.mainImgUrl} alt='hero' />
      <h2 className='text-2xl font-semibold'>
        Post title: {currentAddObj.title}
      </h2>
      <p>price: {currentAddObj.price?.toFixed(2)} eur</p>
      <SingleItem item={currentAddObj} noDelete />
    </div>
  );
}
