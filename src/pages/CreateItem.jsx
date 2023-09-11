/* eslint-disable no-unused-vars */
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../store/AuthProvider';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import toast from 'react-hot-toast';

function CreateItem() {
  const ctx = useAuth();

  const initialValues = {
    title: 'BlackBerry Motion',
    description:
      'Unreleased concept model. Very rare that why price is so high.',
    price: 3223,
    stock: 1,
    brand: 'BlackBerry',
    category: 'smartphones',
    mainImgUrl:
      'https://telecomtalk.info/wp-content/uploads/2017/10/BlackBerry-Motion-1.jpeg',
    tags: 'tech, phones',
  };

  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    price: Yup.number()
      .required('Price is required')
      .positive('Price must be a positive number'),
    stock: Yup.number()
      .required('Stock is required')
      .integer('Stock must be an integer')
      .min(0, 'Stock cannot be negative'),
    brand: Yup.string().required('Brand is required'),
    category: Yup.string().required('Category is required'),
    mainImgUrl: Yup.string()
      .required('Main Image URL is required')
      .url('Invalid URL'),
    tags: Yup.string()
      .required('Tags are required')
      .min(1, 'At least one tag is required'),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      const newAddObjWithUid = {
        ...values,
      };
      console.log('newAddObjWithUid ===', newAddObjWithUid);
      sendDataToFireBase(newAddObjWithUid);
    },
  });
  console.log('formik.errors ===', formik.errors);

  async function sendDataToFireBase(dataToSend) {
    console.log('creating');
    try {
      const docRef = await addDoc(collection(db, 'shopitems'), dataToSend);
      console.log('Document written with ID: ', docRef.id);
      toast.success('Item has been created');
    } catch (error) {
      console.error('Error adding document: ', error);
      toast.error('something went wrong');
    }
  }

  return (
    <div className='min-h-screen bg-gray-100 flex items-center justify-center'>
      <div className='bg-white p-8 rounded-lg shadow-md w-96'>
        <h2 className='text-2xl font-semibold mb-4'>Sell your BlackBerry</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className='mb-4'>
            <label
              htmlFor='title'
              className='block text-sm font-medium text-gray-700'
            >
              Model
            </label>
            <input
              type='text'
              id='title'
              name='title'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.title}
              className={`mt-1 p-2 w-full border rounded-md ${
                formik.touched.title && formik.errors.title
                  ? 'border-red-500 focus:border-red-500'
                  : 'border-gray-300 focus:border-blue-500'
              }`}
            />
            {formik.touched.title && formik.errors.title && (
              <div className='text-red-500 text-sm mt-1'>
                {formik.errors.title}
              </div>
            )}
          </div>

          <div className='mb-4'>
            <label
              htmlFor='description'
              className='block text-sm font-medium text-gray-700'
            >
              Description
            </label>
            <textarea
              id='description'
              name='description'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.description}
              className={`mt-1 p-2 w-full border rounded-md ${
                formik.touched.description && formik.errors.description
                  ? 'border-red-500 focus:border-red-500'
                  : 'border-gray-300 focus:border-blue-500'
              }`}
            />
            {formik.touched.description && formik.errors.description && (
              <div className='text-red-500 text-sm mt-1'>
                {formik.errors.description}
              </div>
            )}
          </div>

          <div className='mb-4'>
            <label
              htmlFor='price'
              className='block text-sm font-medium text-gray-700'
            >
              Price
            </label>
            <input
              type='number'
              id='price'
              name='price'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.price}
              className={`mt-1 p-2 w-full border rounded-md ${
                formik.touched.price && formik.errors.price
                  ? 'border-red-500 focus:border-red-500'
                  : 'border-gray-300 focus:border-blue-500'
              }`}
            />
            {formik.touched.price && formik.errors.price && (
              <div className='text-red-500 text-sm mt-1'>
                {formik.errors.price}
              </div>
            )}
          </div>

          <div className='mb-4'>
            <label
              htmlFor='stock'
              className='block text-sm font-medium text-gray-700'
            >
              Units
            </label>
            <input
              type='number'
              id='stock'
              name='stock'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.stock}
              className={`mt-1 p-2 w-full border rounded-md ${
                formik.touched.stock && formik.errors.stock
                  ? 'border-red-500 focus:border-red-500'
                  : 'border-gray-300 focus:border-blue-500'
              }`}
            />
            {formik.touched.stock && formik.errors.stock && (
              <div className='text-red-500 text-sm mt-1'>
                {formik.errors.stock}
              </div>
            )}
          </div>

          <div className='mb-4'>
            <label
              htmlFor='mainImgUrl'
              className='block text-sm font-medium text-gray-700'
            >
              Main Image URL
            </label>
            <input
              type='text'
              id='mainImgUrl'
              name='mainImgUrl'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.mainImgUrl}
              className={`mt-1 p-2 w-full border rounded-md ${
                formik.touched.mainImgUrl && formik.errors.mainImgUrl
                  ? 'border-red-500 focus:border-red-500'
                  : 'border-gray-300 focus:border-blue-500'
              }`}
            />
            {formik.touched.mainImgUrl && formik.errors.mainImgUrl && (
              <div className='text-red-500 text-sm mt-1'>
                {formik.errors.mainImgUrl}
              </div>
            )}
          </div>

          <div className='mt-4'>
            <button
              type='submit'
              className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300'
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateItem;
