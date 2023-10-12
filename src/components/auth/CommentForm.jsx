// import React from "react";
import { useFormik } from 'formik';
import { useAuth } from '../../store/AuthProvider';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import { useParams } from 'react-router-dom';
import * as Yup from 'yup';
import toast, { Toaster } from 'react-hot-toast';

export default function CommentForm() {
  const { user } = useAuth();
  const params = useParams();

  const validationSchema = Yup.object().shape({
    text: Yup.string().min(6, 'Comment must be at least 6 characters'),
  });

  const formik = useFormik({
    initialValues: {
      text: '',
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const userData = user ? { email: user.email } : {};
        const commentData = {
          ...userData,
          text: values.text,
          timestamp: new Date(),
        };
        console.log('commentData ===', commentData);
        const commentsCollection = collection(
          db,
          'shopitems',
          params.itemId,
          'comments'
        );
        await addDoc(commentsCollection, commentData);

        console.log('commentData', commentData);

        resetForm();
      } catch (error) {
        toast.error('Error adding comment', error);
      }
    },
  });

  return (
    <div className='mt-4'>
      <Toaster />
      <form onSubmit={formik.handleSubmit}>
        <h3 className='text-lg font-semibold mb-2'>Leave a Comment</h3>
        <div className='mb-4'>
          <textarea
            name='text'
            placeholder='Your comment'
            rows='3'
            className='w-full border rounded-md p-2'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.text}
          />
          {formik.touched.text && formik.errors.text && (
            <div className='text-red-500'>{formik.errors.text}</div>
          )}
        </div>
        <button
          type='submit'
          className='bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600'
        >
          Submit
        </button>
      </form>
    </div>
  );
}
