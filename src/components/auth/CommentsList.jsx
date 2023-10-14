import { useState, useEffect } from 'react';
import {
  collection,
  getDocs,
  //   orderBy,
  //   query,
  onSnapshot,
} from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import { useParams } from 'react-router-dom';

export default function CommentList() {
  const [commentsArr, setCommentsArr] = useState([]);
  const [loading, setLoading] = useState(true);
  const params = useParams();

  useEffect(() => {
    setLoading(true);
    getComments();
  }, []);

  async function getComments() {
    const querySnapshot = await getDocs(
      collection(db, 'shopitems', params.itemId, 'comments')
    );

    const dataBack = [];
    querySnapshot.forEach((doc) => {
      dataBack.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    console.table('dataBack ===', dataBack);
    setCommentsArr(dataBack);
    setLoading(false);

    // Pradedame stebėti komentarus realiuoju laiku
    const commentsRef = collection(db, 'shopitems', params.itemId, 'comments');
    const updatingComments = onSnapshot(commentsRef, (snapshot) => {
      // Įvyksta kai pateikiamas naujas komentaras
      const newComments = [];
      snapshot.forEach((doc) => {
        newComments.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setCommentsArr(newComments);
    });

    return updatingComments; // Stebėjimas baigiamas kai informacija yra atnaujinama
  }

  return (
    <div className='mt-8'>
      <h2 className='text-2xl font-semibold mb-4'>Customer Comments:</h2>

      {loading ? (
        <p className='text-xl text-gray-500'>Loading...</p>
      ) : commentsArr.length === 0 ? (
        <p className='text-xl text-gray-500'>No comments found.</p>
      ) : (
        <ul>
          {commentsArr.map((comment, index) => (
            <li key={index} className='bg-white rounded-lg shadow-md p-4 mb-4'>
              <div className='flex justify-between items-center mb-2'>
                <span className='font-semibold'>{comment.username}</span>
                <span className='text-gray-500 text-sm'>
                  {comment.timestamp.toDate().toLocaleString(undefined, {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                  })}
                </span>
              </div>
              <p className='text-gray-700'>{comment.text}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
