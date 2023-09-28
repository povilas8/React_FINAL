import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, deleteDoc, getDoc } from 'firebase/firestore';
import { db } from './../firebase/firebase';
import SingleItem from '../components/items/SingleItem';

export default function SingleItemPage() {
  const params = useParams();
  const [currentItemObj, setCurrentItemObj] = useState({});

  useEffect(() => {
    async function getSingleDocumentFromFirebase() {
      const docRef = doc(db, 'shopitems', params.itemId);
      console.log('params.itemId ===', params.itemId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setCurrentItemObj(docSnap.data());
      } else {
        console.log('No such document!');
      }
    }

    getSingleDocumentFromFirebase();
  }, [params.itemId]);

  function deleteFire(delId) {
    deleteDoc(doc(db, 'shopitems', delId))
      .then(() => {
        // Tiesiogiai nukreipkite vartotoją atgal į pagrindinį puslapį
        window.location.href = '/shops';
      })
      .catch((error) => {
        console.warn('ivyko klaida:', error);
      });
  }

  return (
    <div className='container'>
      <h1 className='text-3xl mb-4 pt-4 text-center'>Single Item Page</h1>
      <SingleItem
        item={currentItemObj}
        onDelete={() => deleteFire(params.itemId)}
      />
    </div>
  );
}
