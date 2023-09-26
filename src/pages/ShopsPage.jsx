import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { useEffect, useState } from 'react';
import ItemsList from '../components/items/ItemsList';

export default function ShopsPage() {
  const [itemsArr, setItemsArr] = useState([]);

  async function getAdds() {
    const querySnapshot = await getDocs(collection(db, 'shopitems'));
    const dataBack = [];
    querySnapshot.forEach((doc) => {
      const itemData = {
        id: doc.id,
        ...doc.data(),
      };

      dataBack.push(itemData);
    });
    setItemsArr(dataBack);
  }
  useEffect(() => {
    getAdds();
  }, []);

  function deleteFire(delId) {
    deleteDoc(doc(db, 'shopitems', delId))
      .then(() => {
        getAdds();
      })
      .catch((error) => {
        console.warn('ivyko klaida:', error);
      });
  }

  return (
    <div>
      <h1 className='text-3xl mb-8 pt-4 text-center drop-shadow-lg'>Shops</h1>
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
