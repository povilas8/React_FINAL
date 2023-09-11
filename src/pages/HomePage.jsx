import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { useEffect, useState } from 'react';
import ItemsList from '../components/items/ItemsList';
import SingleItem from '../components/items/SingleItem';

export default function HomePage() {
  <div className='container flex flex-col h-screen'>
    <h1 className='text-lg mb-4 pt-4 text-center'>Home</h1>
  </div>;
  const [itemsArr, setItemsArr] = useState([]);
  // console.log('addsArr ===', addsArr);
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
        // toast.success('istrinta');
        getAdds();
      })
      .catch((error) => {
        console.warn('ivyko klaida:', error);
        // toast.error('istrinti nepavyko');
      });
  }

  console.log('itemsArr ===', itemsArr);
  return (
    <div className='container'>
      <h1 className='text-3xl mb-4 pt-4'>HomePage</h1>
      <h2 className='mb-10 text-center text-xl font-bold'>All adds</h2>
      {itemsArr.map((item) => (
        <SingleItem
          key={item.id}
          item={item}
          onDelete={() => deleteFire(item.id)}
        />
      ))}
    </div>
  );
}
