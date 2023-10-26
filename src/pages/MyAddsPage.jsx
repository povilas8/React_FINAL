import { useEffect, useState } from 'react';
import ItemsList from '../components/items/ItemsList';
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
  //   orderBy,
} from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { useAuth } from '../store/AuthProvider';
import { toast } from 'react-hot-toast';

export default function MyAddsPage() {
  const ctx = useAuth();
  const [itemsArr, setItemsArr] = useState([]);
  useEffect(() => {
    getAdds();
  }, []);

  async function getAdds() {
    const q = query(
      collection(db, 'shopitems'),
      where('userUid', '==', ctx.userUid)
    );

    const querySnapshot = await getDocs(q);

    const dataBack = [];
    querySnapshot.forEach((doc) => {
      dataBack.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    setItemsArr(dataBack);
  }

  function deleteFire(delId) {
    deleteDoc(doc(db, 'shopitems', delId))
      .then(() => {
        toast.success('Item has been deleted');
        getAdds();
      })
      .catch((error) => {
        console.warn('ivyko klaida:', error);
        toast.error('istrinti nepavyko');
      });
  }

  return (
    <div className='bg-slate-100'>
      <h1 className='text-3xl mb-8 pt-4 text-center drop-shadow-lg'>My Adds</h1>
      <ul className='container grid grid-cols-3 gap-4 pb-10'>
        {itemsArr.map((item) => (
          <ItemsList
            key={item.id}
            item={item}
            onDelete={() => deleteFire(item.id)}
          />
        ))}
      </ul>
    </div>
  );
}
