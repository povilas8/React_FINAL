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
    async function getSingleDocumentFromFirebase() {
      const docRef = doc(db, 'shopitems', params.itemId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log('Document data:', docSnap.data());

        setCurrentAddObj(docSnap.data());
      } else {
        console.log('No such document!');
      }
    }
    getSingleDocumentFromFirebase();
  }, []);

  return (
    <div className='container'>
      <h1 className='text-3xl mb-4 pt-4 text-center'>Single Item Page</h1>
      <h2 className='text-2xl font-semibold'>
        Post title: {currentItemObj.title}
      </h2>
      <p>price: {currentItemObj.price} eur</p>
      <SingleItem item={currentItemObj} noDelete />
    </div>
  );
}
