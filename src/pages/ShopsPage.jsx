import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { useEffect, useState } from 'react';
import SingleItem from '../components/items/SingleItem';

export default function ShopsPage() {
  <div className=' flex flex-col h-screen'></div>;
  const [itemsArr, setItemsArr] = useState([]);
  console.log('itemsArr ===', itemsArr);
  async function getAdds() {
    const querySnapshot = await getDocs(collection(db, 'shopitems'));
    console.log('querySnapshot ===', querySnapshot);
    const dataBack = [];
    console.log('dataBack ===', dataBack);
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

  console.log('itemsArr ===', itemsArr);
  return (
    <div>
      <h1 className='text-3xl mb-4 pt-4 text-center'>Shops</h1>
      <ul className='container grid grid-cols-3 gap-4 pb-8'>
        {itemsArr.map((item) => (
          <SingleItem
            key={item.id}
            item={item}
            onDelete={() => deleteFire(item.id)}
          />
        ))}
      </ul>
    </div>
  );
}
